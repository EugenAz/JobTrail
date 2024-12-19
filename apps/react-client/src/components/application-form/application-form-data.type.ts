import { ApplicationModel } from '@job-trail/types';

export type ApplicationFormData = Omit<
  ApplicationModel,
  'id' | 'dateUpdated' | 'campaign' | 'company'
> & {
  companyId: string;
};
