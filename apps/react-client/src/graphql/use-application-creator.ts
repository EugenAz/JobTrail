import { useMutation, gql } from '@apollo/client';

const CREATE_APPLICATION = gql`
  mutation CreateApplication($newApplicationInput: NewApplicationInput!) {
    createApplication(newApplicationInput: $newApplicationInput) {
      id
    }
  }
`;

export const useApplicationCreator = () => {
  return useMutation(CREATE_APPLICATION);
};
