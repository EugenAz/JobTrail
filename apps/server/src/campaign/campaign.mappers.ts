import { mapToApplicationModel } from '../application/application.mappers';
import { CampaignDetailModel } from './campaign-detail.model';
import { CampaignSummaryModel } from './campaign-summary.model';
import { CampaignEntity } from './campaign.entity';

/* TODO migrate all postgres date columns to datetime */

export const mapToCampaignSummaryModel = ({
  id,
  dateEnd,
  name,
  dateStart,
}: CampaignEntity): CampaignSummaryModel => ({
  id,
  name,
  dateStart: new Date(dateStart),
  dateEnd: dateEnd ? new Date(dateEnd) : null,
});

export const mapToCampaignDetailModel = ({
  id,
  dateEnd,
  name,
  dateStart,
  applications,
}: CampaignEntity): CampaignDetailModel => ({
  id,
  name,
  dateStart: new Date(dateStart),
  dateEnd: dateEnd ? new Date(dateEnd) : null,
  applications: applications.map(mapToApplicationModel),
});
