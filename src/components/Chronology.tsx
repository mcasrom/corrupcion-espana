import { useState } from "react";
import { CorruptionCase } from "../types";
import { formatCurrency } from "../utils/calculators";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  ChevronDown,
  Calendar,
  Landmark,
  MapPin,
  AlertTriangle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  Layers,
  Target,
} from "lucide-react";

interface ChronologyProps {
  cases: CorruptionCase[];
  onCaseSelect: (caseItem: CorruptionCase) => void;
}

const DECADES = [
  { id: "transicion", label: "Transición", range: "1975-1989", start: 1975, end: 1989, color: "bg-blue-600", textColor: "text-blue-600", description: "Primeros escándalos democráticos. La democracia naciente lidia con la herencia del régimen anterior." },
  { id: "consolidacion", label: "Consolidación", range: "1990-1999", start: 1990, end: 1999, color: "bg-indigo-600", textColor: "text-indigo-600", description: "Años de crecimiento económico. Casos Roldán y Fondos Reservados sacuden la confianza institucional." },
  { id: "burbuja", label: "Burbuja", range: "2000-2009", start: 2000, end: 2009, color: "bg-red-700", textColor: "text-red-700", description: "El mayor pico de corrupción documentada. Casos Gürtel, Malaya, ERE, Palau, Nóos. Explotación masiva de la burbuja." },
  { id: "crisis", label: "Crisis", range: "2010-2019", start: 2010, end: 2019, color: "bg-orange-600", textColor: "text-orange-600", description: "Período de recortes y ajuste. Casos Púnica, Bárcenas, Kitchen, Rato. Primeras grandes condenas." },
  { id: "contemporanea", label: "Contemporánea", range: "2020-2026", start: 2020, end: 2026, color: "bg-emerald-600", textColor: "text-emerald-600", description: "Caso Koldo, Mediador, González Amador. Menor cuantía económica pero persistencia estructural de la corrupción." },
];

const PARTY_COLORS: Record<string, string> = {
  "PP": "bg-blue-600",
  "PSOE": "bg-red-600",
  "CiU": "bg-green-700",
  "CDC": "bg-teal-700",
  "PDeCAT": "bg-teal-600",
  "GIL": "bg-orange-500",
  "PSC": "bg-red-500",
  "UDC": "bg-green-600",
  "ERC": "bg-amber-500",
};

const STATUS_COLORS: Record<string, string> = {
  "Sentenciado": "bg-red-500",
  "En Juicio": "bg-amber-500",
  "Investigado": "bg-cyan-500",
  "Archivado": "bg-slate-400",
  "Sobreseído": "bg-slate-400",
  "Revisión TC": "bg-purple-500",
};

export function Chronology({ cases, onCaseSelect }: ChronologyProps) {
  const [selectedDecade, setSelectedDecade] = useState<string | null>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [showContemporary, setShowContemporary] = useState(true);

  const sorted = [...cases].sort((a, b) => a.year - b.year);

  // Compute per-decade stats
  const decadeStats = DECADES.map((d) => {
    const decadeCases = sorted.filter((c) => c.year >= d.start && c.year <= d.end);
    const totalCost = decadeCases.reduce((s, c) => s + c.amountEstimated, 0);
    const totalImplicated = decadeCases.reduce((s, c) => s + c.implicatedCount, 0);
    const parties = [...new Set(decadeCases.flatMap((c) => c.parties))];
    const ccaa = [...new Set(decadeCases.flatMap((c) => c.regions))];
    return { ...d, cases: decadeCases, totalCost, totalImplicated, parties, ccaa };
  });

  // Build year-by-year data
  const allYears = Array.from({ length: 52 }, (_, i) => 1975 + i);
  const yearData = allYears.map((year) => {
    const yearCases = sorted.filter((c) => c.year === year);
    return {
      year,
      count: yearCases.length,
      cost: yearCases.reduce((s, c) => s + c.amountEstimated, 0),
      cases: yearCases,
      parties: [...new Set(yearCases.flatMap((c) => c.parties))],
    };
  });

  const maxYearCost = Math.max(...yearData.map((y) => y.cost), 1);
  const maxYearCount = Math.max(...yearData.map((y) => y.count), 1);

  // Party total costs
  const allParties = ["PP", "PSOE", "CiU", "CDC", "PDeCAT", "GIL"];
  const partyTotals = allParties.map((p) => ({
    party: p,
    totalCost: sorted.filter((c) => c.parties.includes(p)).reduce((s, c) => s + c.amountEstimated, 0),
    totalCases: sorted.filter((c) => c.parties.includes(p)).length,
    totalImplicated: sorted.filter((c) => c.parties.includes(p)).reduce((s, c) => s + c.implicatedCount, 0),
  })).sort((a, b) => b.totalCost - a.totalCost);

  const maxPartyCost = Math.max(...partyTotals.map((p) => p.totalCost), 1);

  // Contemporary era cases
  const contemporaryCases = sorted.filter((c) => c.year >= 2019);

  // Max decade cost for bars
  const maxDecadeCost = Math.max(...decadeStats.map((d) => d.totalCost), 1);

  return (
    <div className="space-y-8">

      {/* Title Header */}
      <div className="editorial-card p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-violet-700" />
          <span className="editorial-badge bg-violet-700 text-white px-2.5 py-1">
            Cronología Histórica
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-slate-950 mt-2">
          Evolución de la Corrupción en España (1975-2026)
        </h2>
        <p className="text-slate-600 text-xs md:text-sm mt-1.5 max-w-3xl font-sans leading-relaxed">
          Análisis visual de la evolución de casos documentados, coste económico y actores políticos
          a lo medio siglo de democracia. Los datos reflejan exclusivamente causas judiciales y fuentes públicas verificadas.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <div className="bg-red-50 border border-red-200 px-4 py-3 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-red-700">Pico Histórico</span>
              <div className="text-sm font-serif font-bold text-red-800">2006-2010 · Burbuja Inmobiliaria</div>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-center gap-3">
            <TrendingDown className="h-5 w-5 text-emerald-600" />
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald-700">Tendencia Actual</span>
              <div className="text-sm font-serif font-bold text-emerald-800">↓ Menor cuantía · Mayor condena</div>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 px-4 py-3 flex items-center gap-3">
            <Landmark className="h-5 w-5 text-blue-600" />
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-blue-700">Total Documentado</span>
              <div className="text-sm font-serif font-bold text-blue-800">{cases.length} casos · {cases.reduce((s, c) => s + c.implicatedCount, 0)} implicados</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── INTENSITY CHART: Year-by-Year Bar Chart ─── */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-4 w-4 text-slate-700" />
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
            Intensidad de Corrupción por Año (1975-2026)
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 font-sans mb-5">
          Barras proporcionales al coste económico documentado. Color del partido dominante. Hover para detalles.
        </p>

        <div className="relative">
          {/* Decade markers */}
          <div className="flex border-b border-black/10 mb-1">
            {DECADES.map((d) => {
              const yearSpan = d.end - d.start + 1;
              const pct = (yearSpan / allYears.length) * 100;
              return (
                <div
                  key={d.id}
                  className="text-center py-1.5 border-r border-black/5 last:border-r-0"
                  style={{ width: `${pct}%` }}
                >
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-slate-500">
                    {d.label}
                  </span>
                  <span className="text-[8px] font-mono text-slate-400 block">{d.range}</span>
                </div>
              );
            })}
          </div>

          {/* Chart area */}
          <div className="relative h-48 flex items-end gap-px">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-b border-black/5 w-full" />
              ))}
            </div>

            {yearData.map((yd) => {
              const heightPct = yd.cost > 0
                ? Math.max(8, (yd.cost / maxYearCost) * 100)
                : yd.count > 0
                ? Math.max(4, (yd.count / maxYearCount) * 20)
                : 0;

              const mainParty = yd.parties[0] || "";
              const barColor = yd.cost > 0
                ? (PARTY_COLORS[mainParty] || "bg-slate-400")
                : yd.count > 0
                ? "bg-slate-300"
                : "";

              const isHovered = hoveredYear === yd.year;
              const inSelectedDecade = selectedDecade
                ? yd.year >= (DECADES.find((d) => d.id === selectedDecade)?.start || 0) &&
                  yd.year <= (DECADES.find((d) => d.id === selectedDecade)?.end || 9999)
                : true;

              return (
                <div
                  key={yd.year}
                  className="flex-1 relative group cursor-pointer"
                  onMouseEnter={() => setHoveredYear(yd.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                  onClick={() => { if (yd.cases.length > 0) onCaseSelect(yd.cases[0]); }}
                >
                  <div
                    className={`w-full transition-all duration-200 ${barColor} ${
                      isHovered ? "brightness-110 ring-1 ring-black/30" : ""
                    } ${!inSelectedDecade && selectedDecade ? "opacity-20" : "opacity-80"}`}
                    style={{ height: `${heightPct}%`, minHeight: yd.count > 0 ? "3px" : "0px" }}
                  />

                  {yd.year % 5 === 0 && (
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-mono text-slate-400">
                      {yd.year}
                    </span>
                  )}

                  <AnimatePresence>
                    {isHovered && yd.cases.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 bg-white border border-black/15 shadow-lg p-3 w-64 pointer-events-none"
                      >
                        <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500 mb-1">
                          {yd.year} · {yd.cases.length} caso{yd.cases.length > 1 ? "s" : ""}
                        </div>
                        {yd.cases.map((c) => (
                          <div key={c.id} className="mb-1.5 last:mb-0">
                            <div className="text-xs font-serif font-bold text-slate-950">{c.name}</div>
                            <div className="text-[10px] text-slate-500 font-sans">
                              {c.amountDisplay} · {c.parties.join(", ")} · {c.status}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-8 pt-4 border-t border-black/10">
          <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-slate-500 mr-2">Partidos:</span>
          {Object.entries(PARTY_COLORS).map(([party, color]) => (
            <div key={party} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 ${color}`} />
              <span className="text-[10px] font-sans text-slate-600">{party}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 ml-2">
            <div className="w-2.5 h-2.5 bg-slate-300" />
            <span className="text-[10px] font-sans text-slate-600">Sin datos económicos</span>
          </div>
        </div>
      </div>

      {/* ─── DECADE CARDS GRID ─── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {decadeStats.map((d, idx) => {
          const intensityPct = Math.max(10, (d.totalCost / maxDecadeCost) * 100);
          const isSelected = selectedDecade === d.id;

          let trend: "up" | "down" | "flat" = "flat";
          let trendLabel = "";
          if (idx > 0) {
            const prev = decadeStats[idx - 1];
            if (d.totalCost > prev.totalCost * 1.2) {
              trend = "up";
              trendLabel = `↑ ${((d.totalCost / prev.totalCost - 1) * 100).toFixed(0)}%`;
            } else if (d.totalCost < prev.totalCost * 0.8) {
              trend = "down";
              trendLabel = `↓ ${((1 - d.totalCost / prev.totalCost) * 100).toFixed(0)}%`;
            } else {
              trendLabel = "→ Estable";
            }
          }

          return (
            <motion.div
              key={d.id}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedDecade(isSelected ? null : d.id)}
              className={`editorial-card p-4 cursor-pointer transition-all ${isSelected ? "ring-2 ring-black/30" : ""}`}
            >
              <div className={`text-[9px] font-sans font-bold uppercase tracking-widest ${d.textColor} mb-1`}>
                {d.label}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mb-2">{d.range}</div>

              <div className="bg-slate-100 h-2 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${intensityPct}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className={`h-full ${d.color}`}
                />
              </div>

              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-xl font-serif font-bold text-slate-950">{d.cases.length}</div>
                  <div className="text-[9px] font-sans text-slate-500 uppercase">casos</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-slate-950">{formatCurrency(d.totalCost)}€</div>
                  <div className="text-[9px] font-sans text-slate-500">coste</div>
                </div>
              </div>

              {trendLabel && (
                <div className={`text-[9px] font-sans font-bold flex items-center gap-1 ${
                  trend === "up" ? "text-red-600" : trend === "down" ? "text-emerald-600" : "text-slate-500"
                }`}>
                  {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : trend === "down" ? <ArrowDownRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                  {trendLabel}
                </div>
              )}

              <div className="flex flex-wrap gap-1 mt-2">
                {d.parties.map((p) => (
                  <span key={p} className={`text-[8px] font-sans font-bold px-1.5 py-0.5 text-white ${PARTY_COLORS[p] || "bg-slate-500"}`}>
                    {p}
                  </span>
                ))}
              </div>

              <div className="mt-2 text-[9px] font-sans text-slate-400">
                <MapPin className="h-2.5 w-2.5 inline mr-0.5" />
                {d.ccaa.slice(0, 3).join(", ")}{d.ccaa.length > 3 && ` +${d.ccaa.length - 3}`}
              </div>

              <div className="mt-2 text-[9px] font-sans text-slate-400 italic">
                {isSelected ? "▼ Colapsar" : "▶ Ver detalles"}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── EXPANDED DECADE DETAIL ─── */}
      <AnimatePresence>
        {selectedDecade && (() => {
          const d = decadeStats.find((x) => x.id === selectedDecade);
          if (!d || d.cases.length === 0) return null;
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="editorial-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`editorial-badge text-white px-2.5 py-1 ${d.color}`}>
                    {d.label} · {d.range}
                  </span>
                  <span className="text-[10px] font-sans text-slate-500">
                    {d.cases.length} casos · {d.totalImplicated} implicados · {formatCurrency(d.totalCost)}€
                  </span>
                </div>
                <p className="text-xs font-sans text-slate-600 mb-5 leading-relaxed max-w-3xl">
                  {d.description}
                </p>

                <div className="space-y-2">
                  {d.cases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onCaseSelect(c)}
                      className="w-full text-left hover:bg-black/2 p-3 border border-black/5 transition-colors group flex items-center gap-4"
                    >
                      <div className="w-12 text-center shrink-0">
                        <div className="text-sm font-mono font-bold text-slate-950">{c.year}</div>
                      </div>
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${STATUS_COLORS[c.status] || "bg-slate-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-950 text-[13px] font-serif group-hover:underline">{c.name}</div>
                        <div className="text-[11px] text-slate-500 font-sans line-clamp-1">{c.description}</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex gap-1">
                          {c.parties.map((p) => (
                            <span key={p} className={`text-[8px] font-sans font-bold px-1.5 py-0.5 text-white ${PARTY_COLORS[p] || "bg-slate-500"}`}>
                              {p}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-mono font-bold text-slate-950 w-20 text-right">{c.amountDisplay}</span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-black transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-black/10 flex items-center gap-2 text-[10px] font-sans text-slate-500">
                  <MapPin className="h-3 w-3" />
                  <span className="font-bold uppercase tracking-wider">CCAA afectadas:</span>
                  {d.ccaa.join(" · ")}
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ─── PARTY COMPARISON: Horizontal Bars ─── */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="h-4 w-4 text-indigo-700" />
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
            Coste Documentado por Partido Político
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 font-sans mb-5">
          Coste total acumulado de casos en los que cada partido ha sido implicado. Un mismo caso puede involucrar a varios partidos.
        </p>

        <div className="space-y-4">
          {partyTotals.map((pt, idx) => {
            const pct = maxPartyCost > 0 ? (pt.totalCost / maxPartyCost) * 100 : 0;
            return (
              <div key={pt.party} className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-slate-800 flex items-center gap-2">
                    <div className={`w-3 h-3 ${PARTY_COLORS[pt.party]}`} />
                    <span className="font-mono tracking-wide">{pt.party}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{pt.totalCases} casos · {pt.totalImplicated} implicados</span>
                    <span className="font-mono text-slate-950 font-bold w-24 text-right">{formatCurrency(pt.totalCost)}€</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-4 overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, delay: idx * 0.1 }}
                    className={`h-full ${PARTY_COLORS[pt.party]}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── PARTY EVOLUTION TABLE ─── */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="h-4 w-4 text-amber-700" />
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
            Evolución por Partido y Década
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 font-sans mb-5">
          Número de casos y coste por partido en cada década. La casilla vacía indica ausencia de casos documentados.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/15 text-[9px] text-slate-600 uppercase tracking-widest font-sans font-extrabold">
                <th className="py-3 px-4">Partido</th>
                {DECADES.map((d) => (
                  <th key={d.id} className="py-3 px-4 text-center">{d.label}</th>
                ))}
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-xs font-sans">
              {allParties.map((party) => (
                <tr key={party} className="hover:bg-black/2">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${PARTY_COLORS[party]}`} />
                      <span className="font-bold text-slate-900 font-mono">{party}</span>
                    </div>
                  </td>
                  {DECADES.map((d) => {
                    const decadeCases = sorted.filter(
                      (c) => c.year >= d.start && c.year <= d.end && c.parties.includes(party)
                    );
                    const cost = decadeCases.reduce((s, c) => s + c.amountEstimated, 0);
                    return (
                      <td key={d.id} className="py-3 px-4 text-center">
                        {decadeCases.length > 0 ? (
                          <div>
                            <span className="font-bold text-slate-950">{decadeCases.length}</span>
                            <span className="text-[9px] text-slate-400 block">{formatCurrency(cost)}€</span>
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="py-3 px-4 text-right font-bold font-mono text-slate-950">
                    {sorted.filter((c) => c.parties.includes(party)).length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── CONTEMPORARY ERA FOCUS ─── */}
      <div className="editorial-card p-6 border-l-4 border-l-emerald-600">
        <button
          onClick={() => setShowContemporary(!showContemporary)}
          className="w-full flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2">
              <Clock className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="text-left">
              <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-950">
                Época Contemporánea (2019-2026) — Análisis Detallado
              </h3>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                {contemporaryCases.length} casos documentados · Foco en la actualidad política · Casos activos e investigaciones en curso
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: showContemporary ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-5 w-5 text-slate-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showContemporary && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-6 space-y-6">

                {/* Summary boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-4">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-emerald-700">Casos Totales</span>
                    <div className="text-3xl font-serif font-bold text-emerald-800 mt-1">{contemporaryCases.length}</div>
                    <span className="text-[10px] text-emerald-600 font-sans">Desde 2019 hasta la actualidad</span>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-blue-700">En Investigación / Juicio</span>
                    <div className="text-3xl font-serif font-bold text-blue-800 mt-1">
                      {contemporaryCases.filter((c) => c.status === "Investigado" || c.status === "En Juicio").length}
                    </div>
                    <span className="text-[10px] text-blue-600 font-sans">Causas abiertas activas</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-4">
                    <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-amber-700">Partidos Implicados</span>
                    <div className="flex gap-2 mt-2">
                      {[...new Set(contemporaryCases.flatMap((c) => c.parties))].map((p) => (
                        <span key={p} className={`text-[10px] font-sans font-bold px-2 py-1 text-white ${PARTY_COLORS[p] || "bg-slate-500"}`}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cases list */}
                <div className="space-y-2">
                  {contemporaryCases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onCaseSelect(c)}
                      className="w-full text-left hover:bg-black/2 p-4 border border-black/5 transition-colors group flex items-center gap-4"
                    >
                      <div className="w-14 text-center shrink-0">
                        <div className="text-lg font-mono font-bold text-slate-950">{c.year}</div>
                      </div>
                      <div className={`w-3 h-3 rounded-full shrink-0 ${STATUS_COLORS[c.status] || "bg-slate-400"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-slate-950 text-[14px] font-serif group-hover:underline">{c.name}</div>
                        <div className="text-[11px] text-slate-500 font-sans line-clamp-2 mt-0.5">{c.description}</div>
                        <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400 font-sans">
                          <span>{c.period}</span>
                          <span>·</span>
                          <span>{c.regions.join(", ")}</span>
                          <span>·</span>
                          <span>{c.implicatedCount} implicados</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex gap-1">
                          {c.parties.map((p) => (
                            <span key={p} className={`text-[9px] font-sans font-bold px-2 py-0.5 text-white ${PARTY_COLORS[p] || "bg-slate-500"}`}>
                              {p}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-mono font-bold text-slate-950">{c.amountDisplay}</span>
                        <span className={`text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 ${
                          c.status === "Investigado" ? "bg-cyan-100 text-cyan-800" :
                          c.status === "En Juicio" ? "bg-amber-100 text-amber-800" :
                          "bg-slate-100 text-slate-600"
                        }`}>
                          {c.status}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Commentary */}
                <div className="bg-[#FAF9F6] border border-black/10 p-5">
                  <div className="flex items-start gap-3">
                    <Eye className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-slate-700 mb-2">
                        Análisis — La Corrupción en la España Contemporánea
                      </h4>
                      <div className="text-[11px] font-sans text-slate-600 leading-relaxed space-y-2">
                        <p>
                          <strong>Patrón post-crisis:</strong> A diferencia de la burbuja inmobiliaria (2000-2009), la corrupción contemporánea
                          se caracteriza por casos de menor cuantía económica pero mayor velocidad de detección e investigación.
                          Los mecanismos de control institucional han mejorado significativamente.
                        </p>
                        <p>
                          <strong>Casos bisagra:</strong> Casos como Koldo (2024) y Mediador (2023) muestran que la corrupción persiste
                          independientemente del partido en el gobierno. Ambos casos afectan al PSOE en el gobierno actual,
                          mientras que los casos de la década anterior (Púnica, Kitchen, Lezo) afectaron al PP.
                        </p>
                        <p>
                          <strong>Velocidad judicial:</strong> El Caso Koldo pasó de investigación a expulsión del grupo parlamentario
                          en cuestión de semanas. La presión mediática y las comisiones de investigación parlamentarias
                          aceleran el ciclo de la corrupción política.
                        </p>
                        <p>
                          <strong>Dato relevante:</strong> La tendencia descendente del CPI de España (56→55 puntos en 2024-2025)
                          coincide con la proliferación de casos en esta época, aunque la puntuación refleja percepción
                          y no necesariamente la intensidad real de los casos documentados.
                        </p>
                        <p className="text-[10px] text-slate-400 italic">
                          Esta sección se actualizará conforme se documenten nuevos casos o se resuelvan investigaciones abiertas.
                          La solución permanece activa y en evolución.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── CCAA GEOGRAPHIC TIMELINE ─── */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-rose-700" />
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
            Impacto Geográfico por Comunidad Autónoma
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 font-sans mb-5">
          Número de casos y coste total por CCAA. El tamaño de la barra refleja el impacto económico acumulado.
        </p>

        <div className="space-y-3">
          {(() => {
            const ccaaMap = sorted.reduce((acc, c) => {
              c.regions.forEach((r) => {
                if (!acc[r]) acc[r] = { count: 0, cost: 0, cases: [] };
                acc[r].count++;
                acc[r].cost += c.amountEstimated;
                acc[r].cases.push(c);
              });
              return acc;
            }, {} as Record<string, { count: number; cost: number; cases: CorruptionCase[] }>);

            const ccaaList = Object.entries(ccaaMap).sort((a, b) => b[1].cost - a[1].cost);
            const maxCcaaCost = Math.max(...ccaaList.map(([, d]) => d.cost), 1);

            return ccaaList.map(([name, data], idx) => {
              const pct = (data.cost / maxCcaaCost) * 100;
              const decades = [...new Set(data.cases.map((c) => {
                const dec = DECADES.find((d) => c.year >= d.start && c.year <= d.end);
                return dec?.label || "";
              }))].filter(Boolean);

              return (
                <div key={name} className="space-y-1">
                  <div className="flex justify-between text-xs font-sans">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="text-slate-400 font-mono text-[10px] w-4">{idx + 1}.</span>
                      {name}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500">{data.count} casos</span>
                      <span className="font-mono text-slate-950 font-bold">{formatCurrency(data.cost)}€</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className={`h-full ${pct > 80 ? "bg-red-700" : pct > 50 ? "bg-orange-500" : pct > 20 ? "bg-yellow-500" : "bg-blue-500"}`}
                    />
                  </div>
                  <div className="text-[9px] text-slate-400 font-sans pl-5">
                    {decades.join(" · ")} · {data.cases.slice(0, 2).map((c) => c.name).join(", ")}
                    {data.cases.length > 2 && ` +${data.cases.length - 2}`}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
