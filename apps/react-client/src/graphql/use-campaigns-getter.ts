import { useQuery, gql } from '@apollo/client';
import { CampaignSummaryModel } from '@job-trail/types';

type Campaign = Pick<CampaignSummaryModel, 'id' | 'name'>;

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
