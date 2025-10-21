import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(1);

  const faqs = [
    {
      id: 1,
      question: "¿Cómo puedo calcular mi huella de carbono?",
      answer: "Nuestra calculadora te permite ingresar datos sobre tu tipo de transporte, distancia recorrida y número de pasajeros para obtener un cálculo preciso de tu huella de carbono en kg de CO₂."
    },
    {
      id: 2,
      question: "¿Qué es la compensación de carbono?",
      answer: "La compensación de carbono es un mecanismo que permite equilibrar las emisiones de gases de efecto invernadero mediante la inversión en proyectos que reducen o eliminan esas emisiones. A través de iniciativas como la reforestación y energías renovables, puedes contribuir a un planeta más sostenible."
    },
    {
      id: 3,
      question: "¿Por qué es importante compensar?",
      answer: "Compensar tu huella de carbono es esencial para mitigar el cambio climático. Al reducir tu impacto y apoyar proyectos ecológicos, ayudas a preservar la biodiversidad y a mejorar la calidad del aire y agua, beneficiando a las futuras generaciones."
    },
    {
      id: 4,
      question: "¿Qué tipos de proyectos apoyan?",
      answer: "Apoyamos proyectos de energías renovables, reforestación, conservación de la biodiversidad y más. Cada proyecto está verificado y certificado, asegurando que tu contribución tenga un impacto real y positivo en el medio ambiente."
    },
    {
      id: 5,
      question: "¿Es segura la información que proporciono?",
      answer: "Sí, tu información es completamente confidencial y se utiliza únicamente para calcular tu huella de carbono. Implementamos medidas de seguridad robustas para proteger tus datos y garantizar tu privacidad."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="faq section-padding">
      <div className="container">
        <div className="section-header text-center fade-in-up">
          <h2>Preguntas Frecuentes</h2>
          <p>Respuestas a tus dudas</p>
        </div>

        <div className="faq-list fade-in-up">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${openFAQ === faq.id ? 'open' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openFAQ === faq.id}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {openFAQ === faq.id ? '−' : '+'}
                </span>
              </button>
              
              <div className="faq-answer">
                <div className="faq-answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;