import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePageContent, useUpdatePageContent } from "@/hooks/usePageContent";
import { usePageLayout, useUpdatePageLayout } from "@/hooks/usePageLayout";
import { usePages, useCreatePage, useDeletePage } from "@/hooks/usePages";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings, X, LogOut, Save, ChevronDown, ChevronRight, Upload, Image,
  Trash2, Copy, FolderOpen, Plus, ArrowUp, ArrowDown, GripVertical, FilePlus, FileX,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  BlockDef, BlockType, BLOCK_TYPE_META, DEFAULT_LAYOUTS, generateBlockId,
} from "@/components/blocks/blockTypes";

// ─── Field types ─────────────────────────────────────────────────
type FieldType = "text" | "multiline" | "image" | "link" | "images";

interface FieldDef {
  key: string;
  label: string;
  type?: FieldType;
}

// ─── Media Library ───────────────────────────────────────────────

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const getPublicUrl = (path: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/media/${path}`;

const MediaLibrary = ({ onSelect, onClose }: { onSelect: (url: string) => void; onClose: () => void }) => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadFiles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!error && data) {
      setFiles(
        data
          .filter((f) => f.name !== ".emptyFolderPlaceholder")
          .map((f) => ({ name: f.name, url: getPublicUrl(f.name) }))
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadFiles(); }, [loadFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("media").upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) toast.error("Uppladdning misslyckades: " + error.message);
    else { toast.success("Bild uppladdad!"); await loadFiles(); }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = async (name: string) => {
    const { error } = await supabase.storage.from("media").remove([name]);
    if (error) toast.error("Kunde inte ta bort: " + error.message);
    else { toast.success("Borttagen"); await loadFiles(); }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-foreground/40">
      <div className="bg-card border border-foreground w-[90vw] max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-foreground">
          <div className="flex items-center gap-2">
            <FolderOpen size={16} className="text-red-ink" />
            <h3 className="font-display text-lg text-foreground">Mediabibliotek</h3>
          </div>
          <button onClick={onClose} className="text-foreground hover:text-red-ink transition-colors"><X size={18} /></button>
        </div>
        <div className="p-4 border-b border-border">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 bg-foreground text-background font-body text-[10px] font-semibold tracking-[0.15em] uppercase px-4 py-2 hover:bg-red-ink transition-colors disabled:opacity-50"
          >
            <Upload size={12} />
            {uploading ? "Laddar upp..." : "Ladda upp bild"}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <p className="font-body text-sm text-muted-foreground">Laddar...</p>
          ) : files.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground">Inga bilder uppladdade ännu.</p>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {files.map((f) => (
                <div key={f.name} className="group relative border border-border hover:border-foreground transition-colors">
                  <img src={f.url} alt={f.name} className="w-full aspect-square object-cover cursor-pointer"
                    onClick={() => { onSelect(f.url); onClose(); }} />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 cursor-pointer"
                    onClick={() => { onSelect(f.url); onClose(); }} title="Välj bild">
                    <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(f.url); toast.success("URL kopierad"); }}
                      className="bg-background/90 p-1.5 hover:bg-background transition-colors" title="Kopiera URL"><Copy size={12} /></button>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(f.name); }}
                      className="bg-background/90 p-1.5 hover:bg-red-ink hover:text-background transition-colors" title="Ta bort"><Trash2 size={12} /></button>
                  </div>
                  <p className="font-mono text-[8px] text-muted-foreground truncate px-1 py-0.5">{f.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Image Field ─────────────────────────────────────────────────

const ImageField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [showLibrary, setShowLibrary] = useState(false);
  return (
    <div>
      {value && (
        <div className="mb-2 border border-border">
          <img src={value} alt="Vald bild" className="w-full h-24 object-cover" />
        </div>
      )}
      <div className="flex gap-2">
        <button type="button" onClick={() => setShowLibrary(true)}
          className="flex items-center gap-1.5 bg-foreground text-background font-body text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 hover:bg-red-ink transition-colors">
          <Image size={11} />
          {value ? "Byt bild" : "Välj bild"}
        </button>
        {value && (
          <button type="button" onClick={() => onChange("")}
            className="flex items-center gap-1 border border-border text-foreground font-body text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 hover:border-red-ink hover:text-red-ink transition-colors">
            <Trash2 size={11} /> Ta bort
          </button>
        )}
      </div>
      {showLibrary && <MediaLibrary onSelect={onChange} onClose={() => setShowLibrary(false)} />}
    </div>
  );
};

// ─── Images (multi) Field ────────────────────────────────────────

interface GalleryImage {
  url: string;
  caption: string;
}

const ImagesField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const [showLibrary, setShowLibrary] = useState(false);
  const [addingIndex, setAddingIndex] = useState<number | null>(null);

  const images: GalleryImage[] = (() => {
    try { return JSON.parse(value) || []; } catch { return []; }
  })();

  const update = (newImages: GalleryImage[]) => onChange(JSON.stringify(newImages));

  const handleAdd = () => {
    setAddingIndex(images.length);
    setShowLibrary(true);
  };

  const handleReplace = (index: number) => {
    setAddingIndex(index);
    setShowLibrary(true);
  };

  const handleSelect = (url: string) => {
    const updated = [...images];
    if (addingIndex !== null && addingIndex >= images.length) {
      updated.push({ url, caption: "" });
    } else if (addingIndex !== null) {
      updated[addingIndex] = { ...updated[addingIndex], url };
    }
    update(updated);
    setAddingIndex(null);
  };

  const handleRemove = (index: number) => {
    update(images.filter((_, i) => i !== index));
  };

  const handleCaptionChange = (index: number, caption: string) => {
    const updated = [...images];
    updated[index] = { ...updated[index], caption };
    update(updated);
  };

  const handleMove = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;
    const updated = [...images];
    [updated[index], updated[target]] = [updated[target], updated[index]];
    update(updated);
  };

  return (
    <div className="space-y-2">
      {images.map((img, i) => (
        <div key={i} className="border border-border p-2 bg-card">
          <div className="flex gap-2 items-start">
            <img src={img.url} alt={img.caption || `Bild ${i + 1}`} className="w-16 h-16 object-cover flex-shrink-0 cursor-pointer" onClick={() => handleReplace(i)} />
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Bildtext..."
                value={img.caption}
                onChange={(e) => handleCaptionChange(i, e.target.value)}
                className="w-full bg-background border border-border px-2 py-1 font-body text-xs text-foreground focus:outline-none focus:border-red-ink"
              />
              <div className="flex gap-1 mt-1">
                <button onClick={() => handleMove(i, -1)} disabled={i === 0}
                  className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"><ArrowUp size={10} /></button>
                <button onClick={() => handleMove(i, 1)} disabled={i === images.length - 1}
                  className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"><ArrowDown size={10} /></button>
                <button onClick={() => handleRemove(i)}
                  className="p-0.5 text-muted-foreground hover:text-red-ink transition-colors"><Trash2 size={10} /></button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAdd}
        className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-border font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground hover:border-foreground hover:text-foreground transition-colors">
        <Plus size={11} />
        Lägg till bild
      </button>
      {showLibrary && <MediaLibrary onSelect={handleSelect} onClose={() => { setShowLibrary(false); setAddingIndex(null); }} />}
    </div>
  );
};

// ─── Login Form ──────────────────────────────────────────────────

const AdminLoginForm = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: err } = await signIn(email, password);
    if (err) setError(err.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">E-post</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink" required />
      </div>
      <div>
        <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Lösenord</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink" required />
      </div>
      {error && <p className="font-body text-xs text-red-ink">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full bg-foreground text-background font-body text-xs font-semibold tracking-[0.15em] uppercase py-3 hover:bg-red-ink transition-colors disabled:opacity-50">
        {loading ? "Loggar in..." : "Logga in"}
      </button>
    </form>
  );
};

// ─── Multiline Field with Link button ────────────────────────────

/** Parse markdown text into segments of plain text and links */
const parseSegments = (text: string): { type: "text" | "link"; value: string; url?: string; raw: string }[] => {
  const segments: { type: "text" | "link"; value: string; url?: string; raw: string }[] = [];
  const regex = /\[([^\]]+)\]\(((?:[^()]*|\([^()]*\))*)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      segments.push({ type: "text", value: plain, raw: plain });
    }
    segments.push({ type: "link", value: match[1], url: match[2], raw: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const plain = text.slice(lastIndex);
    segments.push({ type: "text", value: plain, raw: plain });
  }
  return segments;
};

const MultilineField = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Convert markdown value → HTML for contentEditable
  const toHtml = (text: string): string => {
    return text
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\[([^\]]+)\]\(((?:[^()]*|\([^()]*\))*)\)/g, (_, text, url) =>
        `<a class="admin-link" data-url="${url.replace(/"/g, '&quot;')}" title="${url.replace(/"/g, '&quot;')}">${text}</a>`
      )
      .replace(/\n/g, "<br>");
  };

  // Convert HTML back → markdown
  const toMarkdown = (el: HTMLDivElement): string => {
    let md = "";
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        md += node.textContent || "";
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as HTMLElement).tagName.toLowerCase();
        if (tag === "br") {
          md += "\n";
        } else if (tag === "a") {
          const url = (node as HTMLElement).getAttribute("data-url") || (node as HTMLAnchorElement).href || "";
          md += `[${node.textContent || ""}](${url})`;
        } else {
          node.childNodes.forEach(walk);
        }
      }
    };
    el.childNodes.forEach(walk);
    return md;
  };

  const handleInput = () => {
    if (!editableRef.current) return;
    const md = toMarkdown(editableRef.current);
    onChange(md);
  };

  const handleFocus = () => setIsEditing(true);
  const handleBlur = () => {
    handleInput();
    setIsEditing(false);
  };

  // Sync value → contentEditable only when not editing (to avoid cursor jumps)
  // Also handles initial render
  useEffect(() => {
    if (editableRef.current && !isEditing) {
      const html = toHtml(value);
      if (editableRef.current.innerHTML !== html) {
        editableRef.current.innerHTML = html;
      }
    }
  }, [value, isEditing]);

  const handleInsertLink = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      toast.error("Markera text först");
      return;
    }
    const range = sel.getRangeAt(0);
    // Make sure selection is within our editable
    if (!editableRef.current?.contains(range.commonAncestorContainer)) {
      toast.error("Markera text i fältet först");
      return;
    }
    const selectedText = sel.toString();
    if (!selectedText.trim()) { toast.error("Markera text först"); return; }

    const url = prompt("Ange URL:", "https://");
    if (!url) return;

    const link = document.createElement("a");
    link.className = "admin-link";
    link.setAttribute("data-url", url);
    link.title = url;
    link.textContent = selectedText;

    range.deleteContents();
    range.insertNode(link);
    sel.removeAllRanges();

    handleInput();
  };

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split(".").pop() || "pdf";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
    const path = `documents/${safeName}`;
    
    toast.info("Laddar upp dokument...");
    const { error } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      console.error("Document upload error:", error);
      toast.error(`Uppladdning misslyckades: ${error.message}`);
      return;
    }
    const url = getPublicUrl(path);
    const linkText = file.name.replace(/\.[^.]+$/, "");

    if (editableRef.current) {
      // Re-focus the editable so we can insert
      editableRef.current.focus();
      
      const link = document.createElement("a");
      link.className = "admin-link";
      link.setAttribute("data-url", url);
      link.title = url;
      link.textContent = linkText;

      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0 && editableRef.current.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        const range = sel.getRangeAt(0);
        range.deleteContents();
        range.insertNode(link);
      } else {
        editableRef.current.appendChild(link);
      }
      handleInput();
    }
    toast.success("Dokument uppladdad");
    if (fileUploadRef.current) fileUploadRef.current.value = "";
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("admin-link") || target.closest(".admin-link")) {
      e.preventDefault();
      e.stopPropagation();
      const linkEl = target.classList.contains("admin-link") ? target : target.closest(".admin-link") as HTMLElement;
      const oldUrl = linkEl.getAttribute("data-url") || "";
      const newUrl = prompt("Ändra URL (töm för att ta bort länk):", oldUrl);
      if (newUrl === null) return;
      if (newUrl === "") {
        // Unwrap link, keep text
        const text = document.createTextNode(linkEl.textContent || "");
        linkEl.parentNode?.replaceChild(text, linkEl);
      } else {
        linkEl.setAttribute("data-url", newUrl);
        linkEl.title = newUrl;
      }
      handleInput();
    }
  };

  return (
    <div>
      {/* File input must live outside isEditing guard so it stays in DOM when blur fires */}
      <input ref={fileUploadRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.csv" onChange={handleDocumentUpload} />
      {isEditing && (
        <div className="flex justify-end gap-1 mb-1">
          <button type="button" onClick={handleInsertLink}
            className="flex items-center gap-1 text-muted-foreground hover:text-red-ink transition-colors font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-border hover:border-red-ink rounded-sm"
            onMouseDown={(e) => e.preventDefault()}
          >
            <LinkIcon size={10} /> Länka
          </button>
          <button type="button" onClick={() => fileUploadRef.current?.click()}
            className="flex items-center gap-1 text-muted-foreground hover:text-red-ink transition-colors font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 border border-border hover:border-red-ink rounded-sm"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Upload size={10} /> Dokument
          </button>
        </div>
      )}
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleLinkClick}
        className="w-full min-h-[60px] bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink whitespace-pre-wrap [&_.admin-link]:underline [&_.admin-link]:text-red-ink [&_.admin-link]:cursor-pointer hover:[&_.admin-link]:opacity-80"
      />
    </div>
  );
};

// ─── Block Content Editor ────────────────────────────────────────

const BlockContentEditor = ({ pageSlug, block, onRemove, onMoveUp, onMoveDown, isFirst, isLast }: {
  pageSlug: string;
  block: BlockDef;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const { data: content } = usePageContent(pageSlug);
  const mutation = useUpdatePageContent();
  const [expanded, setExpanded] = useState(false);
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  const meta = BLOCK_TYPE_META[block.type];
  const sectionContent = content?.[block.section_key] || {};

  if (content && !initialized) {
    const vals: Record<string, string> = {};
    meta.fields.forEach((f) => {
      vals[f.key] = (sectionContent[f.key] as string) || "";
    });
    setLocalValues(vals);
    setInitialized(true);
  }

  const handleSave = () => {
    mutation.mutate(
      { page_slug: pageSlug, section_key: block.section_key, content: localValues },
      {
        onSuccess: () => toast.success(`"${meta.label}" sparad`),
        onError: (err) => toast.error(`Kunde inte spara: ${err.message}`),
      }
    );
  };

  const updateField = (key: string, value: string) => {
    setLocalValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border border-border bg-background mb-2">
      {/* Block header with controls */}
      <div className="flex items-center gap-1 px-2 py-2 bg-card border-b border-border">
        <GripVertical size={12} className="text-muted-foreground flex-shrink-0" />
        <span className="text-sm mr-1">{meta.icon}</span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-left font-mono text-[10px] tracking-[0.12em] uppercase text-foreground hover:text-red-ink transition-colors truncate"
        >
          {meta.label}
          <span className="text-muted-foreground ml-1 normal-case tracking-normal">({block.section_key})</span>
        </button>
        <div className="flex items-center gap-0.5 flex-shrink-0">
          <button onClick={onMoveUp} disabled={isFirst}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors" title="Flytta upp">
            <ArrowUp size={12} />
          </button>
          <button onClick={onMoveDown} disabled={isLast}
            className="p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors" title="Flytta ner">
            <ArrowDown size={12} />
          </button>
          <button onClick={onRemove}
            className="p-1 text-muted-foreground hover:text-red-ink transition-colors" title="Ta bort block">
            <Trash2 size={12} />
          </button>
          <button onClick={() => setExpanded(!expanded)}
            className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            {expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </button>
        </div>
      </div>

      {/* Fields */}
      {expanded && (
        <div className="p-3 space-y-3">
          {meta.fields.map((field) => {
            const fieldType = field.type || "text";
            return (
              <div key={field.key}>
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                  {field.label}
                </label>
                {fieldType === "images" ? (
                  <ImagesField value={localValues[field.key] || "[]"} onChange={(v) => updateField(field.key, v)} />
                ) : fieldType === "image" ? (
                  <ImageField value={localValues[field.key] || ""} onChange={(v) => updateField(field.key, v)} />
                ) : fieldType === "link" ? (
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[9px] text-muted-foreground">🔗</span>
                    <input type="url" placeholder="https://..."
                      value={localValues[field.key] || ""} onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink" />
                  </div>
                ) : fieldType === "select" && field.options ? (
                  <select
                    value={localValues[field.key] || field.options[0]?.value || ""}
                    onChange={(e) => updateField(field.key, e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink"
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : fieldType === "multiline" ? (
                  <MultilineField value={localValues[field.key] || ""} onChange={(v) => updateField(field.key, v)} />
                ) : (
                  <input type="text" value={localValues[field.key] || ""} onChange={(e) => updateField(field.key, e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink" />
                )}
              </div>
            );
          })}
          <button onClick={handleSave} disabled={mutation.isPending}
            className="flex items-center gap-2 bg-foreground text-background font-body text-[10px] font-semibold tracking-[0.15em] uppercase px-4 py-2 hover:bg-red-ink transition-colors disabled:opacity-50">
            <Save size={12} />
            {mutation.isPending ? "Sparar..." : "Spara innehåll"}
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Add Block Menu ──────────────────────────────────────────────

const AddBlockMenu = ({ onAdd }: { onAdd: (type: BlockType) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
      >
        <Plus size={13} />
        Lägg till block
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-card border border-foreground z-10 shadow-lg">
          {(Object.entries(BLOCK_TYPE_META) as [BlockType, typeof BLOCK_TYPE_META[BlockType]][]).map(([type, meta]) => (
            <button
              key={type}
              onClick={() => { onAdd(type); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 font-body text-xs text-foreground hover:bg-foreground hover:text-background transition-colors text-left"
            >
              <span>{meta.icon}</span>
              {meta.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Block Layout Manager ────────────────────────────────────────

const BlockLayoutManager = ({ pageSlug }: { pageSlug: string }) => {
  const { data: blocks } = usePageLayout(pageSlug);
  const updateLayout = useUpdatePageLayout();
  const [localBlocks, setLocalBlocks] = useState<BlockDef[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (blocks && !initialized) {
      setLocalBlocks(blocks);
      setInitialized(true);
    }
  }, [blocks, initialized]);

  // Reset when page changes
  useEffect(() => {
    setInitialized(false);
  }, [pageSlug]);

  const saveLayout = (newBlocks: BlockDef[]) => {
    setLocalBlocks(newBlocks);
    updateLayout.mutate(
      { page_slug: pageSlug, blocks: newBlocks },
      { onSuccess: () => toast.success("Blocklayout sparad") }
    );
  };

  const addBlock = (type: BlockType) => {
    const id = generateBlockId(type);
    const sectionKey = `${type.replace("_", "-")}-${Date.now().toString(36)}`;
    const newBlocks = [...localBlocks, { id, type, section_key: sectionKey }];
    saveLayout(newBlocks);
  };

  const removeBlock = (index: number) => {
    const newBlocks = localBlocks.filter((_, i) => i !== index);
    saveLayout(newBlocks);
  };

  const moveBlock = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= localBlocks.length) return;
    const newBlocks = [...localBlocks];
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    saveLayout(newBlocks);
  };

  return (
    <div>
      <div className="mb-3">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
          Block ({localBlocks.length})
        </span>
      </div>

      {localBlocks.map((block, i) => (
        <BlockContentEditor
          key={block.id}
          pageSlug={pageSlug}
          block={block}
          onRemove={() => removeBlock(i)}
          onMoveUp={() => moveBlock(i, -1)}
          onMoveDown={() => moveBlock(i, 1)}
          isFirst={i === 0}
          isLast={i === localBlocks.length - 1}
        />
      ))}

      <div className="mt-3">
        <AddBlockMenu onAdd={addBlock} />
      </div>
    </div>
  );
};

// ─── Admin Sidebar ───────────────────────────────────────────────

// ─── Create Page Form ────────────────────────────────────────────

const CreatePageForm = ({ onCreated }: { onCreated: (slug: string) => void }) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const createPage = useCreatePage();
  const { data: pages } = usePages();

  const autoSlug = (t: string) =>
    t.toLowerCase().replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitleChange = (v: string) => {
    setTitle(v);
    setSlug(autoSlug(v));
  };

  const handleCreate = () => {
    if (!slug || !title) return;
    const order = (pages?.length || 0);
    createPage.mutate(
      { slug, title, menu_order: order },
      {
        onSuccess: () => {
          toast.success(`Sidan "${title}" skapad`);
          onCreated(slug);
          setTitle("");
          setSlug("");
        },
        onError: (err) => toast.error("Kunde inte skapa sida: " + err.message),
      }
    );
  };

  return (
    <div className="space-y-2">
      <div>
        <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Sidtitel</label>
        <input type="text" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Ny sida"
          className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink" />
      </div>
      <div>
        <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">URL-slug</label>
        <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="ny-sida"
          className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink" />
      </div>
      <button onClick={handleCreate} disabled={!slug || !title || createPage.isPending}
        className="flex items-center gap-2 bg-foreground text-background font-body text-[10px] font-semibold tracking-[0.15em] uppercase px-4 py-2 hover:bg-red-ink transition-colors disabled:opacity-50">
        <FilePlus size={12} />
        {createPage.isPending ? "Skapar..." : "Skapa sida"}
      </button>
    </div>
  );
};

// ─── Admin Sidebar ───────────────────────────────────────────────

const AdminSidebar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [showCreatePage, setShowCreatePage] = useState(false);
  const { data: pages } = usePages();
  const deletePage = useDeletePage();

  const pageList = pages || [];

  const handleDeletePage = (slug: string, title: string) => {
    if (!confirm(`Vill du verkligen ta bort sidan "${title}"? Allt innehåll på sidan försvinner.`)) return;
    deletePage.mutate(slug, {
      onSuccess: () => {
        toast.success(`Sidan "${title}" borttagen`);
        if (activePage === slug) setActivePage("home");
      },
      onError: (err) => toast.error("Kunde inte ta bort: " + err.message),
    });
  };

  if (!user) {
    return null;
  }

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-[60] bg-foreground text-background p-3 shadow-lg hover:bg-red-ink transition-colors" aria-label="Redigera">
          <Settings size={18} />
        </button>
      )}

      {open && <div className="fixed inset-0 bg-foreground/20 z-[70]" onClick={() => setOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-card border-l border-foreground z-[80] transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      } overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-[3px] border-double border-foreground">
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block">Redaktör</span>
              <h2 className="font-display text-2xl text-foreground mt-1">CMS</h2>
            </div>
            <button onClick={() => setOpen(false)} className="text-foreground hover:text-red-ink transition-colors">
              <X size={20} />
            </button>
          </div>

          {!user ? (
            <AdminLoginForm />
          ) : !isAdmin ? (
            <div className="space-y-4">
              <p className="font-body text-sm text-ink-mid">Du är inloggad men har inte admin-behörighet.</p>
              <button onClick={signOut} className="flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-red-ink transition-colors">
                <LogOut size={14} /> Logga ut
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-xs text-muted-foreground truncate">{user.email}</span>
                <button onClick={signOut} className="flex items-center gap-1 font-body text-[10px] text-muted-foreground hover:text-red-ink transition-colors">
                  <LogOut size={12} /> Logga ut
                </button>
              </div>

              {/* Media library button */}
              <button onClick={() => setShowMediaLibrary(true)}
                className="w-full flex items-center justify-center gap-2 mb-6 border border-border py-2.5 font-body text-[10px] font-semibold tracking-[0.1em] uppercase text-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-colors">
                <FolderOpen size={13} /> Mediabibliotek
              </button>

              {/* Page selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Välj sida</label>
                  <button onClick={() => setShowCreatePage(!showCreatePage)}
                    className="flex items-center gap-1 font-body text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                    <Plus size={12} /> Ny sida
                  </button>
                </div>

                {showCreatePage && (
                  <div className="mb-4 p-3 border border-border bg-background">
                    <CreatePageForm onCreated={(slug) => { setActivePage(slug); setShowCreatePage(false); }} />
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {pageList.map(({ slug, title }) => (
                    <div key={slug} className="flex items-center gap-0">
                      <button onClick={() => setActivePage(slug)}
                        className={`font-body text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 border-y border-l transition-colors ${
                          activePage === slug
                            ? "bg-foreground text-background border-foreground"
                            : "bg-transparent text-foreground border-border hover:border-foreground"
                        }`}>
                        {title}
                      </button>
                      {slug !== "home" && (
                        <button onClick={() => handleDeletePage(slug, title)}
                          className={`px-1.5 py-1.5 border-y border-r transition-colors ${
                            activePage === slug
                              ? "bg-foreground text-background border-foreground hover:bg-red-ink"
                              : "border-border text-muted-foreground hover:text-red-ink hover:border-red-ink"
                          }`} title="Ta bort sida">
                          <FileX size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Block layout manager */}
              <div className="rule-top pt-4">
                <BlockLayoutManager key={activePage} pageSlug={activePage} />
              </div>
            </div>
          )}
        </div>
      </div>

      {showMediaLibrary && (
        <MediaLibrary
          onSelect={(url) => { navigator.clipboard.writeText(url); toast.success("URL kopierad till urklipp"); }}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
