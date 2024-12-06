import { Injectable } from '@nestjs/common';
import { ApplicationModel } from './application.model';
import { NewApplicationInput } from './dto/new-application.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { Repository } from 'typeorm';
import { mapToApplicationModel } from './application.mappers';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationsRepository: Repository<ApplicationEntity>,
  ) {}

  async create(data: NewApplicationInput): Promise<ApplicationModel> {
    return {} as any;
  }

  async findAll(): Promise<ApplicationModel[]> {
    const applications = await this.applicationsRepository.find();

    return applications.map(mapToApplicationModel);
  }

  async findOneById(id: string): Promise<ApplicationModel> {
    return {
      id,
      roleName: 'Tech Lead',
      link: 'https://link.com',
    } as ApplicationModel;
  }

  async findAllByCampaignId(campaignId: string): Promise<ApplicationModel[]> {
    return [] as ApplicationModel[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
