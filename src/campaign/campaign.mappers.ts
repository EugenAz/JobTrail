import { mapToApplicationModel } from '../application/application.mappers';
import { CampaignDetailModel } from './campaign-detail.model';
import { CampaignSummaryModel } from './campaign-summary.model';
import { CampaignEntity } from './campaign.entity';

export const mapToCampaignSummaryModel = ({
  id,
  date_end,
  name,
  date_start,
}: CampaignEntity): CampaignSummaryModel => ({
  id,
  name,
  dateStart: new Date(date_start),
  dateEnd: date_end ? new Date(date_end) : null,
});

export const mapToCampaignDetailModel = ({
  id,
  date_end,
  name,
  date_start,
  applications,
}: CampaignEntity): CampaignDetailModel => ({
  id,
  name,
  dateStart: new Date(date_start),
  dateEnd: date_end ? new Date(date_end) : null,
  applications: applications.map(mapToApplicationModel),
});

/* TODO migrate all postgres date columns to datetime */
