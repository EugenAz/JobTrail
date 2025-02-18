import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginResponse } from './dto/login-response';
import { UserModel } from '../users/user.model';
import { JwtService } from '@nestjs/jwt';
import { AuthUserInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserModel | null> {
    const user = await this.usersService.findOne(username);

    const doesPasswordMatch = await bcrypt.compare(password, user?.password);

    if (user && doesPasswordMatch) {
      const { password, ...u } = user;
      return u;
    }

    return null;
  }

  async login(user: UserModel): Promise<LoginResponse> {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
    };
  }

  async signup(signupInput: AuthUserInput) {
    return this.usersService.create({
      ...signupInput,
    });
  }
}
