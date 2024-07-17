// src/pages/PaymentMethod.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/PaymentMethod.css"; // Importar el archivo CSS
import visaLogo from "../assets/visa.png"; // Importar imagen de Visa
import mastercardLogo from "../assets/mastercard.png"; // Importar imagen de Mastercard

const PaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardType, setCardType] = useState(null);
  const navigate = useNavigate();

  const handleCardNumberChange = (e) => {
    const number = e.target.value;
    if (/^\d*$/.test(number)) {
      setCardNumber(number);

      // Detectar tipo de tarjeta
      const visaRegex = /^4[0-9]{0,15}$/;
      const mastercardRegex = /^5[1-5][0-9]{0,14}$/;

      if (visaRegex.test(number)) {
        setCardType("visa");
      } else if (mastercardRegex.test(number)) {
        setCardType("mastercard");
      } else {
        setCardType(null);
      }
    }
  };

  const handleCvvChange = (e) => {
    const cvv = e.target.value;
    if (/^\d{0,3}$/.test(cvv)) {
      setCvv(cvv);
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de pago
    console.log("Procesando pago...");
    navigate("/success");  // Redirigir a la página de éxito
  };

  return (
    <div className="background">
    <div className="payment-method-container">
      <h2>Método de Pago</h2>
      <form onSubmit={handlePayment}>
        <div className="input-container">
          <label>Número de Tarjeta</label>
          <div className="card-input-wrapper">
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
              />
            {cardType && (
              <img
              src={cardType === "visa" ? visaLogo : mastercardLogo}
              alt={cardType}
              className="card-logo"
              />
            )}
          </div>
        </div>
        <div className="input-container">
          <label>Fecha de Expiración</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            />
        </div>
        <div className="input-container">
          <label>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            required
            />
        </div>
        <div className="input-container">
          <label>Nombre del Titular</label>
          <input
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            required
            />
        </div>
        <button type="submit">Procesar Pago</button>
      </form>
    </div>
  </div>
  );
};

export default PaymentMethod;




