import React from "react";

// Regex that handles URLs with parentheses: matches balanced parens inside the URL
const LINK_REGEX = /\[([^\]]+)\]\(((?:[^()]*|\([^()]*\))*)\)/g;

/**
 * Renders plain text with:
 * - Newlines preserved as <br />
 * - Markdown-style links: [text](url) — supports parens in URLs
 */
export const renderRichText = (text: string): React.ReactNode[] => {
  const lines = text.split("\n");

  return lines.flatMap((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    const linkRegex = new RegExp(LINK_REGEX.source, "g");
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      const isExternal = match[2].startsWith("http");
      parts.push(
        <a
          key={`${lineIndex}-${match.index}`}
          href={match[2]}
          className="underline text-red-ink hover:text-foreground transition-colors"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    if (lineIndex < lines.length - 1) {
      parts.push(<br key={`br-${lineIndex}`} />);
    }

    return parts;
  });
};

export { LINK_REGEX };
