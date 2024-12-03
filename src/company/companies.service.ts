import { Injectable } from '@nestjs/common';
import { Company } from './company.model';

@Injectable()
export class CompaniesService {
  async create(data: any /* TODO: NewCompanyInput */): Promise<Company> {
    return {} as any;
  }

  async findOneById(id: number): Promise<Company> {
    return {} as any;
  }

  async findAll(): Promise<Company[]> {
    return [] as Company[];
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
