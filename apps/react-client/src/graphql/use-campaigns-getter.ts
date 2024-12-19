import { useQuery, gql } from '@apollo/client';

const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      id
      name
    }
  }
`;

export const useCampaignsGetter = () => {
  return useQuery(GET_CAMPAIGNS);
};
