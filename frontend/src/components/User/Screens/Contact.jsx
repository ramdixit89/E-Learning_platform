import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaUsers, FaAward } from "react-icons/fa";
const Contact = () => {
  return (
    <div className="container my-5 text-center">
      <h2 className="fw-bold mb-4">
        Get In <span className="text-success">Touch</span>
      </h2>
      <div className="row justify-content-center">
        {[
          {
            icon: <FaMapMarkerAlt className="text-danger fs-1" />,
            text: "Indore, India",
          },
          {
            icon: <FaEnvelope className="text-primary fs-1" />,
            text: "contact@rdcoders.com",
          },
          {
            icon: <FaPhone className="text-success fs-1" />,
            text: "+91 98765 43210",
          },
        ].map((contact, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-lg border-0 p-4 h-100 transition-hover">
              <div className="mb-3">{contact.icon}</div>
              <h5 className="fw-bold">{contact.text}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
