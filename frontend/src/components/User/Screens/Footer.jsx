import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--glass-border)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <div className="container">
        <div className="row g-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <h3 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span className="text-gradient">RDCoders</span>
            </h3>
            <p className="text-muted mb-4">
              Empowering learners worldwide with cutting-edge tech skills. Join our community and start building your future today.
            </p>
            <div className="d-flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-muted hover-accent fs-5 transition-all">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="text-light fw-bold mb-3">Explore</h5>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {['Home', 'Courses', 'About Us', 'Success Stories', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-muted text-decoration-none hover-text-primary px-0">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light fw-bold mb-3">Contact</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              <li className="d-flex align-items-start gap-2 text-muted">
                <FaMapMarkerAlt className="mt-1 text-primary" />
                <span>Indore(M.P)</span>
              </li>
              <li className="d-flex align-items-center gap-2 text-muted">
                <FaPhone className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="d-flex align-items-center gap-2 text-muted">
                <FaEnvelope className="text-primary" />
                <span>support@rdcoders.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-light fw-bold mb-3">Newsletter</h5>
            <p className="text-muted small">Subscribe for latest updates and offers.</p>
            <form className="mt-3">
               <div className="mb-3">
                 <input 
                   type="email" 
                   className="form-control bg-dark border-secondary text-light" 
                   placeholder="Your email address"
                   style={{ background: 'var(--background)', borderColor: 'var(--glass-border)' }}
                 />
               </div>
               <button className="btn btn-premium w-100 rounded-2 py-2 text-sm text-white">
                 Subscribe
               </button>
            </form>
          </div>
        </div>

        <div className="border-top border-secondary mt-5 pt-4 text-center text-muted small" style={{ borderColor: 'var(--glass-border)' }}>
          <p className="mb-0">&copy; {new Date().getFullYear()} RDCoders. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;