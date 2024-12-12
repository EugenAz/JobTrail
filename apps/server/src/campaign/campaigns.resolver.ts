import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CampaignSummaryModel } from './campaign-summary.model';
import { CampaignDetailModel } from './campaign-detail.model';
import { CampaingsService } from './campaigns.service';
import { NewCampaignInput } from './dto/new-campaign.input';
import { UpdatedCampaignInput } from './dto/updated-campaign.input';
import { mapToCampaignDetailModel } from './campaign.mappers';

@Resolver()
export class CampaignsResolver {
  constructor(private campaignsService: CampaingsService) {}

  @Query(() => [CampaignSummaryModel], { name: 'campaigns' })
  async getCampaigns() {
    return this.campaignsService.findAll();
  }

  @Query(() => CampaignDetailModel, { name: 'campaign' })
  async getCampaign(@Args('id') id: string) {
    const campaign = await this.campaignsService.findOneById(id);
    return mapToCampaignDetailModel(campaign);
  }

  @Mutation(() => CampaignSummaryModel, { name: 'createCampaign' })
  async create(
    @Args('newCampaignInput') newCampaignInput: NewCampaignInput,
  ): Promise<CampaignSummaryModel> {
    return this.campaignsService.create(newCampaignInput);
  }

  @Mutation(() => CampaignSummaryModel, { name: 'updateCampaign' })
  async update(
    @Args('updatedCampaignData') updatedCampaignData: UpdatedCampaignInput,
  ): Promise<CampaignSummaryModel> {
    return this.campaignsService.update(updatedCampaignData);
  }

  // TODO: configure db to cascade delete applications
  @Mutation(() => Boolean, { name: 'deleteCampaign' })
  async delete(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.campaignsService.delete(id);
  }
}
