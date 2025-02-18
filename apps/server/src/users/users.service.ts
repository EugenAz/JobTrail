import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
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
}
