import { FC, ReactNode } from 'react';
import { noop } from '../../../utils/noop';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick?: () => void;
}
export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick = noop,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-block rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {children}
    </button>
  );
};
