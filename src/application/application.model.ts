import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApplicationStatus } from '../types';
import { Campaign } from '../campaign/campaign.model';
import { Company } from '../company/company.model';

@ObjectType()
export class Application {
  @Field((type) => Int)
  id: number;

  @Field()
  dateCreated: Date;

  @Field()
  dateUpdated: Date;

  @Field()
  campaign: Campaign;

  @Field()
  company: Company;

  @Field()
  roleName: string;

  @Field()
  link: string;

  @Field((type) => ApplicationStatus)
  status: ApplicationStatus;

  @Field((type) => [String])
  notes: string[];
}
