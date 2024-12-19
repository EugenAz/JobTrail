import { CampaignForm } from '../components/campaign-form/campaign-form';
import { useParams } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { useCampaignUpdater } from '../graphql/use-campaign-updater';
import { useCampaignGetter } from '../graphql/use-campaign-getter';
import { CampaignFormData } from '../components/campaign-form/campaign-form-data.type';
import { MainHeading } from '../components/atoms/main-heading';

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

  if (loading || mutationLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  if (mutationError) {
    <p>{mutationError.message}</p>;
  }

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
    } catch (err) {
      // TODO error strategy
      console.error('Error updating Campaign:', err);
    }
  };

  const initialData = {
    ...data.campaign,
    ...(mutationData?.updateCampaign || {}),
  };

  return (
    <>
      <MainHeading>Edit Campaign</MainHeading>
      <CampaignForm initialData={initialData} onSubmit={onSubmit} />
    </>
  );
};
