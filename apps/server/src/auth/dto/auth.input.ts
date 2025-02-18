import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
