import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { DB, DB_PASSWORD, DB_USERNAME, ENVIRONMENT } from './env';

import { ApplicationModule } from './application/application.module';
import { CompanyModule } from './company/company.module';
import { CampaignModule } from './campaign/campaign.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB,
      entities: [__dirname + '/**/*.entity.ts'],
      autoLoadEntities: true,
      synchronize: ENVIRONMENT === 'development',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    CompanyModule,
    CampaignModule,
    ApplicationModule,
  ],
})
export class AppModule {}
