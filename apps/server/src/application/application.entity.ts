import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatus } from '../types';
import { CampaignEntity } from '../campaign/campaign.entity';
import { CompanyEntity } from '../company/company.entity';

@Entity('applications')
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', name: 'date' })
  dateCreated: Date;

  @Column({ type: 'date', nullable: true, name: 'status_changed_at' })
  dateUpdated: Date;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.applications)
  @JoinColumn({ name: 'campaign_id' })
  campaign: CampaignEntity;

  @ManyToOne(() => CompanyEntity, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 100,
  })
  roleName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  link: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.OPEN,
  })
  status: ApplicationStatus;

  @Column('simple-array')
  notes: string[];
}
