import React from 'react';

const Search = ({ setSearchTerm, setSortBy }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default Search;
