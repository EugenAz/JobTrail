import { useMutation, gql } from '@apollo/client';

const UPDATE_APPLICATION = gql`
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

export const useApplicationUpdater = () => {
  return useMutation(UPDATE_APPLICATION);
};
