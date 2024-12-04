import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsResolver } from './applications.resolver';
import { CompanyModule } from '../company/company.module';
import { CampaignModule } from '../campaign/campaign.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    CampaignModule,
    CompanyModule,
  ],
  providers: [ApplicationsService, ApplicationsResolver],
})
export class ApplicationModule {}
