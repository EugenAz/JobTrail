import { Field, ObjectType } from '@nestjs/graphql';
import { ApplicationStatus } from '../types';
import { CampaignSummary } from '../campaign/campaign-summary.model';
import { Company } from '../company/company.model';

@ObjectType()
export class ApplicationModel {
  @Field()
  id: string;

  @Field()
  dateCreated: Date;

  @Field()
  dateUpdated: Date;

  @Field()
  campaign: CampaignSummary;

  @Field()
  company: Company;

  @Field()
  roleName: string;

  @Field()
  link: string;

  @Field(() => ApplicationStatus)
  status: ApplicationStatus;

  @Field(() => [String])
  notes: string[];
}
