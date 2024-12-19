import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useCampaignCreator } from '../graphql/use-campaign-creator';
import { CampaignForm } from '../components/campaign-form/campaign-form';
import { MainHeading } from '../components/atoms/main-heading';
import { CampaignFormData } from '../components/campaign-form/campaign-form-data.type';

export const AddCampaign = () => {
  const navigate = useNavigate();
  const [createCampaign, { loading, error }] = useCampaignCreator();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

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
        navigate(`/campaign/${response.data.createCampaign.id}`);
      }
    } catch (err) {
      // TODO error strategy
      console.error('Error updating campaign:', err);
    }
  };

  return (
    <>
      <MainHeading>Add Campaign</MainHeading>
      <CampaignForm onSubmit={onSubmit} />
    </>
  );
};
