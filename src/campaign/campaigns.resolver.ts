import { Args, Query, Resolver } from '@nestjs/graphql';
import { CampaignSummaryModel } from './campaign-summary.model';
import { CampaignDetailModel } from './campaign-detail.model';
import { CampaingsService } from './campaigns.service';

@Resolver()
export class CampaignsResolver {
  constructor(private campaignsService: CampaingsService) {}

  @Query(() => [CampaignSummaryModel], { name: 'campaigns' })
  async getCampaigns() {
    return this.campaignsService.findAll();
  }

  @Query(() => CampaignDetailModel, { name: 'campaign' })
  async getCampaign(@Args('id') id: string) {
    return this.campaignsService.findOneById(id);
  }
}
