import { FC } from 'react';
import { Link } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { SelectCompany } from './select-company';

interface ApplicationFormProps {
  initialData: any; // TODO
  onSubmit: any; // TODO
}

// Validation schema for the form
const schema = yup.object().shape({
  roleName: yup.string().required('Role Name is required'),
  status: yup.string().required('Status is required'),
  companyId: yup.string().required('Company is required'),
  link: yup.string().url('Must be a valid URL'),
  dateCreated: yup.string().required('Date is required'),
});

export const ApplicationForm: FC<ApplicationFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const { control, handleSubmit, watch } = useForm<any>({
    defaultValues: {
      roleName: initialData.roleName || '',
      status: initialData.status || 'OPEN', // TODO use enum
      companyId: initialData.companyId || '',
      link: initialData.link || '',
      notes: initialData.notes || '',
      dateCreated: initialData.dateCreated || '',
    },
    resolver: yupResolver(schema),
  });

  // const watchCompanyId = watch('companyId');

  return (
    <div>
      <Link to={`/campaign/${initialData.campaign.id}`}>Back to Campaign</Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Role Name</label>
          <Controller
            name="roleName"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input {...field} placeholder="Role Name" />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>
        <div>
          <label>Company</label>
          <Controller
            name="companyId"
            control={control}
            render={({ field, fieldState }) => (
              <SelectCompany {...field} error={fieldState.error?.message} />
            )}
          />
        </div>
        <div>
          <label>Application Link</label>
          <Controller
            name="link"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input {...field} placeholder="Application Link" />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          <label>Date</label>
          <Controller
            name="dateCreated"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <input {...field} placeholder="Date" />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          <label>Status</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="open">Open</option>
                <option value="reject">Rejected</option>
              </select>
            )}
          />
        </div>

        <div>
          <label>Notes</label>
          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <textarea {...field} placeholder="Notes" />
                {fieldState.error && <p>{fieldState.error.message}</p>}
              </>
            )}
          />
        </div>

        <div>
          Last status update:
          <time dateTime={initialData.dateUpdated}>
            {initialData.dateUpdated}
          </time>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
