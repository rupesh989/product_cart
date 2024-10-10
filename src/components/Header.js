import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 
import { FaShoppingCart, FaSearch, FaSort } from 'react-icons/fa';

const Header = ({ cartCount, setSearchTerm, setSortBy, currency, setCurrency }) => {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            alt="Logo"
            className="logo-icon"
          /> 
          Product Cart
        </Link>
      </h1>

      <div className="controls">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="sort-dropdown">
          <FaSort className="icon" />
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        <div className="currency-dropdown">
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>

        <Link to="/cart" className="cart-button">
          <button className="cart-btn">
            <FaShoppingCart className="icon" /> Cart ({cartCount})
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
