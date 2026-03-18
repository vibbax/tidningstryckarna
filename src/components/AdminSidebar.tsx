import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePageContent, useUpdatePageContent } from "@/hooks/usePageContent";
import { Settings, X, LogOut, Save, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";

// Complete field schema matching all editable text on every page
const PAGE_SCHEMA: Record<string, { label: string; sections: { key: string; label: string; fields: { key: string; label: string; multiline?: boolean }[] }[] }> = {
  home: {
    label: "Startsida",
    sections: [
      {
        key: "hero",
        label: "Hero",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title_line1", label: "Rubrik rad 1" },
          { key: "title_line2", label: "Rubrik rad 2 (kursiv)" },
          { key: "title_line3", label: "Rubrik rad 3" },
          { key: "subtitle", label: "Underrubrik", multiline: true },
          { key: "cta", label: "Knapptext" },
          { key: "image_caption", label: "Bildtext" },
        ],
      },
      {
        key: "about",
        label: "Om tryckeriet",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
          { key: "stat1_number", label: "Statistik 1 siffra" },
          { key: "stat1_label", label: "Statistik 1 etikett" },
          { key: "stat2_number", label: "Statistik 2 siffra" },
          { key: "stat2_label", label: "Statistik 2 etikett" },
          { key: "text1", label: "Brödtext stycke 1", multiline: true },
          { key: "text2", label: "Brödtext stycke 2", multiline: true },
          { key: "image_caption", label: "Bildtext" },
        ],
      },
      {
        key: "services",
        label: "Tjänster",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
          { key: "intro", label: "Intro", multiline: true },
          { key: "service1_title", label: "Tjänst 1 titel" },
          { key: "service1_desc", label: "Tjänst 1 beskrivning", multiline: true },
          { key: "service2_title", label: "Tjänst 2 titel" },
          { key: "service2_desc", label: "Tjänst 2 beskrivning", multiline: true },
          { key: "service3_title", label: "Tjänst 3 titel" },
          { key: "service3_desc", label: "Tjänst 3 beskrivning", multiline: true },
        ],
      },
      {
        key: "environment",
        label: "Miljö",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
          { key: "text1", label: "Brödtext stycke 1", multiline: true },
          { key: "text2", label: "Brödtext stycke 2", multiline: true },
        ],
      },
      {
        key: "contact",
        label: "Kontakt",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
          { key: "intro", label: "Intro" },
          { key: "email", label: "E-post" },
          { key: "phone", label: "Telefon" },
          { key: "phone_note", label: "Telefon-anteckning" },
          { key: "address", label: "Besöksadress" },
        ],
      },
    ],
  },
  "om-oss": {
    label: "Om oss",
    sections: [
      {
        key: "header",
        label: "Sidhuvud",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
        ],
      },
      {
        key: "intro",
        label: "Intro",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "text1", label: "Brödtext stycke 1", multiline: true },
          { key: "text2", label: "Brödtext stycke 2", multiline: true },
        ],
      },
      {
        key: "equipment",
        label: "Utrustning",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "text", label: "Brödtext", multiline: true },
        ],
      },
    ],
  },
  prepress: {
    label: "Prepress",
    sections: [
      {
        key: "header",
        label: "Sidhuvud",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
        ],
      },
      {
        key: "intro",
        label: "Inlämning",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "text1", label: "Brödtext stycke 1", multiline: true },
          { key: "email_text", label: "E-posttext", multiline: true },
          { key: "text2", label: "Brödtext stycke 2", multiline: true },
          { key: "tip", label: "Tips", multiline: true },
        ],
      },
    ],
  },
  miljo: {
    label: "Miljö",
    sections: [
      {
        key: "header",
        label: "Sidhuvud",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
        ],
      },
      {
        key: "policy",
        label: "Vår policy",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "text1", label: "Brödtext stycke 1", multiline: true },
          { key: "text2", label: "Brödtext stycke 2", multiline: true },
        ],
      },
      {
        key: "reuse",
        label: "Återbruk",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "text1", label: "Brödtext stycke 1", multiline: true },
          { key: "text2", label: "Brödtext stycke 2", multiline: true },
        ],
      },
      {
        key: "free_rolls",
        label: "Gratisrullar",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "text", label: "Brödtext", multiline: true },
        ],
      },
      {
        key: "order",
        label: "Beställ papper",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "text", label: "Brödtext", multiline: true },
        ],
      },
      {
        key: "business",
        label: "Företag",
        fields: [
          { key: "text", label: "Brödtext", multiline: true },
          { key: "phone", label: "Telefon" },
        ],
      },
      {
        key: "pickup",
        label: "Avhämtning",
        fields: [
          { key: "text", label: "Brödtext", multiline: true },
        ],
      },
    ],
  },
  kontakt: {
    label: "Kontakt",
    sections: [
      {
        key: "header",
        label: "Sidhuvud",
        fields: [
          { key: "dateline", label: "Dateline" },
          { key: "title", label: "Rubrik" },
        ],
      },
      {
        key: "address",
        label: "Adress",
        fields: [
          { key: "visit_address", label: "Besöksadress" },
          { key: "company_name", label: "Företagsnamn" },
          { key: "postal_box", label: "Postbox" },
          { key: "postal_city", label: "Postort" },
          { key: "switchboard", label: "Växelnummer" },
        ],
      },
      {
        key: "bank",
        label: "Bank & FO-nummer",
        fields: [
          { key: "iban", label: "IBAN" },
          { key: "bic", label: "BIC" },
          { key: "fo_number", label: "FO-nummer" },
          { key: "vat", label: "VAT" },
        ],
      },
    ],
  },
};

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
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink"
          required
        />
      </div>
      <div>
        <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Lösenord</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink"
          required
        />
      </div>
      {error && <p className="font-body text-xs text-red-ink">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-foreground text-background font-body text-xs font-semibold tracking-[0.15em] uppercase py-3 hover:bg-red-ink transition-colors disabled:opacity-50"
      >
        {loading ? "Loggar in..." : "Logga in"}
      </button>
    </form>
  );
};

const SectionEditor = ({ pageSlug, sectionConfig }: {
  pageSlug: string;
  sectionConfig: { key: string; label: string; fields: { key: string; label: string; multiline?: boolean }[] };
}) => {
  const { data: content } = usePageContent(pageSlug);
  const mutation = useUpdatePageContent();
  const [expanded, setExpanded] = useState(false);
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  const [initialized, setInitialized] = useState(false);

  const sectionContent = content?.[sectionConfig.key] || {};

  if (content && !initialized) {
    const vals: Record<string, string> = {};
    sectionConfig.fields.forEach((f) => {
      vals[f.key] = (sectionContent[f.key] as string) || "";
    });
    setLocalValues(vals);
    setInitialized(true);
  }

  const handleSave = () => {
    mutation.mutate(
      { page_slug: pageSlug, section_key: sectionConfig.key, content: localValues },
      { onSuccess: () => toast.success(`"${sectionConfig.label}" sparad`) }
    );
  };

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between py-3 px-1 font-mono text-[10px] tracking-[0.15em] uppercase text-foreground hover:text-red-ink transition-colors"
      >
        {sectionConfig.label}
        {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
      {expanded && (
        <div className="pb-4 space-y-3">
          {sectionConfig.fields.map((field) => (
            <div key={field.key}>
              <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea
                  value={localValues[field.key] || ""}
                  onChange={(e) => setLocalValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  rows={4}
                  className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink resize-y"
                />
              ) : (
                <input
                  type="text"
                  value={localValues[field.key] || ""}
                  onChange={(e) => setLocalValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full bg-background border border-border px-3 py-2 font-body text-sm text-foreground focus:outline-none focus:border-red-ink"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="flex items-center gap-2 bg-foreground text-background font-body text-[10px] font-semibold tracking-[0.15em] uppercase px-4 py-2 hover:bg-red-ink transition-colors disabled:opacity-50"
          >
            <Save size={12} />
            {mutation.isPending ? "Sparar..." : "Spara"}
          </button>
        </div>
      )}
    </div>
  );
};

const AdminSidebar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  if (!user && !open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[60] bg-foreground text-background p-3 shadow-lg hover:bg-red-ink transition-colors"
        aria-label="Admin"
      >
        <Settings size={18} />
      </button>
    );
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-[60] bg-foreground text-background p-3 shadow-lg hover:bg-red-ink transition-colors"
          aria-label="Redigera"
        >
          <Settings size={18} />
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 bg-foreground/20 z-[70]"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-card border-l border-foreground z-[80] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b-[3px] border-double border-foreground">
            <div>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block">Redaktör</span>
              <h2 className="font-display text-2xl text-foreground mt-1">CMS</h2>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-foreground hover:text-red-ink transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {!user ? (
            <AdminLoginForm />
          ) : !isAdmin ? (
            <div className="space-y-4">
              <p className="font-body text-sm text-ink-mid">
                Du är inloggad men har inte admin-behörighet.
              </p>
              <button
                onClick={signOut}
                className="flex items-center gap-2 font-body text-xs text-muted-foreground hover:text-red-ink transition-colors"
              >
                <LogOut size={14} /> Logga ut
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-xs text-muted-foreground truncate">{user.email}</span>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1 font-body text-[10px] text-muted-foreground hover:text-red-ink transition-colors"
                >
                  <LogOut size={12} /> Logga ut
                </button>
              </div>

              <div className="mb-6">
                <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-2">Välj sida</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(PAGE_SCHEMA).map(([slug, page]) => (
                    <button
                      key={slug}
                      onClick={() => setActivePage(slug)}
                      className={`font-body text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors ${
                        activePage === slug
                          ? "bg-foreground text-background border-foreground"
                          : "bg-transparent text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {page.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rule-top pt-4">
                {PAGE_SCHEMA[activePage]?.sections.map((section) => (
                  <SectionEditor
                    key={`${activePage}-${section.key}`}
                    pageSlug={activePage}
                    sectionConfig={section}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
