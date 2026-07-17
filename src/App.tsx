import { useState, useEffect } from "react";
import { CorruptionCase, OsintResult } from "./types";
import { fetchCases } from "./data/apiCases";
import { Dashboard } from "./components/Dashboard";
import { Chronology } from "./components/Chronology";
import { CaseDetail } from "./components/CaseDetail";
import { ControlMap } from "./components/ControlMap";
import { OsintTerminal } from "./components/OsintTerminal";
import { Methodology } from "./components/Methodology";
import { motion, AnimatePresence } from "motion/react";
import {
  BarChart3,
  History,
  Terminal,
  BookOpen,
  Map,
  ShieldAlert,
  ChevronRight,
  Eye,
} from "lucide-react";

type Tab = "dashboard" | "cronologia" | "mapa" | "osint" | "metodologia" | "caso";

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [selectedCase, setSelectedCase] = useState<CorruptionCase | null>(null);
  const [cases, setCases] = useState<CorruptionCase[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCasesLoading(true);
    fetchCases().then((d) => setCases(d)).catch(() => setCases([])).finally(() => setCasesLoading(false));
  }, []);

  const handleCaseSelect = (c: CorruptionCase) => {
    setSelectedCase(c);
    setTab("caso");
  };

  const handleSearch = async (query: string): Promise<OsintResult | null> => {
    setLoading(true);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const tabItems: { id: Tab; label: string; icon: typeof BarChart3 }[] = [
    { id: "dashboard", label: "Tablero Analítico", icon: BarChart3 },
    { id: "cronologia", label: "Cronología Histórica", icon: History },
    { id: "mapa", label: "Mapa de Control", icon: Map },
    { id: "osint", label: "Terminal OSINT", icon: Terminal },
    { id: "metodologia", label: "Metodología", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#1a1a1a] font-serif selection:bg-black/15 antialiased flex flex-col justify-between">

      {/* Editorial Header */}
      <header className="border-b border-black/15 px-4 py-6 md:px-8 bg-[#F4F1EA]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest bg-red-700 text-white px-2 py-0.5">
                OSINT Live System
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                España 1975 — 2026
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-1 text-slate-950 font-serif">
              Observatorio de Corrupción
            </h1>
            <p className="font-sans text-xs uppercase tracking-[0.2em] font-medium opacity-60">
              Copiloto de Integridad Pública · Análisis de Desviación Fiscal y Sistemas Políticos
            </p>
          </div>
          <div className="flex gap-8 font-sans text-[10px] uppercase tracking-widest font-bold text-slate-800 shrink-0">
            <div className="flex flex-col items-start md:items-end">
              <span className="opacity-40 mb-0.5">Estado del Servidor</span>
              <span className="text-emerald-700 flex items-center gap-1">● Hetzner Node Active</span>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className="opacity-40 mb-0.5">Despliegue</span>
              <span>{cases.length} casos · {cases.reduce((s, c) => s + c.implicatedCount, 0)} implicados</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Menu */}
      <div className="border-b border-black/10 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="hidden lg:flex items-center gap-px">
            {tabItems.map((item) => {
              const Icon = item.icon;
              const isSelected = tab === item.id || (tab === "caso" && item.id === "dashboard");
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTab(item.id);
                    if (item.id !== "caso") setSelectedCase(null);
                  }}
                  className={`cursor-pointer px-6 py-4 font-sans text-[11px] uppercase tracking-widest font-bold border-r border-black/10 transition-colors ${
                    isSelected
                      ? "bg-black text-white"
                      : "text-slate-700 hover:bg-black/5"
                  }`}
                >
                  <span className="flex items-center gap-2 justify-center">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </button>
              );
            })}
            <div className="ml-auto font-mono text-[10px] opacity-50 px-4 hidden xl:block">
              INTEGRIDAD DEMOCRÁTICA v2.4
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="lg:hidden py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {tabItems.map((item) => {
              const Icon = item.icon;
              const isSelected = tab === item.id || (tab === "caso" && item.id === "dashboard");
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTab(item.id);
                    if (item.id !== "caso") setSelectedCase(null);
                  }}
                  className={`cursor-pointer text-[10px] uppercase tracking-wider font-sans font-bold px-4 py-2 shrink-0 border transition-all ${
                    isSelected
                      ? "bg-black text-white border-black"
                      : "bg-[#F4F1EA] text-slate-700 border-black/15 hover:bg-black/5"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab === "caso" ? `case-${selectedCase?.id}` : tab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="focus:outline-none"
          >
            {tab === "dashboard" && !selectedCase && (
              <Dashboard cases={cases} onCaseSelect={handleCaseSelect} />
            )}
            {tab === "caso" && selectedCase && (
              <CaseDetail
                caseItem={selectedCase}
                onBack={() => {
                  setSelectedCase(null);
                  setTab("dashboard");
                }}
              />
            )}
            {tab === "cronologia" && (
              <Chronology cases={cases} onCaseSelect={handleCaseSelect} />
            )}
            {tab === "mapa" && <ControlMap />}
            {tab === "osint" && <OsintTerminal onSearch={handleSearch} loading={loading} />}
            {tab === "metodologia" && <Methodology />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-black/15 bg-[#FAF9F6] py-6 text-center text-[10px] font-sans uppercase tracking-[0.2em] opacity-80 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold">
            © 2026 Observatorio de Corrupción · Proyecto Transparencia
          </span>
          <div className="flex gap-6 font-mono text-[9px] opacity-60 items-center">
            <a href="mailto:observatorio@viajeinteligencia.com" className="underline hover:text-slate-900 transition-colors">
              observatorio@viajeinteligencia.com
            </a>
            <span>OSINT Engine v2.4</span>
            <span>Hetzner / Debian</span>
            <span>vía{" "}
              <a href="https://viajeinteligencia.com" className="underline hover:text-slate-900 transition-colors">
                Viaje Inteligencia
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
