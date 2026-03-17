import { motion } from "framer-motion";
import { Translations } from "@/lib/translations";
import { AnalysisResult, getCondition, getScoreStatus } from "@/lib/skin-data";
import ScoreBar from "./ScoreBar";
import RadarChart from "./RadarChart";
import CategoryCard from "./CategoryCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface StepResultsProps {
  t: Translations;
  result: AnalysisResult;
  photo: string;
  onContinue: () => void;
}

const regionBarColor = (score: number) => {
  const s = getScoreStatus(score);
  if (s === "excellent") return "bg-score-excellent";
  if (s === "good") return "bg-secondary";
  if (s === "low") return "bg-score-low";
  return "bg-score-attention";
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] as const } },
};

export default function StepResults({ t, result, photo, onContinue }: StepResultsProps) {
  const isMobile = useIsMobile();
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const condition = getCondition(result.overallScore);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -16 }}
      variants={stagger}
      className="px-4 pt-5 pb-12 max-w-lg mx-auto"
    >
      {/* Premium photo card – focal point */}
      <motion.div
        variants={fadeUp}
        className="mb-6 sm:mb-8"
      >
        <div className="bg-card rounded-2xl border border-border/60 shadow-photo-frame overflow-hidden">
          <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
            <div className="w-full sm:w-auto flex justify-center sm:block">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-border/50 shadow-elevated bg-muted/30 ring-1 ring-black/5">
                <img
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-foreground tracking-tight">
                {t.step3Title}
              </h2>
              <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 font-medium tabular-nums">
                {dateStr} · {timeStr}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-muted/80 text-muted-foreground font-medium">
                  {t.skinType}: {result.skinType}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-muted/80 text-muted-foreground font-medium">
                  {t.skinAge}: {result.skinAge}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-primary/12 text-primary font-semibold border border-primary/20">
                  {t[condition] as string}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overall score – editorial, strong focal */}
      <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-wider">
            {t.overallScore}
          </span>
          <span className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight tabular-nums">
            {result.overallScore}
            <span className="text-base sm:text-lg font-medium text-muted-foreground ml-0.5">/100</span>
          </span>
        </div>
        <ScoreBar score={result.overallScore} t={t} />
      </motion.div>

      {/* Summary – compact on mobile */}
      <motion.div
        variants={fadeUp}
        className="rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 bg-card border border-border/50 shadow-elevated"
      >
        <h3 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-2">
          {t.summaryTitle}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{t.summaryText}</p>
      </motion.div>

      {/* Parameter overview – always visible */}
      <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
        <div className="rounded-2xl p-5 sm:p-6 bg-card border border-border/50 shadow-elevated">
          <h3 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-4 text-center">
            {t.radarTitle}
          </h3>
          <RadarChart categories={result.categories} />
        </div>
      </motion.div>

      {/* Category cards – refined spacing */}
      <motion.div variants={fadeUp}>
        <h3 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">
          {t.categoryTitle}
        </h3>
        <div className={`grid gap-3 sm:gap-4 mb-6 sm:mb-8 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}>
          {result.categories.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.04, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <CategoryCard data={cat} t={t} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Regional analysis */}
      <motion.div variants={fadeUp}>
        <h3 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">
          {t.regionTitle}
        </h3>
        <div className="space-y-3 mb-6 sm:mb-8 p-4 sm:p-5 rounded-2xl bg-card border border-border/50 shadow-elevated">
          {result.regions.map((region, i) => (
            <motion.div
              key={region.key}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-medium text-foreground w-24 sm:w-28 flex-shrink-0">
                {t[region.key as keyof Translations] as string}
              </span>
              <div className="flex-1 h-2 rounded-full bg-muted/50 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${region.score}%` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                  className={`absolute h-full rounded-full ${regionBarColor(region.score)}`}
                />
              </div>
              <span className="text-xs font-semibold text-foreground w-7 text-right tabular-nums">
                {region.score}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Personalised Recommendations – emoji + improved UX */}
      <motion.div variants={fadeUp}>
        <h3 className="text-xs font-display font-semibold text-foreground uppercase tracking-wider mb-3">
          {t.recommendTitle}
        </h3>
        <div className="space-y-3 mb-8">
          {[
            { rec: t.recommend1, emoji: "👁️" },
            { rec: t.recommend2, emoji: "💧" },
            { rec: t.recommend3, emoji: "🧴" },
          ].map(({ rec, emoji }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.35 }}
              className="flex gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-elevated hover:shadow-card hover:border-border/70 transition-all duration-200"
            >
              <span
                className="w-11 h-11 rounded-xl bg-muted/80 flex items-center justify-center flex-shrink-0 text-xl border border-border/40"
                aria-hidden
              >
                {emoji}
              </span>
              <p className="flex-1 min-w-0 text-sm text-foreground/90 leading-relaxed pt-0.5">{rec}</p>
              <span className="text-[10px] font-bold text-muted-foreground/70 flex-shrink-0 pt-1" aria-hidden>
                {i + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.button
        variants={fadeUp}
        onClick={onContinue}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 rounded-xl font-display font-semibold text-sm text-primary-foreground btn-premium"
      >
        {t.ctaEmail}
      </motion.button>

    </motion.div>
  );
}
