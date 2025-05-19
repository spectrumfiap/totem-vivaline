'use client';

import { useState } from 'react';

const SearchBar = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Buscando por:', search);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="flex items-center bg-white rounded-full px-3 py-1 shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar..."
        className="flex-1 text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none"
      />
      <button 
        type="submit" 
        className="text-gray-600 hover:text-black text-lg"
      >
        🔍
      </button>
    </form>
  );
};

export default SearchBar;
