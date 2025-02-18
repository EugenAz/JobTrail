import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from './env';

const httpLink = createHttpLink({
  uri: API_URL,
});

export const createApolloClient = (getToken: () => string | null) => {
  const authLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
