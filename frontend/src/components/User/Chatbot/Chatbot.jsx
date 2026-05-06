import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm your Learning Assistant. Ask me about courses, certificates, or pricing!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_URL}/api/chatbot/ask`, { message: userMessage });
      setMessages((prev) => [...prev, { sender: "bot", text: response.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Oops! I seem to be disconnected from the server right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "clamp(1rem, 3vw, 2rem)", right: "clamp(1rem, 3vw, 2rem)", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 50, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            style={{
              width: "min(380px, calc(100vw - 2rem))",
              height: "min(450px, calc(100vh - 6rem))",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1.5rem",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.4) inset",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{ 
              background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)", 
              color: "white", 
              padding: "1.25rem", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              position: "relative",
              zIndex: 10
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ background: "rgba(255,255,255,0.2)", padding: "0.6rem", borderRadius: "0.75rem", display: "flex" }}>
                  <FaRobot size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.5px" }}>Nova AI</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.9, display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", display: "inline-block", boxShadow: "0 0 8px #4ade80" }}></span>
                    Online Assistant
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", padding: "0.5rem", borderRadius: "50%", cursor: "pointer", display: "flex", transition: "all 0.2s" }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, padding: "1.25rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {messages.map((msg, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={index} 
                  style={{ display: "flex", gap: "0.75rem", alignSelf: msg.sender === "user" ? "flex-end" : "flex-start", maxWidth: "85%" }}
                >
                  {msg.sender === "bot" && (
                    <div style={{ width: "36px", height: "36px", borderRadius: "1rem", background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(6, 182, 212, 0.3)" }}>
                      <FaRobot size={16} />
                    </div>
                  )}
                  <div
                    style={{
                      padding: "0.85rem 1.15rem",
                      background: msg.sender === "user" ? "linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)" : "rgba(255, 255, 255, 0.95)",
                      color: msg.sender === "user" ? "white" : "#1f2937",
                      boxShadow: msg.sender === "user" ? "0 4px 15px rgba(79, 70, 229, 0.3)" : "0 4px 15px rgba(0,0,0,0.05)",
                      border: msg.sender === "bot" ? "1px solid rgba(255,255,255,0.6)" : "none",
                      borderRadius: "1.25rem",
                      borderBottomRightRadius: msg.sender === "user" ? "0.25rem" : "1.25rem",
                      borderBottomLeftRadius: msg.sender === "bot" ? "0.25rem" : "1.25rem",
                      fontSize: "0.95rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", gap: "0.75rem", alignSelf: "flex-start" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "1rem", background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 10px rgba(6, 182, 212, 0.3)" }}>
                    <FaRobot size={16} />
                  </div>
                  <div style={{ padding: "1rem", borderRadius: "1.25rem", borderBottomLeftRadius: "0.25rem", background: "rgba(255, 255, 255, 0.95)", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", border: "1px solid rgba(255,255,255,0.6)", display: "flex", gap: "5px", alignItems: "center" }}>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} style={{ width: 6, height: 6, background: "#4f46e5", borderRadius: "50%" }} />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} style={{ width: 6, height: 6, background: "#06b6d4", borderRadius: "50%" }} />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} style={{ width: 6, height: 6, background: "#4f46e5", borderRadius: "50%" }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} style={{ display: "flex", padding: "1rem 1.25rem", background: "rgba(255, 255, 255, 0.5)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(255,255,255,0.6)" }}>
              <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Message Nova AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ width: "100%", padding: "1rem 3.5rem 1rem 1.25rem", background: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "2rem", outline: "none", fontSize: "0.95rem", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)", transition: "all 0.2s" }}
                  onFocus={(e) => e.target.style.boxShadow = "0 0 0 3px rgba(79, 70, 229, 0.2)"}
                  onBlur={(e) => e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.02)"}
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  style={{ position: "absolute", right: "6px", width: "38px", height: "38px", padding: 0, background: "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)", border: "none", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", opacity: input.trim() && !isTyping ? 1 : 0.5, boxShadow: "0 4px 10px rgba(6, 182, 212, 0.3)" }}
                >
                  <FaPaperPlane size={14} style={{ marginLeft: "-2px", marginTop: "1px" }} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          background: isOpen ? "#f43f5e" : "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)",
          color: "white",
          border: "none",
          boxShadow: isOpen ? "0 10px 25px rgba(244, 63, 94, 0.4)" : "0 10px 30px rgba(6, 182, 212, 0.4)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "background 0.3s ease, box-shadow 0.3s ease"
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1 : [1, 1.1, 1] }}
          transition={{ duration: 0.3, scale: { repeat: isOpen ? 0 : Infinity, repeatType: "reverse", duration: 2 } }}
        >
          {isOpen ? <FaTimes size={26} /> : <FaCommentDots size={28} />}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default Chatbot;
