import cx from 'classnames';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router';

interface TileLinkProps {
  children: ReactNode;
  className?: string;
  to: string;
}

export const TileLink: FC<TileLinkProps> = ({
  to,
  children,
  className = '',
}) => {
  return (
    <Link
      to={to}
      className={cx(
        'p-8 border border-gray-200 rounded-lg shadow-md hover:shadow-sm block h-full content-center',
        className
      )}
    >
      {children}
    </Link>
  );
};
