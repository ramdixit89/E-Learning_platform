import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="container page text-center">
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.5 }}
      >
        <h2 className="fw-bold mb-5 display-5">
          Get In <span className="text-gradient">Touch</span>
        </h2>
      </motion.div>

      <div className="row justify-content-center g-4">
        {[
          {
            icon: <FaMapMarkerAlt className="text-danger fs-2" />,
            title: "Visit Us",
            text: "Indore, India",
          },
          {
            icon: <FaEnvelope className="text-primary fs-2" />,
            title: "Email Us",
            text: "contact@rdcoders.com",
          },
          {
            icon: <FaPhone className="text-success fs-2" />,
            title: "Call Us",
            text: "+91 98765 43210",
          },
        ].map((contact, index) => (
          <motion.div 
            className="col-md-4" 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="card-premium h-100 p-4 d-flex flex-column align-items-center">
              <div className="mb-3 p-3 rounded-circle bg-dark border border-secondary">
                 {contact.icon}
              </div>
              <h5 className="fw-bold text-muted mb-1">{contact.title}</h5>
              <h4 className="fw-bold text-light">{contact.text}</h4>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Contact Form Placeholder */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
           <div className="card-premium p-5 text-start">
              <h4 className="fw-bold text-light mb-4 text-center">Send us a message</h4>
              <form>
                 <div className="row g-3">
                    <div className="col-md-6">
                       <label className="text-muted small">Name</label>
                       <input type="text" className="form-control bg-dark border-secondary text-light" placeholder="John Doe" style={{ background: 'var(--background)' }} />
                    </div>
                    <div className="col-md-6">
                       <label className="text-muted small">Email</label>
                       <input type="email" className="form-control bg-dark border-secondary text-light" placeholder="john@example.com" style={{ background: 'var(--background)' }} />
                    </div>
                    <div className="col-12">
                       <label className="text-muted small">Message</label>
                       <textarea className="form-control bg-dark border-secondary text-light" rows="4" placeholder="How can we help you?" style={{ background: 'var(--background)' }}></textarea>
                    </div>
                    <div className="col-12 text-center mt-3">
                       <button className="btn btn-premium px-5">Send Message</button>
                    </div>
                 </div>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
