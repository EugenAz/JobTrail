import { SubmitHandler } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import { useApplicationCreator } from './api/use-application-creator';
import { LoadingErrorHandler } from '../common/loading-error-handler';
import { ApplicationFormData } from './application-form/application-form-data.type';
import { MainHeading } from '../common/atoms/main-heading';
import { ApplicationForm } from './application-form/application-form';

export const AddApplication = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    throw new Error('campaign ID is missing');
  }

  const navigate = useNavigate();
  const [createApplication, { loading, error }] =
    useApplicationCreator(campaignId);

  const onSubmit: SubmitHandler<ApplicationFormData> = async (d) => {
    try {
      await createApplication({
        variables: {
          newApplicationInput: {
            campaignId,
            roleName: d.roleName,
            status: d.status.toUpperCase(),
            companyId: d.companyId,
            link: d.link,
            notes: d.notes,
            dateCreated: d.dateCreated,
          },
        },
      });

      toast.success(`Application created`);
      navigate(`/campaign/${campaignId}`);
    } catch (err) {
      // TODO error strategy
      toast.error(`Error. Application was not created.`);
      console.error('Error creating application:', err);
    }
  };

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <MainHeading>Add application</MainHeading>
      <Link className="underline" to={`/campaign/${campaignId}`}>
        To the campaign
      </Link>
      <ApplicationForm onSubmit={onSubmit} campaignId={campaignId} />
    </LoadingErrorHandler>
  );
};
