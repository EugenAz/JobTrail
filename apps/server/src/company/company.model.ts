import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICompanyModel } from '@job-trail/types';

@ObjectType()
export class CompanyModel implements ICompanyModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
