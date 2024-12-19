import { ApplicationStatus } from '../application-status';
import { ICampaignSummaryModel } from './campaign-summary-model.interface';
import { ICompanyModel } from './company-model.interface';

export interface IApplicationModel {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  campaign: ICampaignSummaryModel;
  company: ICompanyModel;
  roleName: string;
  link?: string;
  status: ApplicationStatus;
  notes?: string;
}
