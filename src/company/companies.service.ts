import { Injectable } from '@nestjs/common';
import { CompanyModel } from './company.model';

@Injectable()
export class CompaniesService {
  async create(data: any /* TODO: NewCompanyInput */): Promise<CompanyModel> {
    return {} as any;
  }

  async findOneById(id: string): Promise<CompanyModel> {
    return {} as any;
  }

  async findAll(): Promise<CompanyModel[]> {
    return [
      { id: 'id1', name: 'Company Name' },
      { id: 'id2', name: 'Company Name 2' },
      { id: 'id3', name: 'Company Name 3' },
    ] as CompanyModel[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
