import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CampaignSummaryModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  dateStart: string;

  @Field({ nullable: true })
  dateEnd?: string;
}
