import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CompaniesService } from './companies.service';
import { CompanyEntity } from './company.entity';
import { UpdatedCompanyInput } from './updated-company.input';
import { CompanyModel } from './company.model';

@Resolver(() => CompanyModel)
export class CompaniesResolver {
  constructor(private companiesService: CompaniesService) {}

  @Query(() => [CompanyModel], { name: 'companies' })
  async getCompanies() {
    return this.companiesService.findAll();
  }

  @Mutation(() => CompanyModel, { name: 'createCompany' })
  async create(@Args('name') name: string): Promise<CompanyEntity> {
    return this.companiesService.create(name);
  }

  @Mutation(() => CompanyModel, { name: 'updateCompany' })
  async update(
    @Args('updatedCompanyData') updatedCompanyData: UpdatedCompanyInput
  ): Promise<CompanyEntity> {
    return this.companiesService.update(updatedCompanyData);
  }

  @Mutation(() => Boolean, { name: 'deleteCompany' })
  async delete(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.companiesService.delete(id);
  }
}
