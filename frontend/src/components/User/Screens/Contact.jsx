import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="page section-gap">
      <div className="container-tight">
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
             <div className="hero-badge mx-auto">
              <span className="dot"></span>
              Support
            </div>
            <h1 className="hero-title mb-3">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="hero-sub mx-auto">
              Have questions about our courses or need technical support? 
              Our team is here to help you on your learning journey.
            </p>
          </motion.div>
        </div>

        <div className="row g-4 mb-5">
          {[
            {
              icon: <FaMapMarkerAlt />,
              title: "Visit Us",
              text: "Indore, India",
              colorWrapper: "indigo"
            },
            {
              icon: <FaEnvelope />,
              title: "Email Us",
              text: "contact@rdcoders.com",
              colorWrapper: "cyan"
            },
            {
              icon: <FaPhone />,
              title: "Call Us",
              text: "+91 98765 43210",
              colorWrapper: "green"
            },
          ].map((contact, index) => (
            <div className="col-md-4" key={index}>
              <motion.div 
                className="card-glass h-100 p-4 text-center d-flex flex-column align-items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className={`feature-icon ${contact.colorWrapper} mb-3`} style={{ width: 60, height: 60, fontSize: "1.5rem" }}>
                   {contact.icon}
                </div>
                <h5 className="font-display fw-bold mb-1" style={{ fontSize: "1.1rem" }}>{contact.title}</h5>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>{contact.text}</p>
              </motion.div>
            </div>
          ))}
        </div>
        
        {/* Contact Form Placeholder */}
        <motion.div 
          className="row justify-content-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="col-md-10">
             <div className="card-glow p-4 p-md-5">
                <h3 className="font-display fw-bold mb-4 text-center">Send us a message</h3>
                <form>
                   <div className="row g-4">
                      <div className="col-md-6">
                         <label className="form-label-custom">First Name</label>
                         <input type="text" className="input-field" placeholder="John" />
                      </div>
                      <div className="col-md-6">
                         <label className="form-label-custom">Last Name</label>
                         <input type="text" className="input-field" placeholder="Doe" />
                      </div>
                      <div className="col-12">
                         <label className="form-label-custom">Email Address</label>
                         <input type="email" className="input-field" placeholder="john@example.com" />
                      </div>
                      <div className="col-12">
                         <label className="form-label-custom">Message</label>
                         <textarea className="input-field" rows="5" placeholder="How can we help you?"></textarea>
                      </div>
                      <div className="col-12 text-center mt-4">
                         <button type="button" className="btn-primary-custom px-5 py-3">
                           <FaPaperPlane /> Send Message
                         </button>
                      </div>
                   </div>
                </form>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
