import { FC, ReactNode } from 'react';

interface MainHeadingProps {
  children: ReactNode;
}

export const MainHeading: FC<MainHeadingProps> = ({ children }) => {
  return (
    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
      {children}
    </h1>
  );
};
