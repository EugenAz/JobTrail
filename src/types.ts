import { registerEnumType } from '@nestjs/graphql';

export enum ApplicationStatus {
  OPEN = 'open',
  REJECTED = 'rejected',
  CLOSED = 'closed',
  EXPIRED = 'expired',
}

registerEnumType(ApplicationStatus, { name: 'ApplicationStatus' });
