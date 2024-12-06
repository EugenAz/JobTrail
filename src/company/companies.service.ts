import { Injectable } from '@nestjs/common';
import { CompanyModel } from './company.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async findOneById(id: string): Promise<CompanyModel> {
    const campaign = await this.companyRepository.findOne({ where: { id } });

    return campaign;
  }

  async findAll(): Promise<CompanyModel[]> {
    return await this.companyRepository.find();
  }

  async create(data: any /* TODO: NewCompanyInput */): Promise<CompanyModel> {
    return {} as any;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
