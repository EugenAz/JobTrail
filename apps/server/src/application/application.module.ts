import { Global, Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsResolver } from './applications.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity } from './application.entity';
import { SharedModule } from '../common/shared.module';

@Global()
@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([ApplicationEntity])],
  providers: [ApplicationsService, ApplicationsResolver],
  exports: [ApplicationsService, ApplicationsResolver],
})
export class ApplicationModule {}
