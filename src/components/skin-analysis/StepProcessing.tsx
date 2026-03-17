import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Scan, Brain, Sparkles } from "lucide-react";
import { Translations } from "@/lib/translations";

interface StepProcessingProps {
  t: Translations;
  onComplete: () => void;
}

const STEPS_KEYS: (keyof Translations)[] = ["step2a", "step2b", "step2c"];
const STEP_ICONS = [Scan, Brain, Sparkles];

export default function StepProcessing({ t, onComplete }: StepProcessingProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 4000;
    const stepDuration = totalDuration / 3;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min(100, (elapsed / totalDuration) * 100));
      setActiveStep(Math.min(2, Math.floor(elapsed / stepDuration)));
      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setTimeout(onComplete, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center px-4 pt-16 pb-10 max-w-md mx-auto text-center"
    >
      {/* Circular loader with glow */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-28 h-28 mb-10"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full animate-glow-pulse" />

        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background track */}
          <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" opacity="0.4" />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
            className="transition-all duration-100"
            filter="url(#glow)"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xl font-display font-bold text-foreground">
          {Math.round(progress)}%
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-xl font-display font-bold text-foreground mb-2"
      >
        {t.step2Title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-sm text-muted-foreground mb-10 leading-relaxed"
      >
        {t.step2Sub}
      </motion.p>

      <div className="space-y-4 w-full text-left">
        {STEPS_KEYS.map((key, i) => {
          const Icon = STEP_ICONS[i];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                i <= activeStep ? "glass glass-border shadow-card" : "opacity-50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  i < activeStep
                    ? "gradient-primary-soft shadow-glow"
                    : i === activeStep
                    ? "bg-primary/10 animate-pulse-dot"
                    : "bg-muted"
                }`}
              >
                {i < activeStep ? (
                  <Check size={14} className="text-primary-foreground" />
                ) : (
                  <Icon size={14} className={i === activeStep ? "text-primary" : "text-muted-foreground"} />
                )}
              </div>
              <span
                className={`text-sm transition-colors ${
                  i <= activeStep ? "text-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {t[key] as string}
              </span>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="text-[10px] text-muted-foreground mt-10 italic"
      >
        {t.step2Note}
      </motion.p>
    </motion.div>
  );
}
