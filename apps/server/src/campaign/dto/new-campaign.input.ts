import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewCampaignInput {
  @Field()
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @Field(() => Date)
  dateStart: Date;

  @Field(() => Date, { nullable: true })
  dateEnd?: Date;
}
