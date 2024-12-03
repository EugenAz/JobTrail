import { Injectable } from '@nestjs/common';
import { Campaign } from './campaign.model';

@Injectable()
export class CampaingsService {
  async create(data: any /* TODO: NewCampaignInput */): Promise<Campaign> {
    return {} as any;
  }

  async findOneById(id: number): Promise<Campaign> {
    return {} as any;
  }

  async findAll(): Promise<Campaign[]> {
    return [] as Campaign[];
  }

  async remove(id: number): Promise<boolean> {
    return true;
  }
}
