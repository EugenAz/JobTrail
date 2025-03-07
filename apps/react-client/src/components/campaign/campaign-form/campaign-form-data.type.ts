import { ICampaignSummaryModel } from '@job-trail/types';

export type CampaignFormData = Omit<ICampaignSummaryModel, 'id'>;
