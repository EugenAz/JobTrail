import * as yup from 'yup';
import { ApplicationStatus } from '@job-trail/types';

export const applicationFormSchema = yup.object().shape({
  roleName: yup.string().required('Role Name is required'),
  status: yup
    .mixed<ApplicationStatus>()
    .oneOf(Object.values(ApplicationStatus))
    .required('Status is required'),
  companyId: yup.string().required('Company is required'),
  link: yup.string().url('Must be a valid URL'),
  dateCreated: yup.string().required('Date is required'),
  notes: yup.string(),
});
