import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import cx from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';

import { SelectCompany } from '../select-company';
import { getToday, formatDate } from '@job-trail/dates';
import { IApplicationModel, ApplicationStatus } from '@job-trail/types';
import { ApplicationFormData } from './application-form-data.type';
import { applicationFormSchema } from './application-form.schema';
import { FormContainer } from '../atoms/form-container';
import { FormControlRow } from '../atoms/form-control-row';
import { Button } from '../atoms/button';

interface ApplicationFormProps {
  initialData?: IApplicationModel;
  onSubmit: (applicationFormData: ApplicationFormData) => void;
  campaignId: string;
}

export const ApplicationForm: FC<ApplicationFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const isEdit = !!initialData;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      roleName: initialData?.roleName ?? '',
      status: initialData?.status
        ? (initialData.status.toLowerCase() as ApplicationStatus)
        : ApplicationStatus.OPEN,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <FormControlRow
            label="Role name"
            htmlFor="roleName"
            control={({ controlClassName }) => (
              <Controller
                name="roleName"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      placeholder="Role Name"
                      id="roleName"
                      className={controlClassName}
                    />
                    {fieldState.error && <p>{fieldState.error.message}</p>}
                  </>
                )}
              />
            )}
          />

          <FormControlRow
            label="Company"
            htmlFor="companyId"
            control={() => (
              <Controller
                name="companyId"
                control={control}
                render={({ field, fieldState }) => (
                  <SelectCompany {...field} error={fieldState.error?.message} />
                )}
              />
            )}
          />

          <FormControlRow
            label="Application link"
            htmlFor="link"
            control={({ controlClassName }) => (
              <Controller
                name="link"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      id="link"
                      placeholder="Application link"
                      className={controlClassName}
                    />
                    {fieldState.error && <p>{fieldState.error.message}</p>}
                  </>
                )}
              />
            )}
          />

          <FormControlRow
            label="Date"
            htmlFor="dateCreated"
            control={({ controlClassName }) => (
              <Controller
                name="dateCreated"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      {...field}
                      id="dateCreated"
                      placeholder="Date"
                      className={controlClassName}
                    />
                    {fieldState.error && <p>{fieldState.error.message}</p>}
                  </>
                )}
              />
            )}
          />

          <FormControlRow
            label="Status"
            htmlFor="status"
            control={({ controlClassName }) => (
              <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      id="status"
                      className={cx(controlClassName, 'min-h-9')}
                    >
                      <option value={ApplicationStatus.OPEN}>Open</option>
                      <option value={ApplicationStatus.REJECTED}>
                        Rejected
                      </option>
                      <option value={ApplicationStatus.IN_PROGRESS}>
                        In Progress
                      </option>
                      <option value={ApplicationStatus.CLOSED}>Closed</option>
                      <option value={ApplicationStatus.EXPIRED}>Expired</option>
                    </select>

                    {fieldState.error && <p>{fieldState.error.message}</p>}
                  </>
                )}
              />
            )}
          />

          {isEdit && initialData?.dateUpdated && (
            <div>
              Last status update:{' '}
              <time dateTime={formatDate(initialData?.dateUpdated)}>
                {formatDate(initialData?.dateUpdated)}
              </time>
            </div>
          )}

          <FormControlRow
            label="Notes"
            htmlFor="notes"
            control={({ controlClassName }) => (
              <Controller
                name="notes"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <textarea
                      {...field}
                      id="notes"
                      placeholder="Notes"
                      className={cx(controlClassName, 'h-24')}
                    />
                    {fieldState.error && <p>{fieldState.error.message}</p>}
                  </>
                )}
              />
            )}
          />

          <Button type="submit">{isEdit ? 'Save' : 'Create'}</Button>
        </FormContainer>
      </form>
    </div>
  );
};
