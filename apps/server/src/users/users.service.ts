import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AsyncLocalStorageType } from '../common/types';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly als: AsyncLocalStorage<AsyncLocalStorageType>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const password = await bcrypt.hash(createUserInput.password, 10);
    const user = this.usersRepository.create({ ...createUserInput, password });

    await this.usersRepository.save(user);

    return user;
  }

  async findOne(username: string): Promise<UserEntity> {
    const user = this.usersRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<UserEntity> {
    const userId = this.als.getStore().userId;

    if (userId !== id) {
      return null;
    }

    const user = this.usersRepository.findOne({ where: { id } });

    if (!user) {
      return null;
    }

    return user;
  }
}
