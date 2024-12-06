import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CampaignSummaryModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  dateStart: Date;

  @Field({ nullable: true })
  dateEnd?: Date;
}
