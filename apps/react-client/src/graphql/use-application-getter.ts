import { useQuery, gql } from '@apollo/client';

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
  return useQuery(GET_APPLICATION(id));
};
