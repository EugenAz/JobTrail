import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { ApplicationModel } from './application.model';
import { CampaignSummaryModel } from '../campaign/campaign-summary.model';
import { CompanyModel } from '../company/company.model';
import { ApplicationsService } from './applications.service';
import { CompaniesService } from '../company/companies.service';
import { CampaingsService } from '../campaign/campaigns.service';
import { ApplicationEntity } from './application.entity';

@Resolver(() => ApplicationModel)
export class ApplicationsResolver {
  constructor(
    private applicationsService: ApplicationsService,
    private campaignsService: CampaingsService,
    private companiesService: CompaniesService,
  ) {}

  @Query(() => [ApplicationModel], { name: 'applications' })
  async getApplications() {
    const apps = await this.applicationsService.findAll();

    // Ensure that the data returned has valid `id` values
    if (apps.some((app) => app.id == null)) {
      throw new Error('One or more applications have a null ID');
    }

    return apps;
  }

  @Query(() => ApplicationModel, { name: 'application' })
  async getApplication(@Args('id') id: string) {
    const application = await this.applicationsService.findOneById(id);

    if (!application) {
      throw new NotFoundException(id);
    }

    return application;
  }

  // TODO
  @ResolveField('campaign', () => CampaignSummaryModel)
  async getCampaign(@Parent() application: ApplicationEntity) {
    const { campaign } = application;
    console.log('!!application', application);
    return this.campaignsService.findOneById(campaign.id);
  }

  // TODO
  @ResolveField('company', () => CompanyModel)
  async getCompany(@Root() application: ApplicationModel) {
    const { id } = application;
    return this.companiesService.findOneById(id);
  }
}
