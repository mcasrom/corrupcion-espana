import { CorruptionCase, GlobalKPIs } from "../types";

export function calculateKPIs(cases: CorruptionCase[]): GlobalKPIs {
  const totalCasos = cases.length;
  const totalDesviado = cases.reduce((sum, c) => sum + c.amountEstimated, 0);
  const casosSentenciados = cases.filter(c => c.status === "Sentenciado").length;
  const investigacionesActivas = cases.filter(
    c => c.status === "En Juicio" || c.status === "Investigado"
  ).length;
  const personasImplicadas = cases.reduce((sum, c) => sum + c.implicatedCount, 0);

  const sentenciadosRatio = casosSentenciados / totalCasos;
  const investigacionesRatio = investigacionesActivas / totalCasos;
  const integridadIndex = Math.round(
    (1 - (sentenciadosRatio * 0.6 + investigacionesRatio * 0.4)) * 100
  );

  return {
    totalDesviado,
    totalCasos,
    casosSentenciados,
    investigacionesActivas,
    personasImplicadas,
    integridadIndex
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(1)}K`;
  }
  return amount.toString();
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    "Sentenciado": "bg-red-500",
    "En Juicio": "bg-orange-500",
    "Investigado": "bg-yellow-500",
    "Archivado": "bg-gray-500",
    "Sobreseído": "bg-gray-400",
    "Revisión TC": "bg-purple-500"
  };
  return colors[status] || "bg-gray-400";
}

export function getStatusTextColor(status: string): string {
  const colors: Record<string, string> = {
    "Sentenciado": "text-red-400",
    "En Juicio": "text-orange-400",
    "Investigado": "text-yellow-400",
    "Archivado": "text-gray-400",
    "Sobreseído": "text-gray-300",
    "Revisión TC": "text-purple-400"
  };
  return colors[status] || "text-gray-400";
}

export function groupCasesByPeriod(cases: CorruptionCase[]) {
  return cases.reduce((acc, c) => {
    if (!acc[c.period]) acc[c.period] = [];
    acc[c.period].push(c);
    return acc;
  }, {} as Record<string, CorruptionCase[]>);
}

export function groupCasesByParty(cases: CorruptionCase[]) {
  return cases.reduce((acc, c) => {
    c.parties.forEach(p => {
      if (!acc[p]) acc[p] = [];
      acc[p].push(c);
    });
    return acc;
  }, {} as Record<string, CorruptionCase[]>);
}

export function filterCases(
  cases: CorruptionCase[],
  filters: {
    search?: string;
    party?: string;
    status?: string;
    yearFrom?: number;
    yearTo?: number;
  }
): CorruptionCase[] {
  return cases.filter(c => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const searchable = [
        c.name,
        c.description,
        c.period,
        ...c.parties,
        ...c.regions,
        ...c.keyFigures
      ].join(" ").toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (filters.party && !c.parties.includes(filters.party)) return false;
    if (filters.status && c.status !== filters.status) return false;
    if (filters.yearFrom && c.year < filters.yearFrom) return false;
    if (filters.yearTo && c.year > filters.yearTo) return false;
    return true;
  });
}

// ---- Derivaciones desde datos reales (backend vivo) ----

const REGION_TO_CCAA: Record<string, string> = {
  Andalucía: "Andalucía",
  "Málaga": "Andalucía",
  Sevilla: "Andalucía",
  Madrid: "Madrid",
  Cataluña: "Cataluña",
  Barcelona: "Cataluña",
  "Lleida": "Cataluña",
  Girona: "Cataluña",
  Valencia: "Comunidad Valenciana",
  "Comunidad Valenciana": "Comunidad Valenciana",
  Alicante: "Comunidad Valenciana",
  Baleares: "Baleares",
  "País Vasco": "País Vasco",
  Navarra: "Navarra",
  "Aragón": "Aragón",
  Zaragoza: "Aragón",
  Galicia: "Galicia",
  Asturias: "Asturias",
  Murcia: "Murcia",
  Castilla: "Castilla y León",
  "Castilla-La Mancha": "Castilla-La Mancha",
  Canarias: "Canarias",
  Nacional: "Ámbito Nacional",
};

export interface CCAAStat {
  name: string;
  count: number;
  amount: number;
  sentenciados: number;
  riskLevel: "Alto" | "Moderado" | "Bajo";
}

export function groupByCCAA(cases: CorruptionCase[]): CCAAStat[] {
  const acc: Record<string, CCAAStat> = {};
  for (const c of cases) {
    const ccaas = (c.regions && c.regions.length ? c.regions : ["Nacional"]).map(
      (r) => REGION_TO_CCAA[r] || r
    );
    const uniq = Array.from(new Set(ccaas));
    for (const name of uniq) {
      if (!acc[name]) acc[name] = { name, count: 0, amount: 0, sentenciados: 0, riskLevel: "Bajo" };
      acc[name].count += 1;
      acc[name].amount += c.amountEstimated || 0;
      if (c.status === "Sentenciado") acc[name].sentenciados += 1;
    }
  }
  const list = Object.values(acc);
  for (const s of list) {
    if (s.count >= 8 || s.amount >= 5e9) s.riskLevel = "Alto";
    else if (s.count >= 3 || s.amount >= 5e8) s.riskLevel = "Moderado";
    else s.riskLevel = "Bajo";
  }
  return list.sort((a, b) => b.amount - a.amount);
}

export interface TimelineStat {
  period: string;
  cases: number;
  cost: number;
  highlight: string;
}

const PERIODS: { label: string; from: number; to: number }[] = [
  { label: "1975-1989", from: 1975, to: 1989 },
  { label: "1990-1999", from: 1990, to: 1999 },
  { label: "2000-2009", from: 2000, to: 2009 },
  { label: "2010-2019", from: 2010, to: 2019 },
  { label: "2020-2026", from: 2020, to: 2026 },
];

export function groupByPeriodTimeline(cases: CorruptionCase[]): TimelineStat[] {
  return PERIODS.map((p) => {
    const inPeriod = cases.filter((c) => c.year >= p.from && c.year <= p.to);
    return {
      period: p.label,
      cases: inPeriod.length,
      cost: inPeriod.reduce((s, c) => s + (c.amountEstimated || 0), 0),
      highlight: inPeriod.length
        ? "Destacan: " + inPeriod.slice(0, 2).map((c) => c.name).join(" · ")
        : "Sin casos documentados en este periodo.",
    };
  });
}
