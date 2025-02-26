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
import { AsyncLocalStorageType } from '../common/types';
import { UsersService } from '../users/users.service';

@Injectable()
export class CampaingsService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    private readonly als: AsyncLocalStorage<AsyncLocalStorageType>,
    private readonly userService: UsersService
  ) {}

  async findOneById(id: string): Promise<CampaignEntity> {
    const userId = this.als.getStore().userId;
    return this.campaignRepository.findOne({
      where: { id, user: { id: userId } },
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
    const userId = this.als.getStore().userId;

    if (orderBy) {
      query
        .where({
          user: { id: userId },
        })
        .orderBy(
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
    const userId = this.als.getStore().userId;
    const user = await this.userService.findById(userId);
    const newCampaign = this.campaignRepository.create({
      name,
      dateStart,
      dateEnd,
      user,
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
      const userId = this.als.getStore().userId;
      const campaign = await this.campaignRepository.findOne({
        where: { id, user: { id: userId } },
      });

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
      const campaign = await this.findOneById(id);
      if (!campaign) {
        return false;
      }

      const result = await this.campaignRepository.delete(id);

      return result.affected > 0;
    } catch (error) {
      console.error(`Error deleting campaign with id ${id}:`, error);
      return false;
    }
  }
}
