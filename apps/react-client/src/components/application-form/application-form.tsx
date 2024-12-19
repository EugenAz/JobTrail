import { FC } from 'react';
import { Link } from 'react-router';
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { SelectCompany } from '../select-company';
import { getToday, formatDate } from '@job-trail/dates';
import { ApplicationModel, ApplicationStatus } from '@job-trail/types';
import { ApplicationFormData } from './application-form-data.type';
import { applicationFormSchema } from './application-form.schema';

interface ApplicationFormProps {
  initialData?: ApplicationModel;
  onSubmit: (applicationFormData: ApplicationFormData) => void;
  campaignId: string;
}

export const ApplicationForm: FC<ApplicationFormProps> = ({
  onSubmit,
  campaignId,
  initialData,
}) => {
  const isEdit = !!initialData;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      roleName: initialData?.roleName ?? '',
      status: initialData?.status ?? ApplicationStatus.OPEN,
      companyId: initialData?.company.id ?? '',
      link: initialData?.link ?? '',
      notes: initialData?.notes ?? '',
      dateCreated: initialData?.dateCreated
        ? formatDate(initialData?.dateCreated)
        : getToday(),
    },
    resolver: yupResolver(applicationFormSchema),
  });

  return (
    <div>
      <Link to={`/campaign/${campaignId}`}>Back to Campaign</Link>

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
                <option value="OPEN">Open</option>
                <option value="REJECTED">Rejected</option>
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

        {isEdit && initialData?.dateUpdated && (
          <div>
            Last status update:
            <time dateTime={formatDate(initialData?.dateUpdated)}>
              {formatDate(initialData?.dateUpdated)}
            </time>
          </div>
        )}

        <button type="submit">{isEdit ? 'Save' : 'Create'}</button>
      </form>
    </div>
  );
};
