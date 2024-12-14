import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdatedCampaignInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @MaxLength(100)
  @MinLength(1)
  name?: string;

  @Field(() => String, { nullable: true })
  dateStart?: string;

  @Field(() => String, { nullable: true })
  dateEnd?: string;
}
