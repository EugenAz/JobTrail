import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CampaignSummaryModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  dateStart: Date;

  @Field({ nullable: true })
  dateEnd?: Date;
}
