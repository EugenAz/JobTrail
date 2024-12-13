import { Injectable } from '@nestjs/common';
import { CampaignSummaryModel } from './campaign-summary.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignEntity } from './campaign.entity';
import { Repository } from 'typeorm';
import { mapToCampaignSummaryModel } from './campaign.mappers';
import { NewCampaignInput } from './dto/new-campaign.input';
import { UpdatedCampaignInput } from './dto/updated-campaign.input';

// TODO come up with an abstraction that would deal with the mapping of entities to models and vice versa

@Injectable()
export class CampaingsService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>
  ) {}

  async findOneById(id: string): Promise<CampaignEntity> {
    return this.campaignRepository.findOne({
      where: { id },
      relations: [
        'applications',
        'applications.company',
        'applications.campaign',
      ],
    });
  }

  async findAll(): Promise<CampaignSummaryModel[]> {
    const campaigns = await this.campaignRepository.find();

    return campaigns.map(mapToCampaignSummaryModel);
  }

  async create({
    name,
    dateStart,
    dateEnd,
  }: NewCampaignInput): Promise<CampaignSummaryModel> {
    const newCampaign = this.campaignRepository.create({
      name,
      dateStart,
      dateEnd,
    });
    const savedCampaign = await this.campaignRepository.save(newCampaign);

    return mapToCampaignSummaryModel(savedCampaign);
  }

  async update({
    id,
    name,
    dateStart,
    dateEnd,
  }: UpdatedCampaignInput): Promise<CampaignSummaryModel> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    // TODO check if there's more optimal way to do this
    campaign.name = name ?? campaign.name;
    campaign.dateStart = dateStart ?? campaign.dateStart;
    campaign.dateEnd = dateEnd ?? campaign.dateEnd;

    const savedCampaign = await this.campaignRepository.save(campaign);

    return mapToCampaignSummaryModel(savedCampaign);
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.campaignRepository.delete(id);

      return result.affected > 0;
    } catch (error) {
      console.error(`Error deleting campaign with id ${id}:`, error);
      return false;
    }
  }
}
