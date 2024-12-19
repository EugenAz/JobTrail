import { useQuery, gql } from '@apollo/client';

const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      id
      name
    }
  }
`;

export const useCompaniesGetter = () => {
  return useQuery(GET_COMPANIES);
};
