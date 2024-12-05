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
import { CampaignSummary } from '../campaign/campaign-summary.model';
import { Company } from '../company/company.model';
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

  @Query(() => ApplicationModel, { name: 'application' })
  async getApplication(@Args('id') id: string) {
    return this.applicationsService.findOneById(id);
  }

  // TODO
  @ResolveField('campaign', () => CampaignSummary)
  async getCampaign(@Parent() application: ApplicationEntity) {
    const { campaign } = application;
    console.log('!!application', application);
    return this.campaignsService.findOneById(campaign.id);
  }

  // TODO
  @ResolveField('company', () => Company)
  async getCompany(@Root() application: ApplicationModel) {
    const { id } = application;
    return this.companiesService.findOneById(id);
  }
}
