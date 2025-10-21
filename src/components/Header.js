import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img 
                src="/images/brand/logocompensatuviaje.png" 
                alt="Compensa tu Viaje"
                className="logo-image"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li><a href="#inicio" className="nav-link">Inicio</a></li>
              <li><a href="#calculadora" className="nav-link">Calculadora</a></li>
              <li><a href="#blog" className="nav-link">Blog</a></li>
              <li><a href="#transparencia" className="nav-link">Transparencia</a></li>
              <li><a href="#contacto" className="nav-link">Contacto</a></li>
              {isAuthenticated && (
                <li>
                  <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="header-actions">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-greeting">Hola, {user?.firstName}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-logout">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary btn-login">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-primary cta-button">
                  Registrarse
                </Link>
              </>
            )}
          </div>

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