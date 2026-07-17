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
