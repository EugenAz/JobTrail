import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ApplicationsService } from './applications.service';
import { NewApplicationInput } from './dto/new-application.input';
import { UpdatedApplicationInput } from './dto/updated-application.input';
import { ApplicationModel } from './application.model';

@Resolver(() => ApplicationModel)
export class ApplicationsResolver {
  constructor(private applicationsService: ApplicationsService) {}

  @Query(() => ApplicationModel, { name: 'application' })
  async getApplication(@Args('id') id: string) {
    const application = await this.applicationsService.findOneById(id);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  @Mutation(() => ApplicationModel, { name: 'createApplication' })
  async create(
    @Args('newApplicationInput') newApplicationInput: NewApplicationInput
  ): Promise<ApplicationModel> {
    return this.applicationsService.create(newApplicationInput);
  }

  @Mutation(() => ApplicationModel, { name: 'updateApplication' })
  async update(
    @Args('updatedApplicationInput')
    updatedApplicationInput: UpdatedApplicationInput
  ): Promise<ApplicationModel> {
    return this.applicationsService.update(updatedApplicationInput);
  }

  @Mutation(() => Boolean, { name: 'deleteApplication' })
  async delete(@Args('id') id: string): Promise<boolean> {
    return this.applicationsService.delete(id);
  }
}
