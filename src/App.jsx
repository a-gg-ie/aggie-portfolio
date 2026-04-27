import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Custom Cursor that inverses colors underneath
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      className="custom-cursor"
      animate={{
        x: mousePosition.x - 32,
        y: mousePosition.y - 32,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
    />
  );
};

// Infinite Marquee Background
const MarqueeText = () => {
  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        animate={{ x: [0, -1035] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
      >
        <span className="marquee-text">AGGIE THOMAS — LOGIC MEETS DESIGN — AGGIE THOMAS — LOGIC MEETS DESIGN — </span>
      </motion.div>
    </div>
  );
};

// Text reveal animation
const RevealText = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: 5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 0, y: 50, rotate: 5 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 300]);
  const yText = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <div className="brutalist-layout">
      <CustomCursor />
      <MarqueeText />

      <main className="main-content">

        {/* Huge Hero Section */}
        <section className="hero-section">
          <motion.div className="image-wrapper" style={{ y: yImage }}>
            <img src="/profile.jpg" alt="Aggie Thomas"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }} />
          </motion.div>

          <motion.div className="hero-text-wrapper" style={{ y: yText }}>
            <h1 className="massive-text">
              AGGIE <br />
              <span className="accent">THOMAS</span>
            </h1>
            <p className="sub-headline">COMPUTER SCIENCE STUDENT</p>
          </motion.div>
        </section>

        {/* Objective & Attributes */}
        <section className="raw-section" style={{ marginTop: '30vh' }}>
          <RevealText>
            <h2 className="section-title">01. OBJECTIVE</h2>
            <p className="huge-paragraph">
              Disciplined work ethic. <br /> Rapid adaptability. <br />
              I turn <span className="accent">IDEAS </span>into <span className="accent">Systems and Experiences</span>.
            </p>
          </RevealText>

          <div style={{ marginTop: '10vh' }}>
            <RevealText delay={0.2}>
              <h2 className="section-title">02. CORE COMPETENCIES</h2>
              <ul className="raw-list">
                <li>LOGICAL PROBLEM SOLVER</li>
                <li>OWNERSHIP MINDSET <span className="small-text">(Never drop the ball)</span></li>
                <li>DATA-DRIVEN METHODOLOGY</li>
                <li>WORKFLOW DOCUMENTATION</li>
              </ul>
            </RevealText>
          </div>
        </section>

        {/* Education & Skills */}
        <section className="raw-section">
          <RevealText>
            <h2 className="section-title">03. KNOWLEDGE BASE</h2>
          </RevealText>

          <div className="flex-grid">
            <RevealText delay={0.1}>
              <div className="data-block">
                <h3>AMAL JYOTHI COLLEGE OF ENGINEERING</h3>
                <p className="highlight">B.TECH CS | 2025 – 2029</p>
                <p>Logic Development. Engineering Analytics. Data Structures.</p>
              </div>
            </RevealText>

            <RevealText delay={0.2}>
              <div className="data-block">
                <h3>PRESENTATION CONVENT</h3>
                <p className="highlight">COMPLETED 2025</p>

              </div>
            </RevealText>

            <RevealText delay={0.3}>
              <div className="data-block">
                <h3>TECHNICAL ARSENAL</h3>
                <div className="raw-tags">
                  <span>PYTHON</span>
                  <span>SQL</span>
                  <span>C</span>
                  <span>UI/UX DESIGN</span>
                  <span>GITHUB</span>
                </div>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Projects */}
        <section className="raw-section">
          <RevealText>
            <h2 className="section-title">04. EXECUTED TASKS</h2>
          </RevealText>

          <div className="project-list">
            <RevealText delay={0.1}>
              <div className="project-row">
                <div className="project-info">
                  <h2>INVENTORY TRACKER</h2>
                  <p className="highlight">FUNCTIONAL PROTOTYPE</p>
                </div>
                <div className="project-desc">
                  <p>Python backend + UI/UX layout. Replaced manual entry with a digital solution to improve data accuracy.</p>
                </div>
              </div>
            </RevealText>

            <RevealText delay={0.2}>
              <div className="project-row">
                <div className="project-info">
                  <h2>DEPT. REPRESENTATIVE</h2>
                  <p className="highlight">COLLEGE RADIO</p>
                </div>
                <div className="project-desc">
                  <p>Primary liaison coordinating broadcast schedules. Ensured tasks were tracked and executed on time.</p>
                </div>
              </div>
            </RevealText>
          </div>
        </section>

        {/* Footer */}
        <footer className="raw-footer">
          <RevealText>
            <h2 className="massive-text outline-text">PING ME</h2>
            <div className="footer-links">
              <a href="mailto:aggiethomas324@gmail.com" className="hover-link">EMAIL</a>
              <a href="https://www.linkedin.com/in/aggiethomas" target="_blank" rel="noreferrer" className="hover-link">LINKEDIN</a>
              <a href="tel:+919818721005" className="hover-link">PHONE</a>
            </div>
            <p className="footer-note">NEVER RUN ALONE.</p>
          </RevealText>
        </footer>

      </main>
    </div>
  );
}

export default App;
