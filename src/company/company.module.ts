import { Global, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { CompaniesResolver } from './companies.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompaniesService, CompaniesResolver],
  exports: [CompaniesService],
})
export class CompanyModule {}
