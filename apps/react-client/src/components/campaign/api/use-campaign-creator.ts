import { useMutation, gql } from '@apollo/client';
import { ICampaignDetailModel } from '@job-trail/types';

const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($newCampaignInput: NewCampaignInput!) {
    createCampaign(newCampaignInput: $newCampaignInput) {
      id
    }
  }
`;

export const useCampaignCreator = () => {
  return useMutation<{ createCampaign: Pick<ICampaignDetailModel, 'id'> }>(
    CREATE_CAMPAIGN
  );
};
