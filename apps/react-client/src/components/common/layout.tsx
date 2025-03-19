import { FC, ReactNode } from 'react';

interface LayoutProps {
  page: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ page }) => {
  return (
    <div className="container mx-auto p-12 shadow-lg min-h-full bg-gray-50 h-screen">
      {page}
    </div>
  );
};
