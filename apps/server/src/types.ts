import { registerEnumType } from '@nestjs/graphql';
import { ApplicationStatus } from '@job-trail/types';

registerEnumType(ApplicationStatus, { name: 'ApplicationStatus' });
