import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanyModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
