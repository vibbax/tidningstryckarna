import { useState, useRef, useCallback, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePageContent, useUpdatePageContent } from "@/hooks/usePageContent";
import { usePageLayout, useUpdatePageLayout } from "@/hooks/usePageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings, X, LogOut, Save, ChevronDown, ChevronRight, Upload, Image,
  Trash2, Copy, FolderOpen, Plus, ArrowUp, ArrowDown, GripVertical,
} from "lucide-react";
import { toast } from "sonner";
import {
  BlockDef, BlockType, BLOCK_TYPE_META, DEFAULT_LAYOUTS, generateBlockId,
} from "@/components/blocks/blockTypes";

// ─── Field types ─────────────────────────────────────────────────
type FieldType = "text" | "multiline" | "image" | "link";

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
      { onSuccess: () => toast.success(`"${meta.label}" sparad`) }
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
                {fieldType === "image" ? (
                  <ImageField value={localValues[field.key] || ""} onChange={(v) => updateField(field.key, v)} />
                ) : fieldType === "link" ? (
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[9px] text-muted-foreground">🔗</span>
                    <input type="url" placeholder="https://..."
                      value={localValues[field.key] || ""} onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink" />
                  </div>
                ) : fieldType === "multiline" ? (
                  <textarea value={localValues[field.key] || ""} onChange={(e) => updateField(field.key, e.target.value)} rows={3}
                    className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink resize-y" />
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

const AdminSidebar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const pages = [
    { slug: "home", label: "Startsida" },
    { slug: "om-oss", label: "Om oss" },
    { slug: "prepress", label: "Prepress" },
    { slug: "miljo", label: "Miljö" },
    { slug: "kontakt", label: "Kontakt" },
  ];

  if (!user && !open) {
    return (
      <button onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[60] bg-foreground text-background p-3 shadow-lg hover:bg-red-ink transition-colors" aria-label="Admin">
        <Settings size={18} />
      </button>
    );
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
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Välj sida</label>
                <div className="flex flex-wrap gap-2">
                  {pages.map(({ slug, label }) => (
                    <button key={slug} onClick={() => setActivePage(slug)}
                      className={`font-body text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors ${
                        activePage === slug
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-foreground border-border hover:border-foreground"
                      }`}>
                      {label}
                    </button>
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
