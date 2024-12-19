import { mapToApplicationModel } from '../application/application.mappers';
import { CampaignDetailModel, CampaignSummaryModel } from '@job-trail/types';
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
