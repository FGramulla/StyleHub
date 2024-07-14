import React, { useState, useContext } from 'react';
import '../style/Card.css';
import { CartContext } from '../context/CartContext';

const Card = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada
  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar la visibilidad de la alerta

  const handleAddToCartClick = () => {
    addToCart(product, quantity); // Pasar quantity al agregar al carrito
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000); // Ocultar la alerta después de 3 segundos
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">{product.description}</p>
        <p className="card-price">Precio: ${product.price}</p>
        <div className="card-quantity">
          <label htmlFor={`quantity-${product.id}`}>Cantidad:</label>
          <div className="quantity-controls">
            <button onClick={decreaseQuantity} disabled={quantity === 1}>-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <button className="card-button" onClick={handleAddToCartClick}>
          Agregar al carrito
        </button>
      </div>

      {/* Alerta de Bootstrap */}
      {alertVisible && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {`¡"${product.title}" se agregó al carrito con éxito!`}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlertVisible(false)}></button>
        </div>
      )}
    </div>
  );
};

export default Card;













