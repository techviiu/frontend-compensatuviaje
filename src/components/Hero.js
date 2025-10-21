import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/images/hero-background.jpg';
  }, []);

  const scrollToCalculator = () => {
    const element = document.getElementById('calculadora');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="inicio">
      <div 
        className="hero-background" 
        data-loaded={imageLoaded}
        style={{
          backgroundImage: imageLoaded ? 'url(/images/hero-background.jpg)' : 'none',
          opacity: imageLoaded ? 1 : 0.8
        }}
      >
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title fade-in-up">
            Compensa tu Viaje
          </h1>
          
          <div className="hero-subtitle fade-in-up">
            <p>La forma más transparente</p>
            <p>de compensar tu impacto</p>
            <p>en el planeta</p>
          </div>
          
          <div className="hero-actions fade-in-up">
            <button onClick={scrollToCalculator} className="btn btn-primary hero-cta">
              ¡Calcula tu huella ahora!
            </button>
            <button className="btn btn-secondary hero-secondary">
              ▶ Mira cómo funciona
            </button>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;