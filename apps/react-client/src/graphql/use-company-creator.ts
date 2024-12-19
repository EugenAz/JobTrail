import { useMutation, gql } from '@apollo/client';

const CREATE_COMPANY = gql`
  mutation CreateCompany($name: String!) {
    createCompany(name: $name) {
      id
      name
    }
  }
`;

export const useCompanyCreator = () => {
  return useMutation(CREATE_COMPANY);
};
