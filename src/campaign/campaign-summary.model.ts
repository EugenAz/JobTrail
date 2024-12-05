import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CampaignSummary {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  dateStart: Date;

  @Field({ nullable: true })
  dateEnd?: Date;
}
