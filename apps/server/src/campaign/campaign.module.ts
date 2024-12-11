import { Global, Module } from '@nestjs/common';
import { CampaingsService } from './campaigns.service';
import { CampaignsResolver } from './campaigns.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from './campaign.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity])],
  providers: [CampaingsService, CampaignsResolver],
  exports: [CampaingsService],
})
export class CampaignModule {}
