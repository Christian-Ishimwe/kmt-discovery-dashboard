"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleContentRendererProps {
  content: string;
  className?: string;
}

/**
 * Smart component that renders both Markdown (legacy) and HTML (Tiptap) content
 * Detects format automatically based on content structure
 */
export function ArticleContentRenderer({
  content,
  className = "",
}: ArticleContentRendererProps) {
  if (!content) {
    return (
      <div className="text-muted-foreground italic">No content available</div>
    );
  }

  // Detect if content is HTML (from Tiptap) or Markdown (legacy)
  const isHTML = content.trim().startsWith("<") || content.includes("<p>") || content.includes("<h1>");

  if (isHTML) {
    // Render HTML content from Tiptap
    return (
      <div
        className={`prose prose-stone dark:prose-invert max-w-none ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // Render Markdown content (legacy)
  return (
    <div className={`prose prose-stone dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
