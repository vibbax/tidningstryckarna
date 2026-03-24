import React from "react";
import { FileDown } from "lucide-react";

const DOC_EXTENSIONS = /\.(pdf|docx?|xlsx?|pptx?|csv|zip|rar|txt)(\?|$)/i;

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
      const url = match[2];
      const isExternal = url.startsWith("http");
      const isDocument = DOC_EXTENSIONS.test(url);

      if (isDocument) {
        parts.push(
          <a
            key={`${lineIndex}-${match.index}`}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 my-1 rounded bg-accent text-accent-foreground font-body text-sm font-medium hover:bg-red-ink-dark transition-colors no-underline"
          >
            <FileDown className="w-4 h-4 shrink-0" />
            {match[1]}
          </a>
        );
      } else {
        parts.push(
          <a
            key={`${lineIndex}-${match.index}`}
            href={url}
            className="underline text-red-ink hover:text-foreground transition-colors"
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {match[1]}
          </a>
        );
      }
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
