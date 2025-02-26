import { Global, Module } from '@nestjs/common';
import { CampaingsService } from './campaigns.service';
import { CampaignsResolver } from './campaigns.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignEntity } from './campaign.entity';
import { SharedModule } from '../common/shared.module';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [
    SharedModule,
    UsersModule,
    TypeOrmModule.forFeature([CampaignEntity]),
  ],
  providers: [CampaingsService, CampaignsResolver],
  exports: [CampaingsService],
})
export class CampaignModule {}
