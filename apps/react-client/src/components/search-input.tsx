import { FC, ChangeEvent } from 'react';

interface SearchInputProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  handleSearch,
  searchTerm,
}) => {
  return (
    <input
      className="border-gray-600 border-2 rounded-md p-2"
      placeholder="Search..."
      onChange={handleSearch}
      value={searchTerm}
    />
  );
};
