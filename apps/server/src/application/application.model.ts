import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApplicationStatus } from '../types';
import { CampaignSummaryModel } from '../campaign/campaign-summary.model';
import { CompanyModel } from '../company/company.model';

@ObjectType()
export class ApplicationModel {
  @Field(() => ID)
  id: string;

  @Field()
  dateCreated: string;

  @Field({ nullable: true })
  dateUpdated: string;

  @Field(() => CampaignSummaryModel)
  campaign: CampaignSummaryModel;

  @Field(() => CompanyModel)
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
