import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import LoginRegister from './pages/LoginRegister';
import PaymentMethod from './pages/PaymentMethod.jsx';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckoutForm from './components/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-publishable-key-here'); // Reemplaza con tu clave pública de Stripe

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
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route
              path="/checkout"
              element={
                <Elements stripe={stripePromise}>
                  <CheckoutForm />
                </Elements>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
























