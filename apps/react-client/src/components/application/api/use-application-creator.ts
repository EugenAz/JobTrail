import { useMutation, gql } from '@apollo/client';

const CREATE_APPLICATION = gql`
  mutation CreateApplication($newApplicationInput: NewApplicationInput!) {
    createApplication(newApplicationInput: $newApplicationInput) {
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
`;

export const useApplicationCreator = (campaignId: string) => {
  return useMutation(CREATE_APPLICATION, {
    update(cache, { data }) {
      if (!data) return;

      const newApplication = data.createApplication;

      cache.modify({
        id: cache.identify({
          id: campaignId,
          __typename: 'CampaignDetailModel',
        }),
        fields: {
          applications(existingApplications = []) {
            return [...existingApplications, newApplication];
          },
        },
      });
    },
  });
};
