import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = '/images/rice-terraces.jpg';
  }, []);

  return (
    <footer className="footer">
      <div 
        className="footer-background"
        data-loaded={imageLoaded}
        style={{
          backgroundImage: imageLoaded ? 'url(/images/rice-terraces.jpg)' : 'none',
          opacity: imageLoaded ? 1 : 0.8
        }}
      ></div>
      <div className="footer-overlay"></div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <img 
                src="/images/brand/logocompensatuviaje.png" 
                alt="Compensa tu Viaje"
                className="footer-logo-image"
              />
            </div>
            
            <div className="footer-title">
              Compensa tu Viaje
            </div>
            
            <div className="footer-contact">
              <p>info@compensatuviaje.com</p>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-links">
              <div className="link-group">
                <h4>Servicios</h4>
                <ul>
                  <li><a href="#calculadora">Calculadora</a></li>
                  <li><a href="#compensacion">Compensación</a></li>
                  <li><a href="#proyectos">Proyectos</a></li>
                </ul>
              </div>

              <div className="link-group">
                <h4>Información</h4>
                <ul>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#transparencia">Transparencia</a></li>
                  <li><a href="#faq">FAQ</a></li>
                </ul>
              </div>

              <div className="link-group">
                <h4>Contacto</h4>
                <ul>
                  <li><a href="#contacto">Contactanos</a></li>
                  <li><a href="#soporte">Soporte</a></li>
                  <li><a href="#prensa">Prensa</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; 2025 Compensa tu Viaje. Todos los derechos reservados.</p>
            <div className="footer-social">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}>📘</a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" aria-label="Twitter" onClick={(e) => e.preventDefault()}>🐦</a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}>📷</a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>💼</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;