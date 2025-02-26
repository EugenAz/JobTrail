import { Global, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { CompaniesResolver } from './companies.resolver';
import { UsersModule } from '../users/users.module';
import { SharedModule } from '../common/shared.module';

@Global()
@Module({
  imports: [
    UsersModule,
    SharedModule,
    TypeOrmModule.forFeature([CompanyEntity]),
  ],
  providers: [CompaniesService, CompaniesResolver],
  exports: [CompaniesService],
})
export class CompanyModule {}
