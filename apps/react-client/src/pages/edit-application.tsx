import { useQuery, useMutation, gql } from '@apollo/client';

import { ApplicationForm } from '../components/application-form';
import { useParams } from 'react-router';
import { SubmitHandler } from 'react-hook-form';

// updateApplication(updatedApplicationInput: UpdatedApplicationInput!): ApplicationModel!
export const UPDATE_APPLICATION = gql`
  mutation UpdateApplication(
    $updatedApplicationInput: UpdatedApplicationInput!
  ) {
    updateApplication(updatedApplicationInput: $updatedApplicationInput) {
      id
      roleName
      status
      dateCreated
      notes
      link
      company {
        id
        name
      }
    }
  }
`;

const GET_APPLICATION = (id: string) => gql`
  query GetApplication {
    application(id: "${id}") {
      roleName
      status
      dateCreated
      dateUpdated
      notes
      link
      company {
        id
        name
      }
      campaign {
        id
        name
      }
    }
  }
`;

export const EditApplication = () => {
  let { applicationId } = useParams();
  const [
    updateApplication,
    { loading: mutationLoading, error: mutationError, data: mutationData },
  ] = useMutation(UPDATE_APPLICATION);
  const { loading, error, data } = useQuery(GET_APPLICATION(applicationId));

  if (loading || mutationLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  if (mutationError) {
    <p>{mutationError.message}</p>;
  }

  const onSubmit: SubmitHandler<any> = async (d) => {
    try {
      const response = await updateApplication({
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
      console.log('Application updated:', response.data.updateApplication);
      // TODO happy path => redirect?
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
