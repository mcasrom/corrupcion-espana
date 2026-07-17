import { useState } from "react";
import { CorruptionCase, OsintResult } from "./types";
import { CASES } from "./data/cases";
import { Dashboard } from "./components/Dashboard";
import { Chronology } from "./components/Chronology";
import { CaseDetail } from "./components/CaseDetail";
import { ControlMap } from "./components/ControlMap";
import { OsintTerminal } from "./components/OsintTerminal";
import { Methodology } from "./components/Methodology";

type Tab = "dashboard" | "cronologia" | "mapa" | "osint" | "metodologia" | "caso";

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [selectedCase, setSelectedCase] = useState<CorruptionCase | null>(null);
  const [loading, setLoading] = useState(false);

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
        body: JSON.stringify({ query })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "cronologia", label: "Cronología" },
    { id: "mapa", label: "Mapa de Control" },
    { id: "osint", label: "Terminal OSINT" },
    { id: "metodologia", label: "Metodología" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Observatorio de Corrupción en España</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Datos verificados · Metodología OSINT · Fuentes públicas
              </p>
            </div>
            <div className="text-xs text-gray-500">
              {CASES.length} casos · {CASES.reduce((s, c) => s + c.implicatedCount, 0)} implicados
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTab(t.id);
                  setSelectedCase(null);
                }}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id || (tab === "caso" && t.id === "dashboard")
                    ? "border-blue-500 text-white"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === "dashboard" && !selectedCase && (
          <Dashboard cases={CASES} onCaseSelect={handleCaseSelect} />
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
          <Chronology cases={CASES} onCaseSelect={handleCaseSelect} />
        )}
        {tab === "mapa" && <ControlMap />}
        {tab === "osint" && <OsintTerminal onSearch={handleSearch} loading={loading} />}
        {tab === "metodologia" && <Methodology />}
      </main>

      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center text-xs text-gray-500">
            Observatorio de Corrupción en España · Datos verificados de fuentes públicas
          </div>
          <div className="text-center text-xs text-gray-600 mt-1">
            Powered by OSINT methodology · vía{" "}
            <a href="https://viajeinteligencia.com" className="text-blue-500 hover:underline">
              Viaje Inteligencia
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
