import { useQuery, gql } from '@apollo/client';
import { ICompanyModel } from '@job-trail/types';

const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      id
      name
    }
  }
`;

export const useCompaniesGetter = () => {
  return useQuery<{ companies: ICompanyModel[] }>(GET_COMPANIES);
};
