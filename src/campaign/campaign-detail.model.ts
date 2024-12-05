import { Field, ObjectType } from '@nestjs/graphql';
import { CampaignSummary } from './campaign-summary.model';
import { ApplicationModel } from '../application/application.model';

@ObjectType()
export class CampaignDetail extends CampaignSummary {
  @Field(() => [ApplicationModel], { nullable: true })
  applications?: ApplicationModel[];
}
