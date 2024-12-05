import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationStatus } from '../types';
import { Campaign } from '../campaign/campaign.entity';
import { Company } from '../company/company.entity';

@Entity()
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'date', nullable: true })
  status_changed_at: Date;

  @ManyToOne(() => Campaign, (campaign) => campaign.applications)
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaign;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({
    type: 'varchar',
    length: 100,
  })
  role_name: string;

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
