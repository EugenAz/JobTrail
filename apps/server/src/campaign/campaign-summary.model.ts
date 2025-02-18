import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICampaignSummaryModel } from '@job-trail/types';
import { UserModel } from '../users/user.model';

@ObjectType()
export class CampaignSummaryModel implements ICampaignSummaryModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  dateStart: string;

  @Field({ nullable: true })
  dateEnd?: string;

  @Field()
  user: UserModel;
}
