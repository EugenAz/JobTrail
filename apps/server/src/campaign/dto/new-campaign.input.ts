import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewCampaignInput {
  @Field()
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @Field(() => String)
  dateStart: string;

  @Field(() => String, { nullable: true })
  dateEnd?: string;
}
