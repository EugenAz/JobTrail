import { Injectable } from '@nestjs/common';
import { CampaignDetail } from './campaign-detail.model';
import { CampaignSummary } from './campaign-summary.model';

@Injectable()
export class CampaingsService {
  async create(
    data: any /* TODO: NewCampaignInput */,
  ): Promise<CampaignSummary> {
    return {} as any;
  }

  async findOneById(id: string): Promise<CampaignDetail> {
    return {
      id: 'id1',
      name: 'Nov 2024',
      dateStart: new Date('2024-12-23'),
      dateEnd: new Date('2024-12-23'),
      applications: [{ id: 'efwef' }],
    } as CampaignDetail;
  }

  async findAll(): Promise<CampaignSummary[]> {
    return [
      {
        id: 'id1',
        name: 'Nov 2024',
        dateStart: new Date('2024-12-23'),
        dateEnd: new Date('2024-12-23'),
      },
    ] as CampaignSummary[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
