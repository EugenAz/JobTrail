import { useQuery, gql } from '@apollo/client';
import { ICampaignSummaryModel } from '@job-trail/types';

const GET_CAMPAIGNS = gql`
  query GetCampaigns($orderBy: OrderByInput) {
    campaigns(orderBy: $orderBy) {
      id
      name
      dateStart
      dateEnd
    }
  }
`;

export const useCampaignsGetter = () => {
  return useQuery<{ campaigns: ICampaignSummaryModel[] }>(GET_CAMPAIGNS, {
    variables: { orderBy: { field: 'dateStart', direction: 'ASC' } },
  });
};
