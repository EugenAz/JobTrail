import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';
import { UpdatedCompanyInput } from './updated-company.input';
import { AsyncLocalStorageType } from '../common/types';
import { AsyncLocalStorage } from 'async_hooks';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly als: AsyncLocalStorage<AsyncLocalStorageType>,
    private readonly userService: UsersService
  ) {}

  async findOneById(id: string): Promise<CompanyEntity> {
    const userId = this.als.getStore().userId;
    const campaign = await this.companyRepository.findOne({
      where: { id, user: { id: userId } },
    });

    return campaign;
  }

  async findAll(): Promise<CompanyEntity[]> {
    const userId = this.als.getStore().userId;
    return await this.companyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async create(name: string): Promise<CompanyEntity> {
    const userId = this.als.getStore().userId;
    const user = await this.userService.findById(userId);
    const company = this.companyRepository.create({ name, user });

    return this.companyRepository.save(company);
  }

  async update({ id, name }: UpdatedCompanyInput): Promise<CompanyEntity> {
    const userId = this.als.getStore().userId;
    const company = await this.companyRepository.findOne({
      where: { id, user: { id: userId } },
    });
    company.name = name;

    return this.companyRepository.save(company);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const company = await this.findOneById(id);
      if (!company) {
        return false;
      }

      const result = await this.companyRepository.delete(id);

      return result.affected > 0;
    } catch (error) {
      console.error(`Error deleting company with id ${id}:`, error);
      return false;
    }
  }
}
