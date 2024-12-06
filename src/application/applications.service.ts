import { Injectable } from '@nestjs/common';
import { ApplicationModel } from './application.model';
import { NewApplicationInput } from './dto/new-application.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { Repository } from 'typeorm';
import { mapToApplicationModel } from './application.mappers';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationsRepository: Repository<ApplicationEntity>,
  ) {}

  async create(data: NewApplicationInput): Promise<ApplicationModel> {
    return {} as any;
  }

  async findOneById(id: string): Promise<ApplicationModel> {
    const application = await this.applicationsRepository.findOne({
      where: { id },
      relations: ['companies', 'campaigns'],
    });

    return mapToApplicationModel(application);
  }

  async findAllByCampaignId(campaignId: string): Promise<ApplicationModel[]> {
    return [] as ApplicationModel[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
