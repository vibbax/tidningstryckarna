import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Footer = () => {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error("Inloggning misslyckades: " + error.message);
    } else {
      toast.success("Inloggad!");
      setShowLogin(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="font-display text-2xl tracking-tight">TidningsTryckarna</span>
            <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-primary-foreground/40 mt-1">
              Tidningstryckarna på Åland AB
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] tracking-[0.15em] text-primary-foreground/30">
              © {new Date().getFullYear()} Alla rättigheter förbehållna.
            </p>
            {!user && !showLogin && (
              <button
                onClick={() => setShowLogin(true)}
                className="font-mono text-[9px] tracking-[0.15em] text-primary-foreground/20 hover:text-primary-foreground/50 transition-colors mt-1 underline underline-offset-2"
              >
                Logga in
              </button>
            )}
            {!user && showLogin && (
              <form onSubmit={handleLogin} className="mt-3 flex flex-col items-end gap-2">
                <input
                  type="email"
                  placeholder="E-post"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 text-primary-foreground text-xs px-3 py-1.5 w-52 border border-primary-foreground/20 focus:outline-none focus:border-primary-foreground/40"
                />
                <input
                  type="password"
                  placeholder="Lösenord"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-primary-foreground/10 text-primary-foreground text-xs px-3 py-1.5 w-52 border border-primary-foreground/20 focus:outline-none focus:border-primary-foreground/40"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setShowLogin(false); setEmail(""); setPassword(""); }}
                    className="font-mono text-[9px] tracking-[0.15em] text-primary-foreground/30 hover:text-primary-foreground/60 transition-colors"
                  >
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="font-mono text-[9px] tracking-[0.15em] text-primary-foreground/50 hover:text-primary-foreground transition-colors disabled:opacity-50"
                  >
                    {loading ? "..." : "Logga in →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;