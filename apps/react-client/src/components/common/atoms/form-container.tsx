import { FC, ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
}

export const FormContainer: FC<FormContainerProps> = ({ children }) => {
  return (
    <div className="mt-10 flex flex-col gap-4 items-start mb-4">{children}</div>
  );
};
