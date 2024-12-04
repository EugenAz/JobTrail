import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ApplicationModule } from './application/application.module';
import { CompanyModule } from './company/company.module';
import { CampaignModule } from './campaign/campaign.module';

import { DB, DB_PASSWORD, DB_USERNAME, ENVIRONMENT } from './env';

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
    CompanyModule,
    CampaignModule,
    ApplicationModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
