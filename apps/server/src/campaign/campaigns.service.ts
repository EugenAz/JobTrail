import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignEntity } from './campaign.entity';
import { Repository } from 'typeorm';
import { mapToCampaignSummaryModel } from './campaign.mappers';
import { NewCampaignInput } from './dto/new-campaign.input';
import { UpdatedCampaignInput } from './dto/updated-campaign.input';
import { CampaignSummaryModel } from './campaign-summary.model';
import { OrderByInput } from '../common/dto/order-by.input';
import { AsyncLocalStorage } from 'async_hooks';
import { AsyncLocalStorageType } from '../auth/types';

@Injectable()
export class CampaingsService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    private readonly als: AsyncLocalStorage<AsyncLocalStorageType>
  ) {}

  async findOneById(id: string): Promise<CampaignEntity> {
    return this.campaignRepository.findOne({
      where: { id },
      relations: [
        'applications',
        'applications.company',
        'applications.campaign',
      ],
      order: {
        applications: {
          dateCreated: 'DESC',
        },
      },
    });
  }

  async findAll(
    orderBy?: OrderByInput<CampaignSummaryModel>
  ): Promise<CampaignSummaryModel[]> {
    const query = this.campaignRepository.createQueryBuilder('campaigns');
    const userId = this.als.getStore()['userId'];

    console.log('!! userId', userId);

    if (orderBy) {
      query.orderBy(
        `campaigns.${orderBy.field}`,
        orderBy.direction.toUpperCase() as 'ASC' | 'DESC'
      );
    }

    const campaigns = await query.getMany();

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
    try {
      const campaign = await this.campaignRepository.findOne({ where: { id } });

      if (!campaign) {
        throw new Error(`Campaign with id ${id} not found`);
      }

      campaign.name = name ?? campaign.name;
      campaign.dateStart = dateStart ?? campaign.dateStart;
      campaign.dateEnd = dateEnd ?? campaign.dateEnd;

      const savedCampaign = await this.campaignRepository.save(campaign);

      return mapToCampaignSummaryModel(savedCampaign);
    } catch (error) {
      console.error(`Error updating campaign with id ${id}:`, error);
      throw error;
    }
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
