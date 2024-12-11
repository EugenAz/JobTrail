import { mapToCampaignSummaryModel } from '../campaign/campaign.mappers';
import { ApplicationEntity } from './application.entity';
import { ApplicationModel } from './application.model';

export const mapToApplicationModel = ({
  id,
  status,
  roleName,
  link,
  notes,
  dateCreated,
  dateUpdated,
  campaign,
  company,
}: ApplicationEntity): ApplicationModel => ({
  id,
  status,
  link,
  notes,
  roleName,
  dateCreated: new Date(dateCreated),
  dateUpdated: new Date(dateUpdated),
  campaign: campaign ? mapToCampaignSummaryModel(campaign) : null,
  company,
});
