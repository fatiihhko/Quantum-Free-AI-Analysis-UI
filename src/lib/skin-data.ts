export interface CategoryData {
  key: string;
  label: string;
  score: number;
  icon: string;
}

export interface RegionData {
  key: string;
  score: number;
}

export interface AnalysisResult {
  overallScore: number;
  skinType: string;
  skinAge: number;
  categories: CategoryData[];
  regions: RegionData[];
}

export const categoryLabels: Record<string, string> = {
  pores: "Pores",
  blackheads: "Blackheads",
  acne: "Acne",
  wrinkles: "Wrinkles",
  undereye: "Under-Eye",
  hydration: "Hydration",
  sensitivity: "Sensitivity",
  pigmentation: "Pigmentation",
  roughness: "Roughness",
  oiliness: "Oiliness",
};

export const dummyResult: AnalysisResult = {
  overallScore: 78,
  skinType: "Combination",
  skinAge: 27,
  categories: [
    { key: "pores", label: "Pores", score: 72, icon: "⬡" },
    { key: "blackheads", label: "Blackheads", score: 85, icon: "◉" },
    { key: "acne", label: "Acne", score: 91, icon: "○" },
    { key: "wrinkles", label: "Wrinkles", score: 88, icon: "〰" },
    { key: "undereye", label: "Under-Eye", score: 64, icon: "◔" },
    { key: "hydration", label: "Hydration", score: 70, icon: "💧" },
    { key: "sensitivity", label: "Sensitivity", score: 82, icon: "◇" },
    { key: "pigmentation", label: "Pigmentation", score: 75, icon: "◐" },
    { key: "roughness", label: "Roughness", score: 80, icon: "▤" },
    { key: "oiliness", label: "Oiliness", score: 67, icon: "◎" },
  ],
  regions: [
    { key: "forehead", score: 74 },
    { key: "leftCheek", score: 80 },
    { key: "rightCheek", score: 78 },
    { key: "chin", score: 69 },
    { key: "eyeArea", score: 64 },
  ],
};

export function getScoreStatus(score: number): "excellent" | "good" | "low" | "attention" {
  if (score >= 90) return "excellent";
  if (score >= 70) return "good";
  if (score >= 50) return "low";
  return "attention";
}

export function getCondition(score: number): "conditionGood" | "conditionBalance" | "conditionCare" {
  if (score >= 80) return "conditionGood";
  if (score >= 60) return "conditionBalance";
  return "conditionCare";
}
