import { Field, ObjectType } from '@nestjs/graphql';
import { CampaignSummaryModel } from './campaign-summary.model';
import { ApplicationModel } from '../application/application.model';

@ObjectType()
export class CampaignDetailModel extends CampaignSummaryModel {
  @Field(() => [ApplicationModel], { nullable: true, defaultValue: [] })
  applications?: ApplicationModel[];
}
