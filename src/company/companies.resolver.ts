import { Query, Resolver } from '@nestjs/graphql';

import { CompaniesService } from './companies.service';
import { CompanyModel } from './company.model';

@Resolver(() => CompanyModel)
export class CompaniesResolver {
  constructor(private companiesService: CompaniesService) {}

  @Query(() => [CompanyModel], { name: 'companies' })
  async getCompanies() {
    return this.companiesService.findAll();
  }
}
