import { Module } from '@nestjs/common';
import { CampaingsService } from './campaigns.service';
import { CampaignsResolver } from './campaigns.resolver';
// import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [
    /* ApplicationModule */
  ],
  providers: [CampaingsService, CampaignsResolver],
})
export class CampaignModule {}
