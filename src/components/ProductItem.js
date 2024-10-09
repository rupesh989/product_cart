import React from 'react';
import './ProductItem.css'; // Importing the CSS file

const ProductItem = ({ product, addToCart, currency, convertCurrency }) => {
  return (
    <li className="product-item">
      <div className="image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <span className="product-title">{product.title}</span>
      <span className="product-price">
        Price: {currency} {convertCurrency(product.price)}
      </span>
      <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
    </li>
  );
};

export default ProductItem;
