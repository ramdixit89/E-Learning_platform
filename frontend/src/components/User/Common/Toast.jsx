import React, { createContext, useContext, useState, useCallback } from "react";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";

// ── Context ──────────────────────────────────────────────────────────────────
const ToastContext = createContext(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

// ── Config ───────────────────────────────────────────────────────────────────
const VARIANT = {
  success: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", color: "#6ee7b7", Icon: FaCheckCircle },
  error:   { bg: "rgba(239,68,68,0.12)",  border: "rgba(239,68,68,0.3)",  color: "#fca5a5", Icon: FaTimesCircle },
  info:    { bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)", color: "#a5b4fc", Icon: FaInfoCircle },
  warning: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", color: "#fcd34d", Icon: FaExclamationTriangle },
};

// ── Provider ─────────────────────────────────────────────────────────────────
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback((message, type = "info", duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

// ── Container ─────────────────────────────────────────────────────────────────
const ToastContainer = ({ toasts, onDismiss }) => (
  <div
    style={{
      position: "fixed", bottom: "1.5rem", right: "1.5rem",
      zIndex: 9999, display: "flex", flexDirection: "column", gap: "0.6rem",
      pointerEvents: "none",
    }}
  >
    {toasts.map((t) => (
      <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
    ))}
  </div>
);

// ── Item ──────────────────────────────────────────────────────────────────────
const ToastItem = ({ toast, onDismiss }) => {
  const v = VARIANT[toast.type] || VARIANT.info;
  const { Icon } = v;

  return (
    <div
      style={{
        pointerEvents: "all",
        animation: "toastSlideIn 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", alignItems: "flex-start", gap: "0.75rem",
        background: "rgba(9,13,31,0.95)", backdropFilter: "blur(16px)",
        border: `1px solid ${v.border}`,
        borderRadius: "12px", padding: "0.85rem 1rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        minWidth: "280px", maxWidth: "380px",
        backgroundColor: v.bg,
      }}
    >
      <Icon style={{ color: v.color, fontSize: "16px", flexShrink: 0, marginTop: "2px" }} />
      <span style={{ color: "#f1f5f9", fontSize: "0.875rem", flex: 1, lineHeight: 1.5 }}>
        {toast.message}
      </span>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#64748b", padding: 0, fontSize: "12px", flexShrink: 0,
          marginTop: "2px", transition: "color 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "#f1f5f9"}
        onMouseLeave={(e) => e.currentTarget.style.color = "#64748b"}
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default ToastProvider;
