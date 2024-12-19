import { useMutation, gql } from '@apollo/client';

import { ApplicationForm } from '../components/application-form';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';

// TODO move all mutations to the mutations directory

export const CREATE_APPLICATION = gql`
  mutation CreateApplication($newApplicationInput: NewApplicationInput!) {
    createApplication(newApplicationInput: $newApplicationInput) {
      id
    }
  }
`;

export const AddApplication = () => {
  const { campaignId } = useParams();

  if (!campaignId) {
    throw new Error('campaign ID is missing');
  }

  const navigate = useNavigate();

  const [createApplication, { loading, error }] =
    useMutation(CREATE_APPLICATION);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  const onSubmit: SubmitHandler<any> = async (d) => {
    try {
      const response = await createApplication({
        variables: {
          newApplicationInput: {
            roleName: d.roleName,
            status: d.status,
            companyId: d.companyId,
            link: d.link,
            notes: d.notes,
            dateCreated: d.dateCreated,
            campaignId: campaignId,
          },
        },
      });
      console.log('Application updated:', response.data.createApplication);
      // TODO happy path => redirect to edit page OR campaign page
      navigate(`/application/${response.data.createApplication.id}`);
    } catch (err) {
      // TODO error strategy
      console.error('Error updating application:', err);
    }
  };

  return <ApplicationForm onSubmit={onSubmit} campaignId={campaignId} />;
};
