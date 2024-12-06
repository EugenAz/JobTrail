import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ApplicationModel } from './application.model';
import { ApplicationsService } from './applications.service';

@Resolver(() => ApplicationModel)
export class ApplicationsResolver {
  constructor(private applicationsService: ApplicationsService) {}

  @Query(() => ApplicationModel, { name: 'application' })
  async getApplication(@Args('id') id: string) {
    const application = await this.applicationsService.findOneById(id);

    if (!application) {
      throw new NotFoundException(id);
    }

    return application;
  }
}
