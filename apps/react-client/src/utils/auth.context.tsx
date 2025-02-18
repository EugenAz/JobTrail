import { createContext, ReactNode, useContext, useState } from 'react';

type Token = string | null;

interface AuthContextType {
  authToken: Token;
  setAuthToken: (token: Token) => void;
  clearAuthToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<Token>(null);

  const clearAuthToken = () => setAuthToken(null);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, clearAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
