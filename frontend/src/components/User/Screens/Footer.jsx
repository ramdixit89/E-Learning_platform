import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Footer.css"; // Import custom styles

const Footer = () => {
  return (
    <footer className="footer position-relative">
      {/* Background Waves */}
      <div className="wave-container">
        <svg className="wave" viewBox="0 0 1440 320">
          <path
            fill="rgba(0, 123, 255, 0.4)"
            fillOpacity="1"
            d="M0,320L60,298.7C120,277,240,235,360,208C480,181,600,171,720,181.3C840,192,960,224,1080,224C1200,224,1320,192,1380,176L1440,160V320Z"
          ></path>
        </svg>
      </div>

      {/* Floating Bubbles */}
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      {/* Footer Content */}
      <div className="container text-center text-white py-4">
        <h3 className="glow-text">RDCoders</h3>
        <p>Upskill yourself with expert-led courses & industry certifications.</p>
        <p>&copy; {new Date().getFullYear()} RDCoders. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;