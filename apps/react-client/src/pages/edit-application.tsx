import { useQuery, gql } from '@apollo/client';

import { ApplicationForm } from '../components/application-form';
import { useParams } from 'react-router';
import { SubmitHandler } from 'react-hook-form';

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
  const { loading, error, data } = useQuery(GET_APPLICATION(applicationId));

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    <p>{error.message}</p>;
  }

  const initialData = data.application;

  const onSubmit: SubmitHandler<any> = (d) => console.log(d);

  return <ApplicationForm initialData={initialData} onSubmit={onSubmit} />;
};
