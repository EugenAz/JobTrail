import { Args, Query, Resolver } from '@nestjs/graphql';
import { CampaignSummary } from './campaign-summary.model';
import { CampaignDetail } from './campaign-detail.model';
import { CampaingsService } from './campaigns.service';

@Resolver()
export class CampaignsResolver {
  constructor(private campaignsService: CampaingsService) {}

  @Query(() => [CampaignSummary], { name: 'campaigns' })
  async getCampaigns() {
    return this.campaignsService.findAll();
  }

  @Query(() => CampaignDetail, { name: 'campaign' })
  async getCampaign(@Args('id') id: string) {
    return this.campaignsService.findOneById(id);
  }
}
