import { mapToCampaignSummaryModel } from '../campaign/campaign.mappers';
import { ApplicationEntity } from './application.entity';
import { ApplicationModel } from './application.model';

export const mapToApplicationModel = ({
  campaign,
  notes,
  ...rest
}: ApplicationEntity): ApplicationModel => ({
  campaign: campaign ? mapToCampaignSummaryModel(campaign) : null,
  notes: notes.map((n) => n.trim()).join(', '),
  ...rest,
});
