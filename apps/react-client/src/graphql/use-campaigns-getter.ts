import { useQuery, gql } from '@apollo/client';
import { ICampaignSummaryModel } from '@job-trail/types';

type Campaign = Pick<ICampaignSummaryModel, 'id' | 'name'>;

const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      id
      name
    }
  }
`;

export const useCampaignsGetter = () => {
  return useQuery<{ campaigns: Campaign[] }>(GET_CAMPAIGNS);
};
