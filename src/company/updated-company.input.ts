import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdatedCompanyInput {
  @Field(() => ID)
  id: string;

  @Field()
  @MaxLength(50)
  @MinLength(1)
  name: string;
}
