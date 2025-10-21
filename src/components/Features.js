import React, { useState, useEffect } from 'react';
import './Features.css';
import CarbonCalculatorModal from './CarbonCalculatorModal';

const Features = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/images/mountain-landscape.jpg';
  }, []);

  const paymentMethods = [
    { name: 'Visa', logo: '/images/payment-logos/visa.png' },
    { name: 'Google Pay', logo: '/images/payment-logos/google-pay.png' },
    { name: 'Apple Pay', logo: '/images/payment-logos/apple-pay.png' },
    { name: 'PayPal', logo: '/images/payment-logos/paypal-logo.png' },
    { name: 'Stripe', logo: '/images/payment-logos/stripe.png' }
  ];

  const openCalculator = () => {
    setIsModalOpen(true);
  };

  const closeCalculator = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="features section-padding" id="calculadora">
      <div className="container">
        {/* Título principal */}
        <div className="features-header text-center fade-in-up">
          <h2>Compensa tu Viaje: La Sostenibilidad es Posible</h2>
        </div>

        {/* Métodos de pago */}
        <div className="payment-methods fade-in-up">
          <div className="payment-grid">
            {paymentMethods.map((method, index) => (
              <div key={index} className="payment-method">
                <div className="payment-logo">
                  <img 
                    src={method.logo} 
                    alt={method.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>
                <span className="payment-name">{method.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido principal con calculadora */}
        <div className="features-content" id="calculadora-content">
          <div className="content-left fade-in-up">
            <div className="calculator-badge">
              Compensa tu huella de carbono hoy
            </div>
            
            <h3>La forma más transparente de compensar tu impacto en el planeta</h3>
            
            <p>
              Descubre cómo cada uno de tus viajes y hábitos diarios 
              afectan al medio ambiente. Con nuestra calculadora 
              personalizada, puedes calcular y compensar tu huella de 
              carbono de manera sencilla y efectiva.
            </p>

            {/* Botón para abrir calculadora */}
            <div className="calculator-button-section">
              <button 
                className="btn btn-primary calculator-open-btn"
                onClick={openCalculator}
              >
                🧮 Abrir Calculadora de Carbono
              </button>
              <p className="calculator-description">
                Calcula tu huella de carbono en segundos y descubre cómo compensar tu impacto ambiental
              </p>
            </div>
          </div>

          <div className="content-right fade-in-up">
            <div className="nature-image">
              <div 
                className="image-placeholder"
                data-loaded={imageLoaded}
                style={{
                  backgroundImage: imageLoaded ? 'url(/images/mountain-landscape.jpg)' : 'none',
                  opacity: imageLoaded ? 1 : 0.8
                }}
              >
                <div className="image-overlay">
                  <span>Paisajes naturales que ayudamos a preservar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Calculadora */}
      <CarbonCalculatorModal 
        isOpen={isModalOpen} 
        onClose={closeCalculator} 
      />
    </section>
  );
};

export default Features;