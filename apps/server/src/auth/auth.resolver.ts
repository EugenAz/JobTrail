import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';

import { AuthUserInput } from './dto/auth.input';
import { UserModel } from '../users/user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Public } from '../common/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(AuthGuard)
  @Public()
  login(@Args('loginInput') loginInput: AuthUserInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => UserModel)
  signup(@Args('signupInput') signupInput: AuthUserInput) {
    return this.authService.signup(signupInput);
  }
}
