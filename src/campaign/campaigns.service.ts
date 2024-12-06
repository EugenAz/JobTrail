import { Injectable } from '@nestjs/common';
import { CampaignDetailModel } from './campaign-detail.model';
import { CampaignSummaryModel } from './campaign-summary.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignEntity } from './campaign.entity';
import { Repository } from 'typeorm';
import {
  mapToCampaignDetailModel,
  mapToCampaignSummaryModel,
} from './campaign.mappers';

@Injectable()
export class CampaingsService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
  ) {}

  async findOneById(id: string): Promise<CampaignDetailModel> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: [
        'applications',
        'applications.company',
        'applications.campaign',
      ],
    });

    return mapToCampaignDetailModel(campaign);
  }

  async findAll(): Promise<CampaignSummaryModel[]> {
    const campaigns = await this.campaignRepository.find();

    return campaigns.map(mapToCampaignSummaryModel);
  }

  async create(
    data: any /* TODO: NewCampaignInput */,
  ): Promise<CampaignSummaryModel> {
    return {} as any;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
