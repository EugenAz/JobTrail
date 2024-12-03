import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength, IsDateString, IsEnum } from 'class-validator';
import { ApplicationStatus } from '../../types';

@InputType()
export class NewApplicationInput {
  @Field()
  @IsDateString()
  dateCreated: Date;

  @Field()
  @IsDateString()
  dateUpdated: Date;

  @Field((type) => Int)
  campaignId: number;

  @Field((type) => Int)
  companyId: number;

  @Field()
  @MaxLength(255)
  roleName: string;

  @Field()
  @MaxLength(255)
  link: string;

  @Field((type) => ApplicationStatus)
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @Field((type) => [String])
  notes: string[];
}
