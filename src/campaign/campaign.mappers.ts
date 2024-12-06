import { mapToApplicationModel } from '../application/application.mappers';
import { CampaignDetailModel } from './campaign-detail.model';
import { CampaignSummaryModel } from './campaign-summary.model';
import { CampaignEntity } from './campaign.entity';

export const mapToCampaignSummaryModel = ({
  id,
  data_end,
  name,
  data_start,
}: CampaignEntity): CampaignSummaryModel => ({
  id,
  name,
  dateStart: new Date(data_start),
  dateEnd: data_end ? new Date(data_end) : null,
});

export const mapToCampaignDetailModel = ({
  id,
  data_end,
  name,
  data_start,
  applications,
}: CampaignEntity): CampaignDetailModel => ({
  id,
  name,
  dateStart: new Date(data_start),
  dateEnd: data_end ? new Date(data_end) : null,
  applications: applications.map(mapToApplicationModel),
});

/* TODO migrate all postgres date columns to datetime */
/* TODO ALTER TABLE rename columns data_* to date_* */
