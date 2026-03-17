import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, FileText, Globe, RotateCcw, Mail, Send } from "lucide-react";
import { Translations } from "@/lib/translations";

interface StepReportProps {
  t: Translations;
  onRestart: () => void;
}

export default function StepReport({ t, onRestart }: StepReportProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const canSubmit = name.trim() && email.trim() && email.includes("@") && consent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-border/60 bg-card text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all duration-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="px-4 pt-8 pb-10 max-w-md mx-auto"
    >
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-center mb-8"
            >
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3">
                <Mail size={22} className="text-primary-foreground" />
              </div>
              <h2 className="text-lg font-display font-semibold text-foreground tracking-tight mb-1.5">{t.step4FormTitle}</h2>
              <p className="text-sm text-muted-foreground">{t.step4FormSub}</p>
            </motion.div>

            <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-card border border-border/50 shadow-elevated">
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">{t.fieldName} *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">{t.fieldCompany}</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClasses}
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">{t.fieldEmail} *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">{t.fieldPhone}</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClasses}
                  maxLength={20}
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-border text-primary focus:ring-primary/20 accent-primary"
                />
                <span className="text-xs text-muted-foreground leading-relaxed">{t.consent}</span>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={!canSubmit}
              whileHover={canSubmit ? { scale: 1.01 } : {}}
              whileTap={canSubmit ? { scale: 0.98 } : {}}
              className="w-full mt-6 py-3.5 rounded-xl font-display font-semibold text-sm text-primary-foreground btn-premium disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
            >
              <Send size={16} />
              {t.ctaSend}
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full gradient-primary-soft shadow-glow flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={40} className="text-primary-foreground" />
            </motion.div>
            <h2 className="text-xl font-display font-bold text-foreground mb-2">{t.step4SuccessTitle}</h2>
            <p className="text-sm text-muted-foreground mb-8">{t.step4SuccessSub}</p>

            <div className="space-y-3">
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="w-full py-3 rounded-xl border border-border/60 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-2 bg-card"
              >
                <Globe size={16} /> {t.viewOnline}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="w-full py-3 rounded-xl border border-border/60 text-sm font-medium text-foreground hover:bg-muted/30 transition-colors flex items-center justify-center gap-2 bg-card"
              >
                <FileText size={16} /> {t.downloadPdf}
              </motion.button>
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                onClick={onRestart}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl text-primary-foreground text-sm font-semibold btn-premium flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> {t.newAnalysis}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
