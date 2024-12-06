import { Field, ObjectType } from '@nestjs/graphql';
import { ApplicationStatus } from '../types';
import { CampaignSummaryModel } from '../campaign/campaign-summary.model';
import { CompanyModel } from '../company/company.model';

@ObjectType()
export class ApplicationModel {
  @Field()
  id: string;

  @Field()
  dateCreated: Date;

  @Field()
  statusChangedAt: Date;

  @Field()
  campaign: CampaignSummaryModel;

  @Field()
  company: CompanyModel;

  @Field()
  roleName: string;

  @Field({ nullable: true })
  link?: string;

  @Field(() => ApplicationStatus)
  status: ApplicationStatus;

  @Field(() => [String], { nullable: true })
  notes?: string[];
}
