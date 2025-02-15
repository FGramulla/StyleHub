import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../style/Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const [removingIndex, setRemovingIndex] = useState(null);
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId, index) => {
    setRemovingIndex(index);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingIndex(null);
    }, 300);
  };

  const goToPayment = () => {
    navigate("/payment-method");
  };

  return (
    <div className="background-cart">
      <div className="cart">
        <h2>Carrito de Compras</h2>
        {cartItems.length > 0 ? (
          <>
            <ul className="cart-items">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className={`cart-item ${
                    removingIndex === index ? "removing" : ""
                  }`}
                >
                  <div className="cart-item-info">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h3 className="item-title">{item.title}</h3>
                      <p className="item-description">{item.description}</p>
                      <p className="item-price">Precio: ${item.price}</p>
                      <p className="item-quantity">Cantidad: {item.quantity}</p>
                      <p className="item-total-price">
                        Precio Total: ${item.price * item.quantity}
                      </p>
                    </div>
                    <button onClick={() => handleRemoveFromCart(item.id, index)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button className="buy-button" onClick={goToPayment}>
              Pagar
            </button>
          </>
        ) : (
          <p className="sin-productos">No hay productos en el carrito.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;





