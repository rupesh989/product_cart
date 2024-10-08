import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartCount, setSearchTerm, setSortBy, currency, setCurrency }) => {
  return (
    <header>
      <h1><Link to="/">Product Catalog</Link></h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearchTerm(e.target.value)}  // Update search term
        />
        <select onChange={(e) => setSortBy(e.target.value)}>  
          <option value="default">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Alphabetical</option>
        </select>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
        <Link to="/cart">
          <button  className="cart-button">
            Cart ({cartCount})
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
