import React, { useState } from 'react';
import '../style/Header.css';
import { FaUser, FaShoppingCart, FaSearch, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ onSearch }) => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log('Search term:', value); // Log para verificar el término de búsqueda
    if (typeof onSearch === 'function') {
      onSearch(value); // Pasar el término de búsqueda a través de la función onSearch
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    console.log('Search visible:', !searchVisible); // Log para verificar el estado de búsqueda visible
  };

  const handleCloseSearch = () => {
    setSearchVisible(false);
    console.log('Search closed'); // Log para verificar el cierre de la búsqueda
  };

  return (
    <header className="header">
      <div className="header-center">
        <Link to="/" className="header-title">StyleHub</Link>
      </div>
      <div className="header-right">
        <Link to="/LoginRegister" className="header-button">
          <FaUser className="icon" />
        </Link>
        <button className="header-button" onClick={handleCartClick}>
          <FaShoppingCart className="icon" />
        </button>
        <button className="header-button" onClick={toggleSearch}>
          <FaSearch className="icon" />
        </button>
      </div>
      <div className={`search-container ${searchVisible ? 'visible' : ''}`}>
        <a className="close-button" onClick={handleCloseSearch}>
          <FaTimes />
        </a>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setSearchVisible(true)}
        />
      </div>
    </header>
  );
};

export default Header;























































