import { gql, useMutation } from '@apollo/client';

const DELETE_APPLICATION = gql`
  mutation DeleteApplication($id: String!) {
    deleteApplication(id: $id)
  }
`;

export const useApplicationDeleter = () => {
  return useMutation(DELETE_APPLICATION);
};
