import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { getToday, formatDate } from '@job-trail/dates';
import { ICampaignSummaryModel } from '@job-trail/types';
import { CampaignFormData } from './campaign-form-data.type';
import { campaignFormSchema } from './campaign-form.schema';

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
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="col-span-2">
          <label htmlFor="name" className="block text-lg font-medium">
            Name
          </label>
          <div className="mt-2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    autoFocus
                    id="name"
                    placeholder="Campaign name"
                  />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </>
              )}
            />
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="dateStart" className="block text-lg font-medium">
            Start date
          </label>
          <div className="mt-2">
            <Controller
              name="dateStart"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    id="dateStart"
                    placeholder="Start date"
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </>
              )}
            />
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="dateEnd" className="block text-lg font-medium">
            End date
          </label>
          <div className="mt-2">
            <Controller
              name="dateEnd"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    {...field}
                    id="dateEnd"
                    placeholder="End date"
                    className="block rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {fieldState.error && <p>{fieldState.error.message}</p>}
                </>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isEdit ? 'Save' : 'Create'}
        </button>
      </div>
    </form>
  );
};
