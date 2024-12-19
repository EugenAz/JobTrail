import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

import { ApplicationForm } from '../components/application-form/application-form';
import { useApplicationCreator } from '../graphql/use-application-creator';
import { ApplicationFormData } from '../components/application-form/application-form-data.type';
import { MainHeading } from '../components/atoms/main-heading';

export const AddApplication = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    throw new Error('campaign ID is missing');
  }

  const navigate = useNavigate();
  const [createApplication, { loading, error }] = useApplicationCreator();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  const onSubmit: SubmitHandler<ApplicationFormData> = async (d) => {
    try {
      const response = await createApplication({
        variables: {
          newApplicationInput: {
            campaignId,
            roleName: d.roleName,
            status: d.status,
            companyId: d.companyId,
            link: d.link,
            notes: d.notes,
            dateCreated: d.dateCreated,
          },
        },
      });

      navigate(`/application/${response.data.createApplication.id}`);
    } catch (err) {
      // TODO error strategy
      console.error('Error updating application:', err);
    }
  };

  return (
    <>
      <MainHeading>Add application</MainHeading>
      <ApplicationForm onSubmit={onSubmit} campaignId={campaignId} />
    </>
  );
};
