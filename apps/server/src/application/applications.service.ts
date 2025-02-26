import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { getToday } from '@job-trail/dates';

import { NewApplicationInput } from './dto/new-application.input';
import { ApplicationEntity } from './application.entity';
import { mapToApplicationModel } from './application.mappers';
import { CompaniesService } from '../company/companies.service';
import { CampaingsService } from '../campaign/campaigns.service';
import { UpdatedApplicationInput } from './dto/updated-application.input';
import { ApplicationModel } from './application.model';
import { AsyncLocalStorage } from 'async_hooks';
import { AsyncLocalStorageType } from '../common/types';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationsRepository: Repository<ApplicationEntity>,
    private companiesService: CompaniesService,
    private campaignsService: CampaingsService,
    private readonly als: AsyncLocalStorage<AsyncLocalStorageType>
  ) {}

  async findOneById(id: string): Promise<ApplicationModel> {
    const userId = this.als.getStore().userId;
    const application = await this.applicationsRepository.findOne({
      where: { id, campaign: { user: { id: userId } } },
      relations: ['company', 'campaign', 'campaign.user'],
    });

    if (!application) {
      return null;
    }

    return mapToApplicationModel(application);
  }

  async create({
    campaignId,
    companyId,
    dateCreated,
    link,
    notes,
    roleName,
    status,
  }: NewApplicationInput): Promise<ApplicationModel> {
    const campaign = await this.campaignsService.findOneById(campaignId);
    if (!campaign) {
      throw new Error(`Campaign with ID ${campaignId} not found.`);
    }

    const company = await this.companiesService.findOneById(companyId);
    if (!company) {
      throw new Error(`Company with ID ${companyId} not found.`);
    }

    const newApplication = this.applicationsRepository.create({
      status,
      link,
      notes,
      dateCreated,
      roleName,
      campaign,
      company,
      dateUpdated: getToday(),
    });
    const savedApplication =
      await this.applicationsRepository.save(newApplication);

    return mapToApplicationModel(savedApplication);
  }

  async update({
    id,
    campaignId,
    companyId,
    dateCreated,
    link,
    notes,
    roleName,
    status,
  }: UpdatedApplicationInput): Promise<ApplicationModel> {
    const userId = this.als.getStore().userId;
    const application = await this.applicationsRepository.findOne({
      where: { id, campaign: { user: { id: userId } } },
      relations: ['campaign.user'],
    });
    if (!application) {
      throw new Error(`Application with ID ${id} not found.`);
    }

    if (dateCreated) {
      application.dateCreated = dateCreated;
    }
    if (link) {
      application.link = link;
    }
    if (notes) {
      application.notes = notes;
    }
    if (status) {
      if (status !== application.status) {
        application.dateUpdated = getToday();
      }

      application.status = status;
    }
    if (roleName) {
      application.roleName = roleName;
    }

    if (campaignId) {
      const campaign = await this.campaignsService.findOneById(campaignId);
      if (!campaign) {
        throw new Error(`Campaign with ID ${campaignId} not found.`);
      }
      application.campaign = campaign;
    }

    if (companyId) {
      const company = await this.companiesService.findOneById(companyId);
      if (!company) {
        throw new Error(`Company with ID ${companyId} not found.`);
      }
      application.company = company;
    }

    const savedApplication =
      await this.applicationsRepository.save(application);

    return mapToApplicationModel(savedApplication);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const application = await this.findOneById(id);
      if (!application) {
        return false;
      }

      const result = await this.applicationsRepository.delete(id);

      return result.affected > 0;
    } catch (error) {
      console.error(`Error deleting application with id ${id}:`, error);
      return false;
    }
  }
}
