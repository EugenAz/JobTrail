import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useCampaignCreator } from './api/use-campaign-creator';
import { CampaignForm } from './campaign-form/campaign-form';
import { CampaignFormData } from './campaign-form/campaign-form-data.type';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { toast } from 'react-toastify';
import { MainHeading } from '../common/atoms/main-heading';

export const AddCampaign = () => {
  const navigate = useNavigate();
  const [createCampaign, { loading, error }] = useCampaignCreator();

  const onSubmit: SubmitHandler<CampaignFormData> = async (c) => {
    try {
      const response = await createCampaign({
        variables: {
          newCampaignInput: {
            name: c.name,
            dateStart: c.dateStart,
            ...(c.dateEnd ? { dateEnd: c.dateEnd } : {}),
          },
        },
      });

      if (response.data?.createCampaign) {
        toast.success(`Campaign created`);
        navigate(`/campaign/${response.data.createCampaign.id}`);
      }
    } catch (err) {
      // TODO error strategy
      toast.error(`Campaign not created`);
      console.error('Error updating campaign:', err);
    }
  };

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <MainHeading>Add Campaign</MainHeading>
      <CampaignForm onSubmit={onSubmit} />
    </LoadingErrorHandler>
  );
};
