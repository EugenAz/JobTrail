import { mapToCampaignSummaryModel } from '../campaign/campaign.mappers';
import { ApplicationEntity } from './application.entity';
import { ApplicationModel } from './application.model';

export const mapToApplicationModel = ({
  id,
  status,
  role_name,
  link,
  notes,
  date,
  status_changed_at,
  campaign,
  company,
}: ApplicationEntity): ApplicationModel => ({
  id,
  status,
  link,
  notes,
  roleName: role_name,
  dateCreated: new Date(date),
  statusChangedAt: new Date(status_changed_at),
  campaign: campaign ? mapToCampaignSummaryModel(campaign) : null,
  company,
});
