// WhatsAppButton.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../style/WhatsAppButton.css';

const WhatsAppButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1000); // Duración de la animación
  };

  return (
    <div className={`whatsapp-button ${clicked ? 'animate' : ''}`} onClick={handleClick}>
      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faWhatsapp} size='2x'/>
      </a>
    </div>
  );
};

export default WhatsAppButton;
