import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  password: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  lastName: string;
}
