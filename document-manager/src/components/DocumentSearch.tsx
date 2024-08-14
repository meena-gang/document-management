import React, { useState } from 'react';

interface DocumentSearchProps {
  onSearchQueryChange: (query: string) => void;
}

const DocumentSearch: React.FC<DocumentSearchProps> = ({ onSearchQueryChange }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchQueryChange(query);
  };

  return (
    <form onSubmit={handleSearch} className='searchForm'>
      <input
        type="text"
        placeholder="Search by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default DocumentSearch;
