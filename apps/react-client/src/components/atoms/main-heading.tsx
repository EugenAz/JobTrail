import { FC, ReactNode } from 'react';

interface MainHeadingProps {
  children: ReactNode;
}

export const MainHeading: FC<MainHeadingProps> = ({ children }) => {
  return <h1 className="text-3xl mb-8">{children}</h1>;
};
