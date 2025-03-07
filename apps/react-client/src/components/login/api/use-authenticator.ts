import { useMutation, gql } from '@apollo/client';

const LOGIN = gql`
  mutation login($loginInput: AuthUserInput!) {
    login(loginInput: $loginInput) {
      access_token
    }
  }
`;

export const useAuthenticator = () => {
  return useMutation(LOGIN);
};
