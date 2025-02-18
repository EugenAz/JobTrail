import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { AuthUserInput } from './dto/auth.input';
import { UserModel } from '../users/user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { Public } from '../common/public.decorator';
import { LoginResponse } from './dto/login-response';
import { ENVIRONMENT } from '../env';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(AuthGuard)
  @Public()
  login(@Args('loginInput') loginInput: AuthUserInput, @Context() context) {
    if (!context?.res) {
      throw new Error('Response object not available in context.');
    }

    const tokenResponse = this.authService.login(context.user);

    context.res.cookie('jwt', tokenResponse.access_token, {
      httpOnly: true,
      secure: ENVIRONMENT === 'production',
      sameSite: 'strict',
    });

    return tokenResponse;
  }

  @Mutation(() => UserModel)
  signup(@Args('signupInput') signupInput: AuthUserInput) {
    return this.authService.signup(signupInput);
  }
}
