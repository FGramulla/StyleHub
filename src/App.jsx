import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import LoginRegister from './pages/LoginRegister';
import { CartProvider } from './context/CartContext';
// App.js o index.js (o cualquier archivo de punto de entrada)
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term); // Actualiza el término de búsqueda
  };

  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Header onSearch={handleSearch} products={products} />
          <Routes>
            <Route path="/" element={<ProductList searchTerm={searchTerm} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/LoginRegister" element={<LoginRegister />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;



















