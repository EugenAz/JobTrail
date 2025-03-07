import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router';

interface LinkProps {
  to: string;
  children: ReactNode;
}

export const ButtonLink: FC<LinkProps> = ({ to, children }) => {
  return (
    <RouterLink
      to={to}
      className="border border-1 border-gray-300 rounded-md py-2 px-4"
    >
      {children}
    </RouterLink>
  );
};
