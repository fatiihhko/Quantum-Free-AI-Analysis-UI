import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Lang, getTranslations } from "@/lib/translations";
import { dummyResult } from "@/lib/skin-data";
import LanguageSwitcher from "@/components/skin-analysis/LanguageSwitcher";
import StepWelcome from "@/components/skin-analysis/StepWelcome";
import StepProcessing from "@/components/skin-analysis/StepProcessing";
import StepResults from "@/components/skin-analysis/StepResults";
import StepReport from "@/components/skin-analysis/StepReport";
import qolLogo from "@/assets/qol-logo-blue.png";

type Step = "welcome" | "processing" | "results" | "report";

export default function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [step, setStep] = useState<Step>("welcome");
  const [photo, setPhoto] = useState<string>("");

  const t = getTranslations(lang);

  const handleStart = useCallback((p: string) => {
    setPhoto(p);
    setStep("processing");
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setStep("results");
  }, []);

  const handleRestart = useCallback(() => {
    setPhoto("");
    setStep("welcome");
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle ambient – beauty-tech */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <div className="w-10" /> {/* Spacer for centering */}
          <img
            src={qolLogo}
            alt="Quantum Orbit Labs"
            className="h-8 object-contain"
          />
          <LanguageSwitcher current={lang} onChange={setLang} />
        </div>
      </header>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === "welcome" && <StepWelcome key="welcome" t={t} onStart={handleStart} />}
        {step === "processing" && <StepProcessing key="processing" t={t} onComplete={handleProcessingComplete} />}
        {step === "results" && (
          <StepResults
            key="results"
            t={t}
            result={dummyResult}
            photo={photo}
            onContinue={() => setStep("report")}
          />
        )}
        {step === "report" && <StepReport key="report" t={t} onRestart={handleRestart} />}
      </AnimatePresence>
    </div>
  );
}
