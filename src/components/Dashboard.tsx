import { useState } from "react";
import { CorruptionCase } from "../types";
import { ImpactPanel } from "./ImpactPanel";
import { calculateKPIs, formatCurrency, getStatusColor, getStatusTextColor, groupCasesByParty, groupByCCAA, groupByPeriodTimeline } from "../utils/calculators";
import {
  CPI_2024,
  CPI_2025,
  WORLD_RANKINGS_2024,
  CCAA_DATA,
  TIMELINE_DATA,
  PARTY_FULL_NAMES,
  STATUS_COLORS,
  RISK_COLORS,
  DATA_SOURCES,
  CIS_JULY_2026,
  CIS_PROBLEMS_NACIONALES,
  CONSEJO_TRANSPARENCIA,
} from "../data/indices";
import { motion, AnimatePresence } from "motion/react";
import {
  DollarSign,
  Users,
  Scale,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Globe,
  MapPin,
  Calendar,
  ChevronRight,
  Search,
  Filter,
  Info,
  BookOpen,
  Landmark,
  ShieldAlert,
  Eye,
  BarChart3,
} from "lucide-react";

interface DashboardProps {
  cases: CorruptionCase[];
  onCaseSelect: (caseItem: CorruptionCase) => void;
}

export function Dashboard({ cases, onCaseSelect }: DashboardProps) {
  const kpis = calculateKPIs(cases);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState("TODOS");
  const [selectedStatus, setSelectedStatus] = useState("TODOS");
  const [selectedCCAA, setSelectedCCAA] = useState("TODOS");
  const [selectedPeriod, setSelectedPeriod] = useState("TODOS");

  const allParties = ["TODOS", ...Array.from(new Set(cases.flatMap((c) => c.parties)))];
  const allStatuses = ["TODOS", ...Array.from(new Set(cases.map((c) => c.status)))];
  const allCCAA = ["TODOS", ...Array.from(new Set(cases.flatMap((c) => c.regions)))].sort();
  const allPeriods = ["TODOS", ...Array.from(new Set(cases.map((c) => c.period)))].sort();

  const filteredCases = cases.filter((c) => {
    if (selectedParty !== "TODOS" && !c.parties.includes(selectedParty)) return false;
    if (selectedStatus !== "TODOS" && c.status !== selectedStatus) return false;
    if (selectedCCAA !== "TODOS" && !c.regions.includes(selectedCCAA)) return false;
    if (selectedPeriod !== "TODOS" && c.period !== selectedPeriod) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const searchable = [c.name, c.description, ...c.parties, ...c.regions, ...c.keyFigures].join(" ").toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    return true;
  });

  const partyBreakdown = Object.entries(
    cases.reduce((acc, c) => {
      c.parties.forEach((p) => {
        if (!acc[p]) acc[p] = { count: 0, amount: 0 };
        acc[p].count++;
        acc[p].amount += c.amountEstimated / c.parties.length;
      });
      return acc;
    }, {} as Record<string, { count: number; amount: number }>)
  ).sort((a, b) => b[1].amount - a[1].amount);

  const maxPartyAmount = Math.max(...partyBreakdown.map(([, d]) => d.amount));

  const ccaaSorted = groupByCCAA(cases);
  const maxCCaacCost = Math.max(...ccaaSorted.map((x) => x.amount));

  const cpiPct = (CPI_2024.cpiScore / 100) * 100;
  const timelineData = groupByPeriodTimeline(cases);
  const maxTimelineCost = Math.max(...timelineData.map((d) => d.cost));

  return (
    <div className="space-y-8" id="dashboard-root">

      {/* Editorial Overview Header */}
      <div className="editorial-card p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="editorial-badge bg-red-700 text-white px-2.5 py-1 inline-block">
            SME Análisis Político y Fiscal
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-slate-950 mt-3">
            Indicadores Clave y Tablero Analítico
          </h2>
          <p className="text-slate-600 text-xs md:text-sm mt-1.5 max-w-xl font-sans leading-relaxed">
            Estudio agregativo y sistémico de los desvíos patrimoniales y causas judiciales en la España democrática.
            Datos consolidados de fiscalía y portales de transparencia.
          </p>
        </div>
        <div className="flex flex-col text-left md:text-right bg-black/5 border border-black/15 p-4 w-full md:w-auto shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/60 font-sans font-bold">
            Pérdida Estimada por Ineficiencia
          </span>
          <span className="text-2xl font-mono font-bold text-red-700 mt-1">€40.000-48.000M / año</span>
          <span className="text-[9px] text-slate-500 max-w-xs mt-0.5 leading-normal font-sans">
            Dato estimado CNMC (Comisión Nacional de Mercados y Competencia)
          </span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Coste Fiscal */}
        <motion.div
          whileHover={{ y: -2 }}
          className="editorial-card p-6 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">
                Coste Fiscal Directo
              </span>
              <span className="text-4xl font-serif font-light leading-none italic text-slate-950 mt-3 block">
                {formatCurrency(kpis.totalDesviado)}€
              </span>
              <span className="text-xs text-slate-400 mt-1 block font-sans">Euros estimados en sumarios</span>
            </div>
            <div className="bg-red-50 p-2.5 border border-red-200 text-red-700">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 bg-slate-100 h-1 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${cpiPct}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-red-700 h-full"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-sans">
            Total documentado en {cases.length} expedientes.
          </p>
        </motion.div>

        {/* Casos */}
        <motion.div
          whileHover={{ y: -2 }}
          className="editorial-card p-6 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">
                Casos Documentados
              </span>
              <span className="text-4xl font-serif font-light leading-none text-slate-950 mt-3 block">
                {kpis.totalCasos}
              </span>
              <span className="text-xs text-slate-400 mt-1 block font-sans">Expedientes analizados</span>
            </div>
            <div className="bg-orange-50 p-2.5 border border-orange-200 text-orange-700">
              <Scale className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 bg-slate-100 h-1 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(kpis.casosSentenciados / kpis.totalCasos) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-orange-600 h-full"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-sans">
            {kpis.casosSentenciados} sentenciados · {kpis.investigacionesActivas} en curso.
          </p>
        </motion.div>

        {/* Implicados */}
        <motion.div
          whileHover={{ y: -2 }}
          className="editorial-card p-6 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">
                Personas Implicadas
              </span>
              <span className="text-4xl font-serif font-light leading-none text-slate-950 mt-3 block">
                {kpis.personasImplicadas}
              </span>
              <span className="text-xs text-slate-400 mt-1 block font-sans">Encausados e investigados</span>
            </div>
            <div className="bg-yellow-50 p-2.5 border border-yellow-200 text-yellow-700">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 bg-slate-100 h-1 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (kpis.personasImplicadas / 500) * 100)}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-yellow-500 h-full"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-sans">
            Media de {Math.round(kpis.personasImplicadas / kpis.totalCasos)} por caso.
          </p>
        </motion.div>

        {/* Integridad */}
        <motion.div
          whileHover={{ y: -2 }}
          className="editorial-card p-6 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">
                Índice de Integridad
              </span>
              <span className="text-4xl font-serif font-light leading-none text-slate-950 mt-3 block">
                {kpis.integridadIndex}<span className="text-lg">/100</span>
              </span>
              <span className="text-xs text-slate-400 mt-1 block font-sans">Basado en sentencias vs. investigación</span>
            </div>
            <div className="bg-green-50 p-2.5 border border-green-200 text-green-700">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-4 bg-slate-100 h-1 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${kpis.integridadIndex}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-green-600 h-full"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-sans">
            Mayor puntuación = más impunidad.
          </p>
        </motion.div>
      </div>

      {/* Impacto en el Poder */}
      <ImpactPanel />

      {/* CIS Barómetro Panel */}
      <div className="editorial-card overflow-hidden">
        <div className="p-6 border-b border-black/15 bg-[#FAF9F6]">
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-indigo-700" />
            <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
              CIS Barómetro de Opinión — Julio 2026
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-sans">
            Centro de Investigaciones Sociológicas · Estudio {CIS_JULY_2026.studyId} · N={CIS_JULY_2026.sampleSize.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left: Corruption headline card */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-black/10">
            <div className="bg-red-50 border border-red-200 p-5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-sans font-extrabold uppercase tracking-widest text-red-700">
                  La corrupción en el CIS
                </span>
                <div className="flex items-end gap-3 mt-3">
                  <span className="text-5xl font-serif font-bold text-red-700 leading-none">4º</span>
                  <div className="pb-1">
                    <span className="text-[11px] font-sans text-slate-600 block">problema del país</span>
                    <span className="text-2xl font-mono font-bold text-slate-950">{CIS_JULY_2026.corruptionPercent}%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-sans">
                  <span className="inline-flex items-center gap-1 bg-red-700 text-white px-2 py-0.5 font-bold">
                    <TrendingUp className="h-3 w-3" />
                    {CIS_JULY_2026.corruptionJump}
                  </span>
                  <span className="text-slate-600">desde mayo ({CIS_JULY_2026.corruptionPrevious}%, 10º puesto)</span>
                </div>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Subida tras la imputación de Zapatero (caso Plus Ultra) y la reactivación de Leire Díez
                  ("fontanera del PSOE"). Pico reciente: 25,3% en julio 2025 (2º problema, tras encarcelación de Santos Cerdán).
                </p>
              </div>
            </div>
          </div>

          {/* Center: Top 11 problems as bars */}
          <div className="p-6 border-b lg:border-b-0 lg:border-r border-black/10">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-slate-500 block mb-3">
              Principales problemas del país
            </span>
            <div className="space-y-2">
              {CIS_PROBLEMS_NACIONALES.map((prob, idx) => {
                const isCorruption = prob.name === "La corrupción y el fraude";
                const pct = prob.mainProblem;
                return (
                  <div key={prob.name} className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono w-5 text-right ${isCorruption ? "font-extrabold text-red-700" : "text-slate-400"}`}>
                      {idx + 1}.
                    </span>
                    <span className={`text-[11px] font-sans w-44 truncate ${isCorruption ? "font-extrabold text-red-700" : "text-slate-700"}`}>
                      {prob.name}
                    </span>
                    <div className="flex-1 bg-slate-100 h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(pct / 50) * 100}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.04 }}
                        className={`h-full ${isCorruption ? "bg-red-700" : "bg-indigo-400"}`}
                      />
                    </div>
                    <span className={`text-[11px] font-mono w-10 text-right ${isCorruption ? "font-extrabold text-red-700" : "text-slate-600"}`}>
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Personal concern vs National problem comparison */}
          <div className="p-6">
            <span className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-slate-500 block mb-3">
              País vs. Personal — La paradoja
            </span>
            <p className="text-[10px] text-slate-500 font-sans mb-4 leading-relaxed">
              Los ciudadanos ven la corrupción como un <strong className="text-slate-700">grave problema del país</strong> (4º),
              pero <strong className="text-slate-700">no les afecta directamente</strong> (11º). Es percibida como sistémica, no personal.
            </p>
            <div className="space-y-3">
              {CIS_PROBLEMS_NACIONALES.slice(0, 8).map((prob, idx) => {
                const isCorruption = prob.name === "La corrupción y el fraude";
                const diff = prob.mainProblem - prob.personalConcern;
                return (
                  <div key={prob.name} className={`p-2.5 border ${isCorruption ? "border-red-300 bg-red-50" : "border-black/10 bg-white"}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className={`text-[10px] font-sans truncate ${isCorruption ? "font-extrabold text-red-700" : "font-bold text-slate-800"}`}>
                        {prob.name}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-[9px] font-sans text-slate-500 mb-0.5">
                          <span>País</span>
                          <span className="font-mono">{prob.mainProblem}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
                          <div className={`h-full ${isCorruption ? "bg-red-700" : "bg-indigo-400"}`} style={{ width: `${(prob.mainProblem / 50) * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between text-[9px] font-sans text-slate-500 mb-0.5">
                          <span>Personal</span>
                          <span className="font-mono">{prob.personalConcern}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 overflow-hidden">
                          <div className={`h-full ${isCorruption ? "bg-red-300" : "bg-slate-300"}`} style={{ width: `${(prob.personalConcern / 50) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                    {isCorruption && (
                      <div className="mt-1.5 text-[9px] font-sans text-red-600 font-bold">
                        Brecha: {diff > 0 ? "+" : ""}{diff.toFixed(1)}pp — Se percibe 2.7× más como problema nacional que personal
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 p-4 bg-[#FAF9F6] flex flex-col sm:flex-row justify-between text-[10px] text-slate-500 font-sans uppercase tracking-wider gap-2">
          <span>Fuente: CIS Barómetro de Opinión, Julio 2026 (Estudio 3571)</span>
          <span>Datos publicados 15/07/2026 · N=4.020</span>
        </div>
      </div>

      {/* Two-Column: European CPI + Spain Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* European CPI Panel */}
        <div className="editorial-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-blue-700" />
            <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
              Índice de Percepción de la Corrupción (CPI) — Europa 2024
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-sans mb-4">
            Transparency International. Escala 0-100 (0 = altamente corrupto, 100 = muy limpio).
            <strong className="text-slate-700"> España: {CPI_2024.cpiScore}/100</strong> — Puesto {CPI_2024.euRank}º en la UE-27, {CPI_2024.cpiRank}º mundial.
          </p>

          {/* Mini bar chart for top EU countries + Spain */}
          <div className="space-y-2">
            {CPI_2024.memberStates
              .sort((a, b) => b.score - a.score)
              .slice(0, 15)
              .map((country, idx) => {
                const isSpain = country.country === "España";
                return (
                  <div key={country.country} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 w-4 text-right">{idx + 1}.</span>
                    <span className={`text-[11px] font-sans w-28 truncate ${isSpain ? "font-extrabold text-red-700" : "text-slate-700"}`}>
                      {country.country}
                    </span>
                    <div className="flex-1 bg-slate-100 h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${country.score}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.03 }}
                        className={`h-full ${isSpain ? "bg-red-700" : country.score >= 70 ? "bg-blue-600" : country.score >= 60 ? "bg-blue-400" : "bg-slate-400"}`}
                      />
                    </div>
                    <span className={`text-[11px] font-mono w-8 text-right ${isSpain ? "font-extrabold text-red-700" : "text-slate-600"}`}>
                      {country.score}
                    </span>
                  </div>
                );
              })}
          </div>
          <div className="border-t border-black/10 pt-3 mt-4 flex justify-between text-[10px] text-slate-500 font-sans uppercase tracking-wider">
            <span>*Media UE: {CPI_2024.euAverage}/100</span>
            <span>{CPI_2024.memberStates.length} estados</span>
          </div>
        </div>

        {/* World Ranking Panel */}
        <div className="editorial-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-emerald-700" />
            <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
              Ranking Mundial CPI 2024 — Posición de España
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 font-sans mb-4">
            España ocupa el <strong className="text-red-700">puesto {CPI_2024.cpiRank}º</strong> a nivel mundial (de 180 países).
            En la UE: puesto {CPI_2024.euRank}º (de 27). Por debajo de la media europea ({CPI_2024.euAverage}).
          </p>

          {/* Spain highlight card */}
          <div className="bg-red-50 border border-red-200 p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-red-700">España</span>
                <div className="text-3xl font-serif font-bold text-red-700 mt-1">{CPI_2024.cpiScore}<span className="text-sm">/100</span></div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500">Puesto Mundial</span>
                <div className="text-3xl font-mono font-bold text-slate-950 mt-1">#{CPI_2024.cpiRank}</div>
              </div>
            </div>
          </div>

          {/* World top countries mini bars */}
          <div className="space-y-1.5">
            {WORLD_RANKINGS_2024.slice(0, 12).map((w, idx) => {
              const isSpain = w.country === "España";
              return (
                <div key={w.country} className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-500 w-5 text-right">{w.rank}.</span>
                  <span className={`text-[11px] font-sans w-24 truncate ${isSpain ? "font-extrabold text-red-700" : "text-slate-700"}`}>
                    {w.country}
                  </span>
                  <div className="flex-1 bg-slate-100 h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${w.score}%` }}
                      transition={{ duration: 0.5, delay: idx * 0.03 }}
                      className={`h-full ${isSpain ? "bg-red-700" : w.region === "Europa" ? "bg-blue-500" : w.region === "Américas" ? "bg-emerald-500" : "bg-amber-500"}`}
                    />
                  </div>
                  <span className={`text-[10px] font-mono w-14 text-right ${isSpain ? "font-extrabold text-red-700" : "text-slate-500"}`}>
                    {w.score} · {w.region}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-black/10 pt-3 mt-4 text-[10px] text-slate-500 font-sans uppercase tracking-wider">
            <span>Fuente: Transparency International CPI 2024</span>
          </div>
        </div>
      </div>

      {/* Party Breakdown with bars */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Landmark className="h-4 w-4 text-indigo-700" />
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
            Desglose por Partido Político
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 font-sans mb-5">
          Coste estimado y número de casos por formación política. Los datos reflejan la documentación judicial disponible.
        </p>

        <div className="space-y-4">
          {partyBreakdown.map(([party, data], idx) => {
            const pct = maxPartyAmount > 0 ? (data.amount / maxPartyAmount) * 100 : 0;
            const colorMap: Record<string, string> = {
              "PP": "bg-blue-600",
              "PSOE": "bg-red-600",
              "CiU": "bg-green-700",
              "CDC": "bg-teal-700",
              "PDeCAT": "bg-teal-600",
              "GIL": "bg-orange-500",
            };
            return (
              <div key={party} className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="text-slate-400 font-mono text-[10px] w-4">{idx + 1}.</span>
                    <span className="font-mono tracking-wide">{party}</span>
                    <span className="text-slate-400 font-normal text-[10px]">
                      ({PARTY_FULL_NAMES[party] || party})
                    </span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-sans">{data.count} casos</span>
                    <span className="font-mono text-slate-950 font-bold">{formatCurrency(data.amount)}€</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.08 }}
                    className={`h-full ${colorMap[party] || "bg-slate-500"}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-black/10 pt-3 flex justify-between text-[10px] text-slate-500 font-sans uppercase tracking-wider">
          <span>*Casos multipartido: importe dividido a partes iguales entre formaciones implicadas</span>
          <span>{partyBreakdown.length} formaciones</span>
        </div>
      </div>

      {/* CCAA Breakdown with risk levels */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4 text-rose-700" />
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
            Distribución por Comunidades Autónomas
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 font-sans mb-5">
          Coste estimado de la corrupción por CCAA. Nivel de riesgo basado en número de casos, cuantía y sentencias.
        </p>

        <div className="space-y-3">
          {ccaaSorted.map((ccaa, idx) => {
            const pct = maxCCaacCost > 0 ? (ccaa.amount / maxCCaacCost) * 100 : 0;
            const risk = RISK_COLORS[ccaa.riskLevel];
            return (
              <div key={ccaa.name} className="space-y-1">
                <div className="flex justify-between text-xs font-sans">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="text-slate-400 font-mono text-[10px] w-4">{idx + 1}.</span>
                    {ccaa.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 border ${risk.bg} ${risk.text}`}>
                      {ccaa.riskLevel}
                    </span>
                    <span className="font-mono text-slate-950 font-bold">{formatCurrency(ccaa.amount)}€</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className={`h-full ${risk.bar}`}
                  />
                </div>
                <div className="text-[10px] text-slate-400 font-sans pl-5">
                  {ccaa.count} casos documentados · {ccaa.sentenciados} con sentencia firme
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-black/10 pt-3 flex justify-between text-[10px] text-slate-500 font-sans uppercase tracking-wider">
          <span>*Nacional agrupa causas de ministerios o redes interautonómicas</span>
          <span>{ccaaSorted.length} ámbitos</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="editorial-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-4 w-4 text-violet-700" />
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950">
            Línea Temporal de la Corrupción en España
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 font-sans mb-5">
          Evolución de casos y costes por periodo histórico. La burbuja inmobiliaria concentra el mayor impacto económico.
        </p>

        <div className="space-y-4">
          {timelineData.map((t, idx) => {
            const pct = maxTimelineCost > 0 ? (t.cost / maxTimelineCost) * 100 : 0;
            return (
              <div key={t.period} className="flex gap-4 items-start">
                <div className="w-28 shrink-0 pt-1">
                  <span className="text-sm font-mono font-bold text-slate-950">{t.period}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 h-5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, delay: idx * 0.1 }}
                        className={`h-full ${idx === 2 ? "bg-red-700" : idx <= 1 ? "bg-blue-600" : idx === 3 ? "bg-orange-500" : "bg-emerald-600"}`}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-950 w-20 text-right">
                      {t.cases} casos
                    </span>
                    <span className="text-[11px] font-mono text-slate-600 w-24 text-right">
                      {formatCurrency(t.cost)}€
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-sans leading-relaxed pl-1">
                    {t.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Table with Filters */}
      <div className="editorial-card overflow-hidden">
        <div className="p-6 border-b border-black/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-sm uppercase tracking-widest font-sans font-extrabold text-slate-950">
              Expedientes y Causas de Corrupción Documentadas
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-sans">
              Haz clic sobre cualquier expediente para desplegar el análisis SME jurídico, los imputados y las fuentes oficiales.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-900 bg-black/5 border border-black/15 px-3 py-1 uppercase">
              {filteredCases.length} expedientes
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-black/10 bg-[#FAF9F6] flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500">
            <Filter className="h-3 w-3" /> Filtros:
          </div>
          <div className="relative">
            <Search className="h-3 w-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar caso, persona, lugar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-3 py-1.5 text-[11px] font-sans border border-black/15 bg-white w-48 focus:outline-none focus:border-black/30"
            />
          </div>
          <select
            value={selectedParty}
            onChange={(e) => setSelectedParty(e.target.value)}
            className="text-[11px] font-sans font-bold border border-black/15 bg-white px-3 py-1.5 uppercase tracking-wider cursor-pointer focus:outline-none"
          >
            {allParties.map((p) => (
              <option key={p} value={p}>{p === "TODOS" ? "Todos los partidos" : p}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-[11px] font-sans font-bold border border-black/15 bg-white px-3 py-1.5 uppercase tracking-wider cursor-pointer focus:outline-none"
          >
            {allStatuses.map((s) => (
              <option key={s} value={s}>{s === "TODOS" ? "Todos los estados" : s}</option>
            ))}
          </select>
          <select
            value={selectedCCAA}
            onChange={(e) => setSelectedCCAA(e.target.value)}
            className="text-[11px] font-sans font-bold border border-black/15 bg-white px-3 py-1.5 uppercase tracking-wider cursor-pointer focus:outline-none"
          >
            {allCCAA.map((r) => (
              <option key={r} value={r}>{r === "TODOS" ? "Todas las CCAA" : r}</option>
            ))}
          </select>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="text-[11px] font-sans font-bold border border-black/15 bg-white px-3 py-1.5 uppercase tracking-wider cursor-pointer focus:outline-none"
          >
            {allPeriods.map((p) => (
              <option key={p} value={p}>{p === "TODOS" ? "Todos los periodos" : p}</option>
            ))}
          </select>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-black/15 text-[10px] text-slate-600 uppercase tracking-widest font-sans font-extrabold">
                <th className="py-3.5 px-6">Expediente</th>
                <th className="py-3.5 px-4">Periodo</th>
                <th className="py-3.5 px-4">Partido</th>
                <th className="py-3.5 px-4">Ámbito</th>
                <th className="py-3.5 px-4">Estado Judicial</th>
                <th className="py-3.5 px-4 text-right">Coste Estimado</th>
                <th className="py-3.5 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10 text-xs text-slate-700 font-sans">
              {filteredCases
                .sort((a, b) => b.year - a.year)
                .map((c) => {
                  const sc = STATUS_COLORS[c.status] || STATUS_COLORS["Archivado"];
                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-black/2 transition-colors cursor-pointer group"
                      onClick={() => onCaseSelect(c)}
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-950 group-hover:underline text-[13px] font-serif tracking-tight">
                          {c.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans line-clamp-1 max-w-sm mt-0.5">
                          {c.description}
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs">
                        <span className="text-slate-900 font-bold">{c.period}</span>
                      </td>
                      <td className="py-4 px-4 font-extrabold text-slate-900 font-mono text-[11px] tracking-wide">
                        {c.parties.join(", ")}
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-sans text-xs">
                        {c.regions.join(", ")}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-block text-[9px] uppercase tracking-wide px-2 py-0.5 font-bold border ${sc.bg} ${sc.text} ${sc.border}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-xs font-bold text-slate-950">
                        {c.amountEstimated > 0 ? c.amountDisplay : "Por determinar"}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="p-1 bg-slate-100 group-hover:bg-black group-hover:text-white border border-black/10 text-slate-500 transition-colors cursor-pointer">
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              {filteredCases.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 italic text-xs font-serif">
                    Ningún expediente coincide con los criterios de búsqueda actuales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Sources Disclaimer */}
      <div className="editorial-card p-5 bg-[#FAF9F6]">
        <div className="flex items-start gap-3">
          <Info className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
          <div className="space-y-2">
            <h4 className="text-[10px] font-sans font-extrabold uppercase tracking-widest text-slate-700">
              Nota sobre Fuentes de Datos
            </h4>
            <div className="text-[11px] font-sans text-slate-600 leading-relaxed space-y-1">
              <p>
                <strong>CPI (Corruption Perceptions Index):</strong> Transparency International.
                Datos 2024 (publicados Feb 2025): España 56/100, puesto 46º mundial.
                Datos 2025 (publicados Feb 2026): España 55/100, puesto 49º mundial.
                <a href="https://www.transparency.org/en/cpi/2024" target="_blank" rel="noreferrer" className="underline hover:text-slate-900 ml-1">→ Fuente oficial</a>
              </p>
              <p>
                <strong>Casos judiciales:</strong> Sentencias, autos y sumarios judiciales verificados
                (CENDOJ, Audiencia Nacional, Tribunal Supremo). Costes económicos son estimaciones
                basadas en resoluciones judiciales y fuentes periodísticas contrastadas.
              </p>
              <p>
                <strong>CCAA:</strong> Distribución calculada a partir de los {cases.length} casos documentados en esta aplicación.
                No representa la totalidad de la corrupción en España, solo los casos con documentación judicial pública.
              </p>
              <p>
                <strong>CIS (Barómetro de Opinión):</strong> Centro de Investigaciones Sociológicas.
                Julio 2026 (Estudio 3571, N=4.020). La corrupción: 4º problema del país (17.8%), 11º preocupación personal (6.6%).
                <a href="https://www.cis.es" target="_blank" rel="noreferrer" className="underline hover:text-slate-900 ml-1">→ Fuente oficial</a>
              </p>
              <p>
                <strong>Consejo de Transparencia y Buen Gobierno:</strong> Autoridad administrativa independiente (Ley 19/2013).
                Evalúa anualmente el cumplimiento de obligaciones de transparencia de todas las administraciones públicas.
                <a href={CONSEJO_TRANSPARENCIA.url} target="_blank" rel="noreferrer" className="underline hover:text-slate-900 ml-1">→ Portal oficial</a>
              </p>
              <p className="text-[10px] text-slate-400 italic">
                Este observatorio NO incluye datos no verificados. Todas las cifras tienen fuente documental identifiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
