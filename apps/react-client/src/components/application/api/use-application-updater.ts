import { useMutation, gql } from '@apollo/client';
import { IApplicationModel } from '@job-trail/types';

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
  return useMutation<{ updateApplication: IApplicationModel }>(
    UPDATE_APPLICATION
  );
};
