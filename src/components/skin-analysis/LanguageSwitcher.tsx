import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { Lang, langLabels } from "@/lib/translations";

const langs: Lang[] = ["en", "de", "it", "ru", "tr"];

const langFlags: Record<Lang, string> = {
  en: "🇬🇧",
  de: "🇩🇪",
  it: "🇮🇹",
  ru: "🇷🇺",
  tr: "🇹🇷",
};

interface LanguageSwitcherProps {
  current: Lang;
  onChange: (lang: Lang) => void;
}

export default function LanguageSwitcher({ current, onChange }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 backdrop-blur-sm"
        aria-label="Change language"
      >
        <Globe size={16} className="opacity-70" />
        <span className="text-xs font-medium">{langLabels[current]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-elevated overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-200">
          {langs.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onChange(lang);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                current === lang
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <span className="text-base">{langFlags[lang]}</span>
              <span>{langLabels[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
