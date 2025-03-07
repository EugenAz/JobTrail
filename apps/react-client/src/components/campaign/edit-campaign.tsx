import { CampaignForm } from './campaign-form/campaign-form';
import { useParams } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCampaignUpdater } from './api/use-campaign-updater';
import { useCampaignGetter } from '../../api/use-campaign-getter';
import { CampaignFormData } from './campaign-form/campaign-form-data.type';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { MainHeading } from '../common/atoms/main-heading';

export const EditCampaign = () => {
  const { campaignId } = useParams<{ campaignId: string }>();

  if (!campaignId) {
    throw new Error('Campaign ID is missing');
  }

  const [
    updateCampaign,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useCampaignUpdater();
  const { loading, error, data } = useCampaignGetter(campaignId);

  if (!data) {
    throw new Error('Campaign data is unavailable');
  }

  const onSubmit: SubmitHandler<CampaignFormData> = async (c) => {
    try {
      await updateCampaign({
        variables: {
          updatedCampaignData: {
            id: campaignId,
            name: c.name,
            dateStart: c.dateStart,
            dateEnd: c.dateEnd,
          },
        },
      });
      toast.success(`Campaign updated`);
    } catch (err) {
      // TODO error strategy
      toast.error(`Error. Campaign not updated`);
      console.error('Error updating Campaign:', err);
    }
  };

  const initialData = {
    ...data.campaign,
    ...(mutationData?.updateCampaign || {}),
  };

  return (
    <LoadingErrorHandler
      loading={loading || mutationLoading}
      error={error || mutationError}
    >
      <MainHeading>Edit Campaign</MainHeading>

      <CampaignForm initialData={initialData} onSubmit={onSubmit} />

      <button className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
        Delete campaign
      </button>
    </LoadingErrorHandler>
  );
};
