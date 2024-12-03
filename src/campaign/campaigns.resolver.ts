import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Campaign } from './campaign.model';
import { CampaingsService } from './campaigns.service';
// import { Application } from '../application/application.model';
// import { ApplicationsService } from '../application/applications.service';

@Resolver(() => Campaign)
export class CampaignsResolver {
  constructor(
    // private applicationsService: ApplicationsService,
    private campaignsService: CampaingsService,
  ) {}

  @Query(() => Campaign, { name: 'campaign' })
  async getCampaign(@Args('id', { type: () => Int }) id: number) {
    return this.campaignsService.findOneById(id);
  }

  // @ResolveField('applications', () => [Application])
  // async getApplications(@Parent() campaign: Campaign) {
  //   const { id } = campaign;
  //   return this.applicationsService.findAllByCampaignId(id);
  // }
}
