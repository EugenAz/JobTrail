import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ICompanyModel } from '@job-trail/types';
import { UserModel } from '../users/user.model';

@ObjectType()
export class CompanyModel implements ICompanyModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  user: UserModel;
}
