import { useMutation, gql } from '@apollo/client';
import { ICampaignSummaryModel } from '@job-trail/types';

const UPDATE_CAMPAIGN = gql`
  mutation UpdateCampaign($updatedCampaignData: UpdatedCampaignInput!) {
    updateCampaign(updatedCampaignData: $updatedCampaignData) {
      id
      name
      dateStart
      dateEnd
    }
  }
`;

export const useCampaignUpdater = () => {
  return useMutation<{ updateCampaign: ICampaignSummaryModel }>(
    UPDATE_CAMPAIGN
  );
};
