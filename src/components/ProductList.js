import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
import ProductItem from './ProductItem';
import axios from 'axios'; // Using axios for API requests
import Footer from './Footer'; // Import Footer component
import './ProductList.css'; // Import the CSS file for styling

const ProductList = ({ addToCart, searchTerm, sortBy, currency }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  // Fetch products from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://fakestoreapi.com/products'); // Replace with actual API URL
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle currency conversion
  const convertCurrency = (price) => {
    return currency === 'INR' ? (price * 75).toFixed(2) : price.toFixed(2);
  };

  // Apply search and sorting
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  // Get current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="product-list-page">
      <h2>Our Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                addToCart={addToCart}
                currency={currency}
                convertCurrency={convertCurrency}
              />
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={sortedProducts.length}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      )}
      <Footer /> {/* Add Footer component */}
    </div>
  );
};

export default ProductList;
