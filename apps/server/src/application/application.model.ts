import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CampaignSummaryModel } from '../campaign/campaign-summary.model';
import { ApplicationStatus, IApplicationModel } from '@job-trail/types';
import { CompanyModel } from '../company/company.model';

@ObjectType()
export class ApplicationModel implements IApplicationModel {
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

  @Field(() => String)
  status: ApplicationStatus;

  @Field(() => String, { nullable: true })
  notes?: string;
}
