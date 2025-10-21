import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/testimonials');
      const data = await response.json();
      
      if (data.success) {
        setTestimonials(data.data);
      }
    } catch (error) {
      // Fallback testimonials
      setTestimonials([
        {
          id: 1,
          name: "Laura Sánchez",
          role: "Ecologista y viajera consciente",
          message: "Compensa tu Viaje me ayudó a entender mi huella de carbono, ¡ahora puedo compensar mi impacto en el mundo!",
          rating: 5
        },
        {
          id: 2,
          name: "Carlos Mendoza", 
          role: "Aventurero y defensor del medio ambiente",
          message: "La calculadora es muy intuitiva y me ofreció resultados detallados sobre mis hábitos. ¡Una herramienta imprescindible para cualquier viajero!",
          rating: 5
        },
        {
          id: 3,
          name: "Ana López",
          role: "Bloguera sobre sostenibilidad y viajes", 
          message: "Gracias a Compensa tu Viaje, he aprendido cómo mis decisiones afectan el planeta. ¡Definitivamente lo recomendaré a mis amigos!",
          rating: 5
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  if (loading) {
    return (
      <section className="testimonials section-padding">
        <div className="container">
          <div className="loading">Cargando testimonios...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials section-padding">
      <div className="container">
        {/* Featured testimonial */}
        <div className="featured-testimonial fade-in-up">
          <div className="stars">
            {renderStars(5)}
          </div>
          <blockquote className="featured-quote">
            "Compensa tu Viaje me ayudó a entender mi huella de 
            carbono, ¡ahora puedo compensar mi impacto en el mundo!"
          </blockquote>
          <div className="featured-author">
            <div className="author-avatar">
              👩‍🔬
            </div>
            <div className="author-info">
              <div className="author-name">Laura Sánchez</div>
              <div className="author-role">Ecologista y viajera consciente</div>
            </div>
          </div>
        </div>

        {/* Section title */}
        <div className="section-header text-center fade-in-up">
          <h2>Historias de Impacto Positivo</h2>
        </div>

        {/* Testimonials grid */}
        <div className="testimonials-grid fade-in-up">
          {testimonials.slice(1).map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p>"{testimonial.message}"</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.id === 2 ? '👨‍🌾' : '👩‍💼'}
                </div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-role">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;