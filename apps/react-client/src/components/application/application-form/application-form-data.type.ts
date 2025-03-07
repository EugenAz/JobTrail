import { IApplicationModel } from '@job-trail/types';

export type ApplicationFormData = Omit<
  IApplicationModel,
  'id' | 'dateUpdated' | 'campaign' | 'company'
> & {
  companyId: string;
};
