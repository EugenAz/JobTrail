import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationEntity } from '../application/application.entity';
import { UserEntity } from '../users/user.entity';

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

  @ManyToOne(() => UserEntity, { eager: true, nullable: true }) // TODO make nullable after migration
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
