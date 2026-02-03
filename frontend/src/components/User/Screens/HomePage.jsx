import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  FaBook,
  FaCertificate,
  FaChalkboardTeacher,
  FaUsers,
  FaRocket,
  FaLaptopCode,
  FaArrowRight,
  FaStar,
  FaPlayCircle
} from "react-icons/fa";
// Removed HomePage.css import to rely on global premium styles

const HomePage = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="homepage overflow-hidden" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* Hero Section */}
      <section className="position-relative container py-5">
        <div className="row align-items-center">
          <motion.div 
            className="col-lg-6 mb-5 mb-lg-0"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <div className="d-inline-block px-3 py-1 mb-3 rounded-pill" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)' }}>
              <span className="text-primary fw-bold text-uppercase fs-7" style={{ letterSpacing: '1px', fontSize: '12px' }}>
                 Future of Learning
              </span>
            </div>
            <h1 className="display-3 fw-bold mb-4 lh-sm">
              Master New Skills with <br/>
              <span className="text-gradient">RDCoders</span>
            </h1>
            <p className="lead text-muted mb-5" style={{ maxWidth: '90%' }}>
              Unlock your potential with our expert-led courses. build real-world projects, 
              earn certificates, and launch your career in tech.
            </p>
            <div className="d-flex gap-3 flex-wrap">
               <button onClick={() => navigate('/courses')} className="btn-premium">
                 Explore Courses <FaArrowRight />
               </button>
               <button className="btn-outline-premium d-flex align-items-center gap-2">
                 <FaPlayCircle /> View Demo
               </button>
            </div>
            
            <div className="mt-5 d-flex align-items-center gap-4">
              <div className="d-flex">
                 {[1,2,3,4].map(i => (
                   <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: '#334155', border: '2px solid var(--background)', marginLeft: i > 1 ? -15 : 0 }}></div>
                 ))}
                 <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', border: '2px solid var(--background)', marginLeft: -15, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>+2k</div>
              </div>
              <div>
                <p className="mb-0 fw-bold">2,000+ Students</p>
                <div className="d-flex text-warning text-small">
                  <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                  <span className="text-muted ms-2 text-sm">(4.9/5)</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-lg-6 position-relative text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="position-relative z-1 animate-float">
               {/* Abstract 3D-ish visual using CSS/SVG */}
               <div style={{ 
                 width: '100%', 
                 height: '400px', 
                 background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))', 
                 borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                 position: 'relative',
                 backdropFilter: 'blur(30px)'
               }}>
                 <img 
                   src="https://illustrations.popsy.co/amber/student-going-to-school.svg" 
                   alt="Learning" 
                   style={{ width: '80%', height: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))' }}
                   onError={(e) => { e.target.style.display='none'; }}
                 />
                 {/* Fallback visual if image fails or just as decor */}
                 <div className="position-absolute p-3 rounded-4 bg-glass border border-white border-opacity-10 shadow-lg animate-pulse-glow" style={{ top: '10%', right: '10%', width: '140px' }}>
                    <div className="text-start">
                      <div className="mb-2 d-flex align-items-center gap-2">
                        <div className="bg-success rounded-circle" style={{ width: 10, height: 10 }}></div>
                        <small className="text-muted">Course Completed</small>
                      </div>
                      <h6 className="fw-bold mb-0">React Mastery</h6>
                    </div>
                 </div>
                 
                 <div className="position-absolute p-3 rounded-4 bg-glass border border-white border-opacity-10 shadow-lg" style={{ bottom: '15%', left: '0%', width: '160px' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-warning rounded-circle p-2 text-white"><FaCertificate /></div>
                      <div className="text-start">
                        <small className="d-block text-muted">Certified</small>
                        <h6 className="fw-bold mb-0">Developer</h6>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
            {/* Background blurred orbs */}
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--primary)', filter: 'blur(100px)', opacity: 0.3, zIndex: 0 }}></div>
            <div style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, background: 'var(--secondary)', filter: 'blur(100px)', opacity: 0.3, zIndex: 0 }}></div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: 'var(--background)' }}>
        <div className="container py-5">
           <motion.div 
             className="text-center mb-5"
             initial="hidden"
             whileInView="visible"
             variants={fadeInUp}
             viewport={{ once: true }}
           >
             <h2 className="mb-3">Why Choose <span className="text-gradient">RDCoders</span>?</h2>
             <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
               We provide everything you need to go from beginner to pro.
             </p>
           </motion.div>

           <motion.div 
             className="row g-4"
             initial="hidden"
             whileInView="visible"
             variants={staggerContainer}
             viewport={{ once: true }}
           >
             {[
              { icon: <FaBook />, title: "Structured Learning", desc: "Curriculum designed by industry experts." },
              { icon: <FaCertificate />, title: "Earn Certificates", desc: "Official certification upon completion." },
              { icon: <FaUsers />, title: "Community Support", desc: "24/7 support from mentors and peers." },
              { icon: <FaRocket />, title: "Career Growth", desc: "Job assistance and portfolio building." }
             ].map((item, idx) => (
                <motion.div className="col-md-6 col-lg-3" key={idx} variants={fadeInUp}>
                  <div className="card-premium h-100 p-4">
                    <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-3" 
                         style={{ width: 60, height: 60, background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontSize: '24px' }}>
                      {item.icon}
                    </div>
                    <h5 className="fw-bold mb-3">{item.title}</h5>
                    <p className="text-muted mb-0">{item.desc}</p>
                  </div>
                </motion.div>
             ))}
           </motion.div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-5 position-relative">
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(180deg, var(--background) 0%, var(--surface) 100%)', zIndex: -1 }}></div>
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <h2 className="mb-2">Popular Courses</h2>
              <p className="text-muted mb-0">Explore our highest-rated content.</p>
            </div>
            <button onClick={() => navigate('/courses')} className="btn btn-link text-decoration-none text-white fw-bold d-none d-md-block">
              View All Courses <FaArrowRight className="ms-1" />
            </button>
          </div>

          <div className="row g-4">
            {["Full Stack Development", "Data Science & AI", "UI/UX Design Masterclass"].map((course, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="card-premium h-100 p-0 overflow-hidden group">
                  <div className="position-relative" style={{ height: '200px', background: 'var(--surface-light)' }}>
                    {/* Placeholder for Course Image */}
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                        <FaLaptopCode size={50} opacity={0.5}/>
                    </div>
                    <div className="position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill bg-dark bg-opacity-75 text-white shadow-sm small fw-bold">
                       Best Seller
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="d-flex justify-content-between text-muted small mb-3">
                       <span><FaBook className="me-1"/> 12 Lessons</span>
                       <span><FaUsers className="me-1"/> 1.5k Students</span>
                    </div>
                    <h5 className="fw-bold mb-2">{course}</h5>
                    <p className="text-muted small mb-4">Learn {course.toLowerCase()} from scratch with real projects.</p>
                    <div className="d-flex justify-content-between align-items-center">
                       <span className="text-primary fw-bold fs-5">$49.99</span>
                       <button className="btn btn-sm btn-outline-premium rounded-pill">Enroll Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
           <div className="text-center mt-4 d-md-none">
            <button onClick={() => navigate('/courses')} className="btn btn-link text-decoration-none text-white fw-bold">
              View All Courses <FaArrowRight className="ms-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="container py-5">
        <div className="rounded-5 overflow-hidden position-relative p-5 text-center" style={{ background: 'var(--gradient-main)' }}>
           <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
           <div className="position-relative z-1">
             <h2 className="display-5 fw-bold text-white mb-4">Ready to Start Your Journey?</h2>
             <p className="text-white text-opacity-75 lead mb-5 mx-auto" style={{ maxWidth: '600px' }}>
               Join thousands of students and start learning the skills that matter.
             </p>
             <button onClick={() => navigate('/register')} className="btn btn-light text-primary fw-bold px-5 py-3 rounded-pill shadow-lg hover-scale">
               Get Started for Free
             </button>
           </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
