import { motion } from "framer-motion";
import { Translations } from "@/lib/translations";

interface ScoreBarProps {
  score: number;
  t: Translations;
}

export default function ScoreBar({ score, t }: ScoreBarProps) {
  const pct = Math.min(100, Math.max(0, score));

  return (
    <div className="w-full">
      <div className="relative h-4 rounded-full gradient-score-bar overflow-visible">
        <motion.div
          initial={{ left: "0%", scale: 0 }}
          animate={{ left: `calc(${pct}% - 16px)`, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="absolute -top-1.5 w-8 h-8 rounded-full border-[3px] border-card bg-foreground flex items-center justify-center shadow-elevated"
          aria-hidden
        >
          <span className="text-[10px] font-display font-bold text-background tabular-nums">
            {score}
          </span>
        </motion.div>
      </div>
      <div className="flex justify-between mt-3 text-[10px] text-muted-foreground font-medium tracking-wide">
        <span>{t.scoreLow}</span>
        <span>{t.scoreMid}</span>
        <span>{t.scoreHigh}</span>
      </div>
    </div>
  );
}
