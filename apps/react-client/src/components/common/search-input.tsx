import { FC, ChangeEvent, useEffect } from 'react';

interface SearchInputProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  searchTerm: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  handleSearch,
  searchTerm,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        e.preventDefault();
        const input = document.querySelector('input');
        input?.focus();
      }
    };
    document.body.addEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <input
      className="border-gray-600 border-2 rounded-md p-2"
      placeholder="Search..."
      id="search-input"
      onChange={handleSearch}
      value={searchTerm}
    />
  );
};
