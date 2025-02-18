import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import {
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
  DB_USERNAME,
  ENVIRONMENT,
} from './env';

import { ApplicationModule } from './application/application.module';
import { CompanyModule } from './company/company.module';
import { CampaignModule } from './campaign/campaign.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [__dirname + '/**/*.entity.ts'],
      autoLoadEntities: true,
      migrationsRun: ENVIRONMENT !== 'development',
      synchronize: ENVIRONMENT === 'development',
      logging: ENVIRONMENT !== 'production',
      migrations: ['./migrations/*.js'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        ENVIRONMENT === 'development'
          ? 'apps/server/src/schema.gql'
          : 'schema.gql'
      ),
      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
      playground: ENVIRONMENT !== 'production',
    }),
    UsersModule,
    CompanyModule,
    CampaignModule,
    ApplicationModule,
    AuthModule,
  ],
})
export class AppModule {}
