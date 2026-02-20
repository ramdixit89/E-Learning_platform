import React from "react";
import CodeBlock from "./CodeBlock";

/**
 * RichContent
 * Renders HTML content from the Jodit rich-text editor and replaces any
 * <pre><code>...</code></pre> or bare <code>...</code> blocks with the
 * styled CodeBlock component.
 *
 * Usage:
 *   <RichContent html={blog.content} />
 */

// Split an HTML string around <pre> blocks, returning an array of parts:
// { type: 'html', value: '...' } or { type: 'code', code: '...', lang: '...' }
const splitHtmlAndCode = (html = "") => {
  const parts = [];
  // Match <pre ...><code class="language-xxx">...</code></pre>  OR  <pre>...</pre>
  const regex = /<pre[^>]*>\s*(?:<code([^>]*)>)?([\s\S]*?)(?:<\/code>)?\s*<\/pre>/gi;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(html)) !== null) {
    // HTML before this code block
    if (match.index > lastIndex) {
      parts.push({ type: "html", value: html.slice(lastIndex, match.index) });
    }

    const codeAttrs = match[1] || ""; // e.g. ' class="language-js"'
    const rawCode = match[2] || "";
    const decoded = decodeHtmlEntities(rawCode);
    parts.push({ type: "code", code: decoded, lang: codeAttrs });

    lastIndex = match.index + match[0].length;
  }

  // Remaining HTML after the last code block
  if (lastIndex < html.length) {
    parts.push({ type: "html", value: html.slice(lastIndex) });
  }

  return parts;
};

// Decode common HTML entities so code is rendered correctly
const decodeHtmlEntities = (str = "") =>
  str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/<br\s*\/?>/gi, "\n");

// Replace inline <code>...</code> (not inside <pre>) with styled inline code
const processInlineCode = (htmlStr) => {
  // We'll split on inline <code> tags (not preceded by <pre>)
  const parts = [];
  const regex = /<code([^>]*)>([\s\S]*?)<\/code>/gi;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(htmlStr)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span
          key={`html-${lastIndex}`}
          dangerouslySetInnerHTML={{ __html: htmlStr.slice(lastIndex, match.index) }}
        />
      );
    }
    const code = decodeHtmlEntities(match[2]);
    parts.push(
      <CodeBlock key={`inline-${match.index}`} code={code} className={match[1]} inline />
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < htmlStr.length) {
    parts.push(
      <span key={`html-end-${lastIndex}`} dangerouslySetInnerHTML={{ __html: htmlStr.slice(lastIndex) }} />
    );
  }

  return parts;
};

const RichContent = ({ html = "", className = "" }) => {
  if (!html) return null;

  const parts = splitHtmlAndCode(html);

  return (
    <div
      className={`rich-content ${className}`}
      style={{
        color: "var(--text-muted)",
        lineHeight: 1.85,
        fontSize: "1rem",
      }}
    >
      {parts.map((part, i) => {
        if (part.type === "code") {
          return <CodeBlock key={i} code={part.code} className={part.lang} />;
        }

        // For HTML parts, also handle inline <code> tags
        const hasInlineCode = /<code/i.test(part.value);
        if (hasInlineCode) {
          return (
            <div key={i}>
              {processInlineCode(part.value)}
            </div>
          );
        }

        return (
          <div
            key={i}
            dangerouslySetInnerHTML={{ __html: part.value }}
          />
        );
      })}
    </div>
  );
};

export default RichContent;
