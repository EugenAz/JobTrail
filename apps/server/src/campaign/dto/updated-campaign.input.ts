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

  @Field(() => Date, { nullable: true })
  dateStart?: Date;

  @Field(() => Date, { nullable: true })
  dateEnd?: Date;
}
