import { Module } from '@nestjs/common';
import { CampaingsService } from './campaigns.service';
import { CampaignsResolver } from './campaigns.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign } from './campaign.entity';
// import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign]),
    /* ApplicationModule */
  ],
  providers: [CampaingsService, CampaignsResolver],
})
export class CampaignModule {}
