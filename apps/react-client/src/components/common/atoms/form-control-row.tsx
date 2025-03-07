import { FC, ReactNode } from 'react';

interface FormControlRowProps {
  label: string;
  htmlFor: string;
  control: (config: { controlClassName: string }) => ReactNode;
}

export const FormControlRow: FC<FormControlRowProps> = ({
  label,
  control,
  htmlFor,
}) => {
  return (
    <div className="w-1/4">
      <label htmlFor={htmlFor} className="block text-lg font-medium">
        {label}
      </label>
      <div className="mt-2">
        {control({
          controlClassName:
            'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6',
        })}
      </div>
    </div>
  );
};
