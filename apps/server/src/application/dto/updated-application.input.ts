import { Field, ID, InputType } from '@nestjs/graphql';
import { MaxLength, IsDateString, IsEnum } from 'class-validator';
import { ApplicationStatus } from '../../types';

@InputType()
export class UpdatedApplicationInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  @IsDateString()
  dateCreated: string;

  @Field(() => ID, { nullable: true })
  campaignId: string;

  @Field(() => ID, { nullable: true })
  companyId: string;

  @Field({ nullable: true })
  @MaxLength(255)
  roleName: string;

  @Field({ nullable: true })
  @MaxLength(255)
  link: string;

  @Field(() => ApplicationStatus, { nullable: true })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @Field(() => [String], { nullable: true })
  notes: string[];
}
