"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  Heading as HeadingIcon,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";
import { useRef } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your article in Markdown...",
  readOnly = false,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleFormatting = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const beforeText = text.substring(0, start);
    const selectedText = text.substring(start, end);
    const afterText = text.substring(end);

    // Check if already formatted
    const isFormatted =
      beforeText.endsWith(before) && afterText.startsWith(after);

    let newValue = "";
    let newSelectionStart = start;
    let newSelectionEnd = end;

    if (isFormatted) {
      // Remove formatting
      newValue =
        beforeText.substring(0, beforeText.length - before.length) +
        selectedText +
        afterText.substring(after.length);
      newSelectionStart = start - before.length;
      newSelectionEnd = end - before.length;
    } else {
      // Add formatting
      newValue = `${beforeText}${before}${selectedText}${after}${afterText}`;
      newSelectionStart = start + before.length;
      newSelectionEnd = end + before.length;
    }

    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    }, 0);
  };

  const toggleBlockFormatting = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const text = textarea.value;

    // Find start of current line
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    // Find end of current line
    const lineEndIdx = text.indexOf("\n", start);
    const lineEnd = lineEndIdx === -1 ? text.length : lineEndIdx;

    const lineContent = text.substring(lineStart, lineEnd);
    const beforeLine = text.substring(0, lineStart);
    const afterLine = text.substring(lineEnd);

    let newLineContent = lineContent;
    let newCursorPos = start;

    // Check if line already starts with this prefix
    if (lineContent.startsWith(prefix)) {
      // Remove prefix
      newLineContent = lineContent.substring(prefix.length);
      newCursorPos = Math.max(lineStart, start - prefix.length);
    } else {
      // Check if line starts with ANY header prefix (specific logic for headers)
      const headerMatch = lineContent.match(/^(#{1,6}\s)/);
      if (prefix.trim().startsWith("#") && headerMatch) {
        // Replace existing header level
        const oldPrefix = headerMatch[1];
        newLineContent = prefix + lineContent.substring(oldPrefix.length);
        newCursorPos = start + (prefix.length - oldPrefix.length);
      } else {
        // Add prefix
        newLineContent = prefix + lineContent;
        newCursorPos = start + prefix.length;
      }
    }

    const newValue = beforeLine + newLineContent + afterLine;
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <Tabs defaultValue="write" className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="w-fit">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleFormatting("**", "**")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleFormatting("*", "*")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleBlockFormatting("# ")}
            title="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleBlockFormatting("## ")}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleBlockFormatting("### ")}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleBlockFormatting("- ")}
            title="List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleBlockFormatting("> ")}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleFormatting("`", "`")}
            title="Code"
          >
            <Code className="h-4 w-4" />
          </Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleFormatting("[", "](url)")}
            title="Link"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => toggleFormatting("![alt text](", ")")}
            title="Image"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <TabsContent value="write" className="flex-1 mt-0">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[500px] font-mono resize-none focus-visible:ring-1"
          disabled={readOnly}
        />
      </TabsContent>
      <TabsContent value="preview" className="flex-1 mt-0">
        <div className="min-h-[600px] rounded-md border p-6 bg-card text-card-foreground overflow-y-auto">
          <article className="prose prose-stone dark:prose-invert max-w-none">
            {value ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">Nothing to preview</p>
            )}
          </article>
        </div>
      </TabsContent>
    </Tabs>
  );
}
