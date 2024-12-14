import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, IsDateString, IsEnum } from 'class-validator';
import { ApplicationStatus } from '../../types';

@InputType()
export class NewApplicationInput {
  @Field()
  @IsDateString()
  dateCreated: string;

  @Field(() => ID)
  campaignId: string;

  @Field(() => ID)
  companyId: string;

  @Field()
  @MaxLength(255)
  roleName: string;

  @Field({ nullable: true })
  @MaxLength(255)
  link: string;

  @Field(() => ApplicationStatus, { nullable: true })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @Field(() => [String], { nullable: true, defaultValue: [''] })
  notes: string[];
}
