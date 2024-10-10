import React, { useEffect, useState } from 'react';
import './Cart.css';  

const Cart = ({ cart, updateCart, currency }) => {
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === 'INR') {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); 
        const data = await response.json();
        setExchangeRate(data.rates.INR);  
      } else {
        setExchangeRate(1); 
      }
    };

    fetchExchangeRate();
  }, [currency]);

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0) * exchangeRate;
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items-container">
          <ul className="cart-items">
            {cart.map((product) => (
              <li key={product.id} className="cart-item">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="item-details">
                  <span className="product-title">{product.title}</span>
                  <span className="product-price">Price: {currency === 'INR' ? `₹${(product.price * exchangeRate).toFixed(2)}` : `$${product.price.toFixed(2)}`}</span>
                  <div className="quantity-container">
                    <label htmlFor={`quantity-${product.id}`} className="quantity-label">Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      value={product.quantity}
                      min="0"
                      onChange={(e) => updateCart(product.id, parseInt(e.target.value, 10))}
                      className="quantity-input"
                    />
                  </div>
                  <span className="item-total">
                    Total: {currency === 'INR' ? `₹${(product.price * product.quantity * exchangeRate).toFixed(2)}` : `$${(product.price * product.quantity).toFixed(2)}`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Price: {currency === 'INR' ? `₹${getTotalPrice().toFixed(2)}` : `$${getTotalPrice().toFixed(2)}`}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
