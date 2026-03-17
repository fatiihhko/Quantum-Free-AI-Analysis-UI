import { motion } from "framer-motion";
import { CategoryData } from "@/lib/skin-data";

interface RadarChartProps {
  categories: CategoryData[];
}

export default function RadarChart({ categories }: RadarChartProps) {
  const size = 300;
  const center = size / 2;
  const maxR = 112;
  const levels = 5;
  const count = categories.length;

  const angleStep = (2 * Math.PI) / count;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 100) * maxR;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const gridLevels = Array.from({ length: levels }, (_, i) => ((i + 1) / levels) * maxR);
  const dataPoints = categories.map((cat, i) => getPoint(i, cat.score));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  const axisEndPoints = categories.map((_, i) => getPoint(i, 100));

  const labelPoints = categories.map((_, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxR + 28;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  });

  return (
    <div className="flex justify-center" role="img" aria-label="Parameter overview chart">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="radarStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
          <filter id="radarDotGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="radarChartShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="hsl(var(--primary))" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Grid polygons – subtle, data-viz */}
        {gridLevels.map((r, li) => {
          const points = Array.from({ length: count }, (_, i) => {
            const angle = startAngle + i * angleStep;
            return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
          }).join(" ");
          return (
            <polygon
              key={li}
              points={points}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth={li === levels - 1 ? 1 : 0.35}
              opacity={li === levels - 1 ? 0.45 : 0.22}
            />
          );
        })}

        {/* Axis lines */}
        {axisEndPoints.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={p.x}
            y2={p.y}
            stroke="hsl(var(--border))"
            strokeWidth={0.35}
            opacity={0.22}
          />
        ))}

        {/* Data fill */}
        <motion.path
          d={dataPath}
          fill="url(#radarFill)"
          stroke="url(#radarStroke)"
          strokeWidth={1.8}
          filter="url(#radarChartShadow)"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Data points – refined: single small dot, no heavy glow */}
        {dataPoints.map((p, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.04, duration: 0.25 }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={3}
              fill="hsl(var(--background))"
              stroke="url(#radarStroke)"
              strokeWidth={1.5}
              filter="url(#radarDotGlow)"
            />
            <circle cx={p.x} cy={p.y} r={1.25} fill="hsl(var(--primary))" opacity={0.9} />
          </motion.g>
        ))}

        {/* Labels – refined typography */}
        {labelPoints.map((p, i) => {
          const cat = categories[i];
          return (
            <g key={i}>
              <text
                x={p.x}
                y={p.y - 5}
                textAnchor="middle"
                dominantBaseline="auto"
                className="fill-muted-foreground"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                }}
              >
                {cat.label}
              </text>
              <text
                x={p.x}
                y={p.y + 6}
                textAnchor="middle"
                dominantBaseline="auto"
                className="fill-foreground"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {cat.score}
              </text>
            </g>
          );
        })}

        <circle cx={center} cy={center} r={1.5} fill="hsl(var(--primary))" opacity={0.25} />
      </svg>
    </div>
  );
}
