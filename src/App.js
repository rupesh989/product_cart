import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [currency, setCurrency] = useState('USD'); // Currency state
  const [exchangeRate, setExchangeRate] = useState(1); // For currency conversion

  // Fetch exchange rate based on selected currency
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === 'INR') {
        try {
          const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD'); // Example API
          const data = await response.json();
          setExchangeRate(data.rates.INR); // Set exchange rate for INR
        } catch (error) {
          console.error('Error fetching exchange rate:', error);
        }
      } else {
        setExchangeRate(1); // Default to USD
      }
    };

    fetchExchangeRate();
  }, [currency]);

  // Add product to cart, or increase quantity if it already exists
  const addToCart = (product, quantity = 1) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Update product quantity in the cart or remove if quantity is zero
  const updateCart = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  return (
    <Router>
      <div>
        <Header
          cartCount={cart.length}
          setSearchTerm={setSearchTerm}
          setSortBy={setSortBy}
          currency={currency}
          setCurrency={setCurrency} // Pass currency setter
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                addToCart={addToCart}
                searchTerm={searchTerm}
                sortBy={sortBy}
                currency={currency} // Pass currency to ProductList
                exchangeRate={exchangeRate} // Pass exchange rate to ProductList
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateCart={updateCart}
                currency={currency} // Pass currency to Cart
                exchangeRate={exchangeRate} // Pass exchange rate for conversion
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
