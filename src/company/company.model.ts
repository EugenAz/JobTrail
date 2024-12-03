import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;
}
