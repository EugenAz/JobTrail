import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Application } from './application.model';
import { Campaign } from '../campaign/campaign.model';
import { Company } from '../company/company.model';
import { ApplicationsService } from './applications.service';
import { CompaniesService } from '../company/companies.service';
import { CampaingsService } from '../campaign/campaigns.service';

@Resolver(() => Application)
export class ApplicationsResolver {
  constructor(
    private applicationsService: ApplicationsService,
    // private campaignsService: CampaingsService,
    // private companiesService: CompaniesService,
  ) {}

  @Query(() => Application, { name: 'application' })
  async getApplication(@Args('id', { type: () => Int }) id: number) {
    return this.applicationsService.findOneById(id);
  }

  // @ResolveField('campaign', () => Campaign)
  // async getCampaign(@Root() application: Application) {
  //   // TODO: figure out where do i take the campaign id from
  //   // and how do i specify it on the Application model?
  //   // or maybe it will be searchange from the other end via GraphQL?
  //   const { id } = application;
  //   return this.campaignsService.findOneById(id);
  // }

  // @ResolveField('company', () => Company)
  // async getCompany(@Root() application: Application) {
  //   // TODO: figure out where do i take the campaign id from
  //   // and how do i specify it on the Application model?
  //   const { id } = application;
  //   return this.companiesService.findOneById(id);
  // }
}
