import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '../env';
import { JwtStrategy } from './jwt.strategy';
import { AsyncLocalStorage } from 'async_hooks';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AlsInterceptor } from './als.interceptor';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: JWT_SECRET,
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
    { provide: APP_INTERCEPTOR, useClass: AlsInterceptor },
  ],
  exports: [AsyncLocalStorage],
})
export class AuthModule {}
