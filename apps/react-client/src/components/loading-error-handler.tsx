import { ApolloError } from '@apollo/client';
import { FC, ReactNode } from 'react';

interface LoadingErrorHandlerProps {
  loading: boolean;
  error?: ApolloError | Error;
  children: ReactNode;
}

export const LoadingErrorHandler: FC<LoadingErrorHandlerProps> = ({
  loading,
  error,
  children,
}) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
