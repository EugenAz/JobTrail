import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CompanyModel {
  @Field()
  id: string;

  @Field()
  name: string;
}
