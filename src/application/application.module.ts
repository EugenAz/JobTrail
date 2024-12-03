import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsResolver } from './applications.resolver';
import { CompanyModule } from '../company/company.module';
import { CampaignModule } from '../campaign/campaign.module';

@Module({
  imports: [CampaignModule, CompanyModule],
  providers: [ApplicationsService, ApplicationsResolver],
})
export class ApplicationModule {}
