import { createRoot } from 'react-dom/client';

import { App } from './app';
import { AuthProvider } from './utils/auth.context';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
