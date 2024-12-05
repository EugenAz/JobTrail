import { Injectable } from '@nestjs/common';
import { Company } from './company.model';

@Injectable()
export class CompaniesService {
  async create(data: any /* TODO: NewCompanyInput */): Promise<Company> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Company> {
    return {} as any;
  }

  async findAll(): Promise<Company[]> {
    return [
      { id: 'id1', name: 'Company Name' },
      { id: 'id2', name: 'Company Name 2' },
      { id: 'id3', name: 'Company Name 3' },
    ] as Company[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
