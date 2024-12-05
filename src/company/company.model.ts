import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field()
  id: string;

  @Field()
  name: string;
}
