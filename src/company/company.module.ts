import { Global, Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { CompaniesResolver } from './companies.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  providers: [CompaniesService, CompaniesResolver],
  exports: [CompaniesService],
})
export class CompanyModule {}
