import { Injectable } from '@nestjs/common';
import { ApplicationModel } from './application.model';
import { NewApplicationInput } from './dto/new-application.input';

@Injectable()
export class ApplicationsService {
  async create(data: NewApplicationInput): Promise<ApplicationModel> {
    return {} as any;
  }

  async findOneById(id: string): Promise<ApplicationModel> {
    return {
      id,
      roleName: 'Tech Lead',
      link: 'https://link.com',
    } as ApplicationModel;
  }

  async findAllByCampaignId(campaignId: string): Promise<ApplicationModel[]> {
    return [] as ApplicationModel[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
