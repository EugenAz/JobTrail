import { useQuery, gql } from '@apollo/client';
import { IApplicationModel } from '@job-trail/types';

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

export const useApplicationGetter = (id: string) => {
  return useQuery<{ application: IApplicationModel }>(GET_APPLICATION(id));
};
