import { Field, ObjectType } from '@nestjs/graphql';
import { ICampaignDetailModel } from '@job-trail/types';
import { CampaignSummaryModel } from './campaign-summary.model';
import { ApplicationModel } from '../application/application.model';

@ObjectType()
export class CampaignDetailModel
  extends CampaignSummaryModel
  implements ICampaignDetailModel
{
  @Field(() => [ApplicationModel], { nullable: true, defaultValue: [] })
  applications?: ApplicationModel[];
}
