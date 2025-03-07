import { Link, useNavigate, useParams } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useApplicationUpdater } from './api/use-application-updater';
import { useApplicationGetter } from './api/use-application-getter';
import { ApplicationFormData } from './application-form/application-form-data.type';
import { MainHeading } from '../common/atoms/main-heading';
import { ApplicationForm } from './application-form/application-form';

export const EditApplication = () => {
  const navigate = useNavigate();
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
    navigate('/404');
    return;
  }

  const onSubmit: SubmitHandler<ApplicationFormData> = async (d) => {
    try {
      await updateApplication({
        variables: {
          updatedApplicationInput: {
            id: applicationId,
            roleName: d.roleName,
            status: d.status.toUpperCase(),
            companyId: d.companyId,
            link: d.link,
            notes: d.notes,
            dateCreated: d.dateCreated,
          },
        },
      });
      toast.success(`Application updated`);
      navigate(`/campaign/${data.application.campaign.id}`);
    } catch (err) {
      // TODO error strategy
      toast.error(`Error. Application not updated`);
      console.error('Error updating application:', err);
    }
  };

  const initialData = {
    ...data.application,
    ...(mutationData?.updateApplication || {}),
  };

  return (
    <>
      <MainHeading>Edit application</MainHeading>
      <Link className="underline" to={`/campaign/${initialData.campaign.id}`}>
        To the campaign
      </Link>
      <ApplicationForm
        initialData={initialData}
        onSubmit={onSubmit}
        campaignId={initialData.campaign.id}
      />
    </>
  );
};
