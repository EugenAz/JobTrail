import { ApplicationForm } from '../components/application-form/application-form';
import { useParams } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { useApplicationUpdater } from '../graphql/use-application-updater';
import { useApplicationGetter } from '../graphql/use-application-getter';
import { ApplicationFormData } from '../components/application-form/application-form-data.type';

export const EditApplication = () => {
  const { applicationId } = useParams<{ applicationId: string }>();

  if (!applicationId) {
    throw new Error('application ID is missing');
  }

  const [
    updateApplication,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useApplicationUpdater();
  const { loading, error, data } = useApplicationGetter(applicationId);

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
    throw new Error('application data is unavailable');
  }

  const onSubmit: SubmitHandler<ApplicationFormData> = async (d) => {
    try {
      await updateApplication({
        variables: {
          updatedApplicationInput: {
            id: applicationId,
            roleName: d.roleName,
            status: d.status,
            companyId: d.companyId,
            link: d.link,
            notes: d.notes,
            dateCreated: d.dateCreated,
          },
        },
      });
    } catch (err) {
      // TODO error strategy
      console.error('Error updating application:', err);
    }
  };

  const initialData = {
    ...data.application,
    ...(mutationData?.updateApplication || {}),
  };

  return (
    <ApplicationForm
      initialData={initialData}
      onSubmit={onSubmit}
      campaignId={initialData.campaign.id}
    />
  );
};
