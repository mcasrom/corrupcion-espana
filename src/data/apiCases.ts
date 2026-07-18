import type { CorruptionCase, JudicialStatus } from "../types";

const STATUS_MAP: Record<string, JudicialStatus> = {
  "Sentencia firme": "Sentenciado",
  "Juicio oral": "En Juicio",
  "Investigación judicial": "Investigado",
  "Archivado": "Archivado",
  "Sobreseído": "Sobreseído",
};

interface RawCase {
  id: number;
  slug: string;
  name: string;
  year: number;
  period: string;
  description: string;
  parties: string[];
  amount_estimated: number;
  amount_display: string;
  regions: string[];
  status: string;
  key_figures: string[];
  consequences: string;
  sources: string[];
  corruption_types: string[];
  implicated_count: number;
  open_sources?: Array<{ title: string; entity: string; url?: string }>;
}

export async function fetchCases(): Promise<CorruptionCase[]> {
  const res = await fetch("/api/cases?limit=100");
  const data = await res.json();
  const rows: RawCase[] = data.cases || [];
  return rows.map((c) => ({
    id: String(c.id),
    slug: c.slug || String(c.id),
    name: c.name,
    year: c.year,
    period: c.period || String(c.year),
    description: c.description,
    parties: c.parties || [],
    amountEstimated: Number(c.amount_estimated) || 0,
    amountDisplay: c.amount_display || "",
    regions: c.regions || [],
    status: STATUS_MAP[c.status] || "Investigado",
    keyFigures: c.key_figures || [],
    consequences: c.consequences || "",
    sources: c.sources || [],
    corruptionTypes: (c.corruption_types || []) as CorruptionCase["corruptionTypes"],
    openSources: (c.open_sources || []).map((s: any) => ({ title: s.title, entity: s.entity, url: s.url })),
    implicatedCount: Number(c.implicated_count) || 0,
  }));
}
