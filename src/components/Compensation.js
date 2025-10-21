import React from 'react';
import './Compensation.css';

const Compensation = () => {
  return (
    <section className="compensation section-padding">
      <div className="container">
        <div className="compensation-content">
          <div className="content-left">
            <div className="decorative-flower blue-flower">
              🌹
            </div>
            <div className="decorative-leaf">
              🍃
            </div>
          </div>

          <div className="content-center">
            <div className="section-title">
              <h2>Compensación Transparente de Carbono</h2>
            </div>

            <div className="description">
              <p>
                Compensa tu Viaje es la solución definitiva para quienes desean 
                llevar un estilo de vida más sostenible. Con nuestra plataforma, 
                puedes calcular fácilmente tu huella de carbono personal y 
                explorar maneras efectivas de compensarla. Te ofrecemos 
                herramientas interactivas y recursos educativos para que cada 
                paso que tomes sea un paso hacia un futuro más verde.
              </p>
            </div>
          </div>

          <div className="content-right">
            <div className="decorative-flower orange-flower">
              🌺
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Compensation;