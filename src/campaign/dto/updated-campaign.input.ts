import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';
import { AtLeastOneField } from '../../utils/at-least-one.decorator';

@InputType()
// TODO apply this:
// @AtLeastOneField(['name', 'dateStart', 'dateEnd'])
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
