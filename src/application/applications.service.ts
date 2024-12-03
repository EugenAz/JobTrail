import { Injectable } from '@nestjs/common';
import { Application } from './application.model';
import { NewApplicationInput } from './dto/new-application.input';

@Injectable()
export class ApplicationsService {
  async create(data: NewApplicationInput): Promise<Application> {
    return {} as any;
  }

  async findOneById(id: number): Promise<Application> {
    return { id, roleName: 'Tech Lead' } as any;
  }

  async findAllByCampaignId(campaignId: number): Promise<Application[]> {
    return [] as Application[];
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
