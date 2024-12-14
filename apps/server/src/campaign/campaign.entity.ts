import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationEntity } from '../application/application.entity';

@Entity('campaigns')
export class CampaignEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @Column({ type: 'date', name: 'date_start' })
  dateStart: string;

  @Column({ type: 'date', nullable: true, name: 'date_end' })
  dateEnd: string;

  @OneToMany(() => ApplicationEntity, (application) => application.campaign)
  applications: ApplicationEntity[];
}
