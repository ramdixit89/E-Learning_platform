import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaCopy, FaCheck, FaCode } from "react-icons/fa";

// Map common language names/aliases to Prism language identifiers
const detectLanguage = (className = "", rawCode = "") => {
  // From class="language-xxx" written by Jodit / manually
  const fromClass = (className.match(/language-(\w+)/) || [])[1];
  if (fromClass) return fromClass;

  // Simple heuristic for un-tagged code
  const code = rawCode.trim();
  if (/^[\s\S]*import\s+React/.test(code) || /jsx?|tsx?/.test(code)) return "jsx";
  if (/\bdef\s+\w+\s*\(/.test(code) || /^from\s+\w/.test(code)) return "python";
  if (/\bfn\s+\w+/.test(code) || /println!/.test(code)) return "rust";
  if (/\bpublic\s+class\b/.test(code)) return "java";
  if (/\bfunc\s+\w+/.test(code)) return "go";
  if (/^\s*<[\w]/.test(code)) return "html";
  if (/^\s*{[\s\S]*}$/.test(code) || /":/.test(code)) return "json";
  if (/\bSELECT\b|\bFROM\b/i.test(code)) return "sql";
  if (/^\s*\w[\w-]+\s*{/.test(code)) return "css";
  if (/\$\w+\s*=/.test(code) || code.startsWith("<?php")) return "php";
  return "javascript"; // default
};

const LANG_LABELS = {
  javascript: "JavaScript",
  jsx: "JSX / React",
  tsx: "TSX",
  typescript: "TypeScript",
  python: "Python",
  rust: "Rust",
  java: "Java",
  go: "Go",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  sql: "SQL",
  php: "PHP",
  bash: "Bash",
  shell: "Shell",
  yaml: "YAML",
  markdown: "Markdown",
};

const CodeBlock = ({ code = "", className = "", inline = false }) => {
  const [copied, setCopied] = useState(false);
  const language = detectLanguage(className, code);
  const label = LANG_LABELS[language] || language.toUpperCase();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  // Inline code — just style simply
  if (inline) {
    return (
      <code style={{
        background: "rgba(99,102,241,0.12)",
        border: "1px solid rgba(99,102,241,0.2)",
        borderRadius: "5px",
        padding: "0.15em 0.45em",
        fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        fontSize: "0.85em",
        color: "#a78bfa",
      }}>
        {code}
      </code>
    );
  }

  return (
    <div
      style={{
        margin: "1.75rem 0",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid rgba(99,102,241,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)",
        background: "#1e1e2e",
      }}
    >
      {/* Header bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.6rem 1rem",
        background: "#16162a",
        borderBottom: "1px solid rgba(99,102,241,0.15)",
      }}>
        {/* Left — traffic lights + lang */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ display: "flex", gap: "6px" }}>
            {["#ef4444", "#f59e0b", "#10b981"].map((c) => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.8 }} />
            ))}
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "6px", padding: "0.2rem 0.65rem",
          }}>
            <FaCode style={{ color: "#818cf8", fontSize: "11px" }} />
            <span style={{ color: "#818cf8", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {label}
            </span>
          </div>
        </div>

        {/* Right — copy button */}
        <button
          onClick={handleCopy}
          title="Copy code"
          style={{
            display: "flex", alignItems: "center", gap: "0.4rem",
            background: copied ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "7px", padding: "0.3rem 0.75rem",
            color: copied ? "#6ee7b7" : "#94a3b8",
            fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s ease", fontFamily: "inherit",
          }}
          onMouseEnter={(e) => { if (!copied) { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "#f1f5f9"; } }}
          onMouseLeave={(e) => { if (!copied) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#94a3b8"; } }}
        >
          {copied ? <FaCheck style={{ fontSize: "11px" }} /> : <FaCopy style={{ fontSize: "11px" }} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        lineNumberStyle={{
          color: "#3d3d5c",
          fontSize: "0.75rem",
          paddingRight: "1.2rem",
          userSelect: "none",
          minWidth: "2.5rem",
        }}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1rem 1.25rem 0",
          background: "#1e1e2e",
          fontSize: "0.875rem",
          lineHeight: "1.65",
          fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
          overflowX: "auto",
        }}
        wrapLines
        wrapLongLines={false}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
