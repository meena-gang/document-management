// src/components/FilterComponent.tsx

import React, { useState } from 'react';

const FilterComponent: React.FC<{ onChange: (filter: 'public' | 'private' | 'all') => void }> = ({ onChange }) => {
  const [filter, setFilter] = useState<'public' | 'private' | 'all'>('public');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as 'public' | 'private' | 'all';
    setFilter(value);
    onChange(value);
  };

  return (
    <div className='filter'>
    <select value={filter} onChange={handleChange}>
      <option value="public">Public</option>
      <option value="private">Private</option>
      {/* <option value="all">All</option> */}
    </select>
    </div>
  );
};

export default FilterComponent;
