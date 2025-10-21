import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Components - Landing
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Compensation from './components/Compensation';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Components - Auth
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/auth/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';

// Components - Onboarding
import CompanyOnboardingWizard from './components/onboarding/CompanyOnboardingWizard';
import OnboardingStatus from './components/onboarding/OnboardingStatus';

// Landing Page Component
const LandingPage = () => (
  <>
    <Header />
    <Hero />
    <Features />
    <Compensation />
    <Testimonials />
    <FAQ />
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* Ruta pública - Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Rutas públicas - Auth (redirige a dashboard si ya está autenticado) */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <PublicRoute>
                  <ForgotPassword />
                </PublicRoute>
              } 
            />
            
            {/* Rutas privadas - Requieren autenticación */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            
            {/* Rutas privadas - Onboarding */}
            <Route 
              path="/onboarding/wizard" 
              element={
                <PrivateRoute>
                  <CompanyOnboardingWizard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/onboarding/status" 
              element={
                <PrivateRoute>
                  <OnboardingStatus />
                </PrivateRoute>
              } 
            />
            
            {/* Ruta 404 - Redirige a landing */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
