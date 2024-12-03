import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationStatus {
  OPEN,
  REJECTED,
  CLOSED,
  EXPIRED,
}

registerEnumType(ApplicationStatus, { name: 'ApplicationStatus' });
