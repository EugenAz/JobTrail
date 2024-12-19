import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { getToday, formatDate } from '@job-trail/dates';
import { ICampaignSummaryModel } from '@job-trail/types';
import { CampaignFormData } from './campaign-form-data.type';
import { campaignFormSchema } from './campaign-form.schema';
import { FormContainer } from '../atoms/form-container';
import { FormControlRow } from '../atoms/form-control-row';
import { Button } from '../atoms/button';

interface CampaignFormProps {
  initialData?: ICampaignSummaryModel;
  onSubmit: (CampaignFormData: CampaignFormData) => void;
}

export const CampaignForm: FC<CampaignFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const isEdit = !!initialData;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: initialData?.name ?? '',
      dateStart: initialData?.dateStart
        ? formatDate(initialData?.dateStart)
        : getToday(),
      dateEnd: initialData?.dateEnd ? formatDate(initialData?.dateEnd) : '',
    },
    resolver: yupResolver(campaignFormSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormControlRow
          htmlFor="name"
          label="Name"
          control={({ controlClassName }) => (
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={controlClassName}
                    autoFocus
                    id="name"
                    placeholder="Campaign name"
                  />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </>
              )}
            />
          )}
        />
        <FormControlRow
          htmlFor="dateStart"
          label="Start date"
          control={({ controlClassName }) => (
            <Controller
              name="dateStart"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={controlClassName}
                    id="dateStart"
                    placeholder="Start date"
                  />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </>
              )}
            />
          )}
        />
        <FormControlRow
          htmlFor="dateEnd"
          label="End date"
          control={({ controlClassName }) => (
            <Controller
              name="dateEnd"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className={controlClassName}
                    id="dateEnd"
                    placeholder="End date"
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
  );
};
