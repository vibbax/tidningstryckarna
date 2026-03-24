import React from "react";

/**
 * Renders plain text with:
 * - Newlines preserved as <br />
 * - Markdown-style links: [text](url)
 */
export const renderRichText = (text: string): React.ReactNode[] => {
  const lines = text.split("\n");

  return lines.flatMap((line, lineIndex) => {
    const parts: React.ReactNode[] = [];
    // Match [link text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
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

    // Add <br /> between lines (not after last)
    if (lineIndex < lines.length - 1) {
      parts.push(<br key={`br-${lineIndex}`} />);
    }

    return parts;
  });
};
