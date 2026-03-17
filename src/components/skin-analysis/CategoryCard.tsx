import { CategoryData, getScoreStatus } from "@/lib/skin-data";
import { Translations } from "@/lib/translations";

interface CategoryCardProps {
  data: CategoryData;
  t: Translations;
}

const statusColors = {
  excellent: "bg-primary/12 text-primary border-primary/20",
  good: "bg-muted text-foreground border-border/60",
  low: "bg-score-low/15 text-score-low border-score-low/25",
  attention: "bg-score-attention/15 text-score-attention border-score-attention/25",
};

const barColors = {
  excellent: "bg-score-excellent",
  good: "bg-secondary",
  low: "bg-score-low",
  attention: "bg-score-attention",
};

export default function CategoryCard({ data, t }: CategoryCardProps) {
  const status = getScoreStatus(data.score);
  const statusLabel = t[`status${status.charAt(0).toUpperCase() + status.slice(1)}` as keyof Translations] as string;
  const descKey = `cat${status.charAt(0).toUpperCase() + status.slice(1)}` as keyof Translations;
  const desc = t[descKey] as string;

  return (
    <div className="rounded-2xl p-5 border border-border/50 bg-card shadow-elevated transition-shadow hover:shadow-card">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-base opacity-80" aria-hidden>{data.icon}</span>
          <span className="text-sm font-display font-semibold text-foreground truncate">
            {data.label}
          </span>
        </div>
        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border shrink-0 ${statusColors[status]}`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-muted/50 mb-3">
        <div
          className={`absolute h-full rounded-full ${barColors[status]} transition-all duration-500`}
          style={{ width: `${data.score}%` }}
        />
        <div
          className="absolute -top-0.5 w-3 h-3 rounded-full border-2 border-card shadow-sm bg-foreground/90 transition-all duration-500"
          style={{ left: `calc(${data.score}% - 6px)` }}
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
