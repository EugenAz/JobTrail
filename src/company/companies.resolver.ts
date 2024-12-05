import { Query, Resolver } from '@nestjs/graphql';

import { CompaniesService } from './companies.service';
import { Company } from './company.model';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(private companiesService: CompaniesService) {}

  @Query(() => [Company], { name: 'companies' })
  async getCompanies() {
    return this.companiesService.findAll();
  }
}
