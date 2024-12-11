import { Injectable } from '@nestjs/common';
import { CompanyModel } from './company.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';
import { UpdatedCompanyInput } from './updated-company.input';

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

  async create(name: string): Promise<CompanyModel> {
    const company = this.companyRepository.create({ name });

    return this.companyRepository.save(company);
  }

  async update({ id, name }: UpdatedCompanyInput): Promise<CompanyModel> {
    const company = await this.companyRepository.findOne({ where: { id } });
    company.name = name;

    return this.companyRepository.save(company);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.companyRepository.delete(id);

      return result.affected > 0;
    } catch (error) {
      console.error(`Error deleting company with id ${id}:`, error);
      return false;
    }
  }
}
