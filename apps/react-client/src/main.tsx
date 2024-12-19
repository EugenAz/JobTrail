import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { Campaigns } from './pages/campaigns';
import { Campaign } from './pages/campaign';
import { EditApplication } from './pages/edit-application';
import { AddApplication } from './pages/add-application';
import { Layout } from './components/layout';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

// TODO add error boundaries

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout page={<Campaigns />} />} />
          <Route
            path="/campaign/:campaignId"
            element={<Layout page={<Campaign />} />}
          />
          <Route
            path="/application/:applicationId"
            element={<Layout page={<EditApplication />} />}
          />
          <Route
            path="/campaign/:campaignId/new-application"
            element={<Layout page={<AddApplication />} />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
