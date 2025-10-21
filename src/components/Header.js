import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <img 
              src="/images/brand/logocompensatuviaje.png" 
              alt="Compensa tu Viaje"
              className="logo-image"
            />
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#inicio" className="nav-link">Inicio</a></li>
              <li><a href="#calculadora" className="nav-link">Calculadora</a></li>
              <li><a href="#blog" className="nav-link">Blog</a></li>
              <li><a href="#transparencia" className="nav-link">Transparencia</a></li>
              <li><a href="#contacto" className="nav-link">Contacto</a></li>
            </ul>
          </nav>

          {/* CTA Button */}
          <a href="#calcular" className="btn btn-primary cta-button">
            Calcula tu Huella Ahora
          </a>

          {/* Mobile menu toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;