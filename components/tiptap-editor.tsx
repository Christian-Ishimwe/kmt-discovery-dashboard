"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link2,
  Image as ImageIcon,
  Maximize,
  Minimize,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Upload,
} from "lucide-react";
import { useEffect, useCallback, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import mammoth from "mammoth";

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function TiptapEditor({
  content = "",
  onChange,
  placeholder = "Start writing...",
  readOnly = false,
}: TiptapEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: "left",
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFullscreen]);

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt("Image URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor) return;

      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        alert("Please upload a .docx file");
        return;
      }

      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });

        // Set the converted HTML content
        editor.commands.setContent(result.value);

        if (result.messages.length > 0) {
          console.warn("Conversion warnings:", result.messages);
        }
      } catch (error) {
        console.error("Error converting document:", error);
        alert("Failed to convert document. Please try again.");
      }

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [editor],
  );

  const triggerFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  if (!editor) {
    return null;
  }

  if (readOnly) {
    return (
      <div className="prose prose-sm max-w-none">
        <EditorContent editor={editor} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white transition-all",
        isFullscreen ? "fixed inset-0 z-50 flex flex-col" : "relative",
      )}
    >
      {/* Toolbar - Word-like styling */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-1 flex-wrap">
            {/* Text Formatting */}
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("bold") && "bg-blue-100 text-blue-700",
                )}
                title="Bold (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("italic") && "bg-blue-100 text-blue-700",
                )}
                title="Italic (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("strike") && "bg-blue-100 text-blue-700",
                )}
                title="Strikethrough"
              >
                <Strikethrough className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("code") && "bg-blue-100 text-blue-700",
                )}
                title="Code"
              >
                <Code className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Headings */}
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("heading", { level: 1 }) &&
                    "bg-blue-100 text-blue-700",
                )}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("heading", { level: 2 }) &&
                    "bg-blue-100 text-blue-700",
                )}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("heading", { level: 3 }) &&
                    "bg-blue-100 text-blue-700",
                )}
                title="Heading 3"
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Lists */}
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("bulletList") && "bg-blue-100 text-blue-700",
                )}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("orderedList") && "bg-blue-100 text-blue-700",
                )}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("blockquote") && "bg-blue-100 text-blue-700",
                )}
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Alignment */}
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive({ textAlign: "left" }) &&
                    "bg-blue-100 text-blue-700",
                )}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive({ textAlign: "center" }) &&
                    "bg-blue-100 text-blue-700",
                )}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive({ textAlign: "right" }) &&
                    "bg-blue-100 text-blue-700",
                )}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive({ textAlign: "justify" }) &&
                    "bg-blue-100 text-blue-700",
                )}
                title="Justify"
              >
                <AlignJustify className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Insert */}
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={setLink}
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("link") && "bg-blue-100 text-blue-700",
                )}
                title="Insert Link"
              >
                <Link2 className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addImage}
                className="h-8 w-8 p-0"
                title="Insert Image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="mx-1 h-6" />

            {/* Undo/Redo */}
            <div className="flex items-center gap-0.5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="h-8 w-8 p-0"
                title="Undo (Ctrl+Z)"
              >
                <Undo className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="h-8 w-8 p-0"
                title="Redo (Ctrl+Y)"
              >
                <Redo className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Fullscreen Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 p-0 ml-2"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="h-4 w-4" />
            ) : (
              <Maximize className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Editor Content - Word-like page */}
      <div
        className={cn(
          "overflow-y-auto bg-gray-50",
          isFullscreen ? "flex-1" : "min-h-[500px]",
        )}
      >
        <div
          className={cn(
            "mx-auto bg-white shadow-sm",
            isFullscreen
              ? "my-8 min-h-[calc(100vh-8rem)] px-16 py-12 max-w-4xl"
              : "p-8 max-w-full",
          )}
        >
          <div className="prose prose-base max-w-none focus-within:outline-none">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
