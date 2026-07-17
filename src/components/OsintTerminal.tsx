import { useState } from "react";
import { OsintResult } from "../types";

interface OsintTerminalProps {
  onSearch: (query: string) => Promise<OsintResult | null>;
  loading: boolean;
}

export function OsintTerminal({ onSearch, loading }: OsintTerminalProps) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<OsintResult | null>(null);

  const handleSearch = async () => {
    if (!query.trim() || loading) return;
    const r = await onSearch(query);
    if (r) setResult(r);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-2">Terminal OSINT</h2>
        <p className="text-gray-400 text-sm mb-4">
          Consulta investigaciones de corrupción. Powered by Gemini AI.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Ej: Caso Gürtel, financiación ilegal, corrupción en Madrid..."
            className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-white font-medium transition-colors"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Resultado</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Integridad:</span>
              <span
                className={`text-sm font-bold ${
                  result.integrityScore >= 70
                    ? "text-green-400"
                    : result.integrityScore >= 40
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {result.integrityScore}/100
              </span>
            </div>
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">{result.summary}</p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500 mb-1">Actores detectados</div>
              <div className="flex flex-wrap gap-1">
                {result.detectedActors.map((a) => (
                  <span key={a} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Partidos</div>
              <div className="flex flex-wrap gap-1">
                {result.detectedParties.map((p) => (
                  <span key={p} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Temas</div>
              <div className="flex flex-wrap gap-1">
                {result.keyTopics.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {result.sources.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-2">Fuentes</div>
              <div className="space-y-1">
                {result.sources.map((s, i) => (
                  <div key={i} className="text-xs text-gray-400">
                    <span className="text-white">{s.title}</span>
                    {s.uri && <span className="text-gray-500 ml-2">({s.uri})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
