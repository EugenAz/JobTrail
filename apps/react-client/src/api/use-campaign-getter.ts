import { useQuery, gql } from '@apollo/client';
import { ICampaignDetailModel } from '@job-trail/types';

const GET_CAMPAIGN = (id: string) => gql`
  query GetCampaign {
    campaign(id: "${id}") {
      id
      name
      dateStart
      dateEnd
      applications {
        id
        roleName
        status
        link
        dateCreated
        dateUpdated
        company {
          name
        }
      }
    }
  }
`;

export const useCampaignGetter = (id: string) => {
  return useQuery<{ campaign: ICampaignDetailModel }>(GET_CAMPAIGN(id));
};
