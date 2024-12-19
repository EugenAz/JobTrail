import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CampaingsService } from './campaigns.service';
import { NewCampaignInput } from './dto/new-campaign.input';
import { UpdatedCampaignInput } from './dto/updated-campaign.input';
import { mapToCampaignDetailModel } from './campaign.mappers';
import { CampaignSummaryModel } from './campaign-summary.model';
import { CampaignDetailModel } from './campaign-detail.model';
import { OrderByInput } from '../common/dto/order-by.input';

@Resolver()
export class CampaignsResolver {
  constructor(private campaignsService: CampaingsService) {}

  @Query(() => [CampaignSummaryModel], { name: 'campaigns' })
  async getCampaigns(
    @Args('orderBy', { nullable: true })
    orderBy?: OrderByInput<CampaignSummaryModel>
  ) {
    return this.campaignsService.findAll(orderBy);
  }

  @Query(() => CampaignDetailModel, { name: 'campaign' })
  async getCampaign(@Args('id') id: string) {
    const campaign = await this.campaignsService.findOneById(id);
    return mapToCampaignDetailModel(campaign);
  }

  @Mutation(() => CampaignSummaryModel, { name: 'createCampaign' })
  async create(
    @Args('newCampaignInput') newCampaignInput: NewCampaignInput
  ): Promise<CampaignSummaryModel> {
    return this.campaignsService.create(newCampaignInput);
  }

  @Mutation(() => CampaignSummaryModel, { name: 'updateCampaign' })
  async update(
    @Args('updatedCampaignData') updatedCampaignData: UpdatedCampaignInput
  ): Promise<CampaignSummaryModel> {
    return this.campaignsService.update(updatedCampaignData);
  }

  @Mutation(() => Boolean, { name: 'deleteCampaign' })
  async delete(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.campaignsService.delete(id);
  }
}
