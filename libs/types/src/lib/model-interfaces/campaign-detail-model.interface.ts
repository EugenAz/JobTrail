import { IApplicationModel } from './application-model.interface';
import { ICampaignSummaryModel } from './campaign-summary-model.interface';

export interface ICampaignDetailModel extends ICampaignSummaryModel {
  applications?: IApplicationModel[];
}
