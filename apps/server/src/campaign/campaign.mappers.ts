import { mapToApplicationModel } from '../application/application.mappers';
import { CampaignDetailModel } from './campaign-detail.model';
import { CampaignSummaryModel } from './campaign-summary.model';
import { CampaignEntity } from './campaign.entity';

export const mapToCampaignSummaryModel = ({
  id,
  name,
  dateStart,
  dateEnd,
}: CampaignEntity): CampaignSummaryModel => ({
  id,
  name,
  dateStart,
  dateEnd,
});

export const mapToCampaignDetailModel = (
  campaignEntity: CampaignEntity
): CampaignDetailModel => ({
  ...mapToCampaignSummaryModel(campaignEntity),
  applications: campaignEntity.applications.map(mapToApplicationModel),
});
