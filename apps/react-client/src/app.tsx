import { StrictMode, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ApolloProvider } from '@apollo/client';
import { Bounce, ToastContainer } from 'react-toastify';

import { useAuth } from './utils/auth.context';

import { Layout } from './components/layout';
import { Campaigns } from './pages/campaigns';
import { Campaign } from './pages/campaign';
import { EditApplication } from './pages/edit-application';
import { AddApplication } from './pages/add-application';
import { AddCampaign } from './pages/add-campaign';
import { EditCampaign } from './pages/edit-campaign';
import { CampaignAnalytics } from './pages/campaign-analytics';
import { Login } from './pages/login';
import { Page404 } from './pages/404';
import { createApolloClient } from './utils/create-apollo-client';
import { GuardedRoute } from './components/guarded-route';
import { RouteTracker } from './components/router-tracker';

// TODO add error boundaries
export const App = () => {
  const { authToken } = useAuth();
  const apolloClient = useMemo(
    () => createApolloClient(() => authToken),
    [authToken]
  );

  return (
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <RouteTracker />
          <Routes>
            <Route path="/" element={<GuardedRoute />}>
              <Route path="/" element={<Layout page={<Campaigns />} />} />
              <Route
                path="/new-campaign"
                element={<Layout page={<AddCampaign />} />}
              />
              <Route
                path="/campaign/:campaignId/edit"
                element={<Layout page={<EditCampaign />} />}
              />
              <Route
                path="/campaign/:campaignId"
                element={<Layout page={<Campaign />} />}
              />
              <Route
                path="/campaign/:campaignId/analytics"
                element={<Layout page={<CampaignAnalytics />} />}
              />
              <Route
                path="/application/:applicationId"
                element={<Layout page={<EditApplication />} />}
              />
              <Route
                path="/campaign/:campaignId/new-application"
                element={<Layout page={<AddApplication />} />}
              />
            </Route>

            <Route path="/404" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/login" element={<Layout page={<Login />} />}></Route>
          </Routes>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
        </BrowserRouter>
      </ApolloProvider>
    </StrictMode>
  );
};
