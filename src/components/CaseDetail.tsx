import { CorruptionCase } from "../types";
import { getStatusColor, getStatusTextColor } from "../utils/calculators";

interface CaseDetailProps {
  caseItem: CorruptionCase;
  onBack: () => void;
}

export function CaseDetail({ caseItem, onBack }: CaseDetailProps) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al listado
      </button>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">{caseItem.name}</h1>
            <div className="text-gray-400 mt-1">
              {caseItem.year} · {caseItem.period}
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              caseItem.status
            )} text-white`}
          >
            {caseItem.status}
          </span>
        </div>

        <p className="text-gray-300 leading-relaxed">{caseItem.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Impacto económico</div>
            <div className="text-lg font-bold text-red-400 mt-1">{caseItem.amountDisplay}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Implicados</div>
            <div className="text-lg font-bold text-orange-400 mt-1">{caseItem.implicatedCount}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Partidos</div>
            <div className="text-sm font-medium text-white mt-2">{caseItem.parties.join(", ")}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Regiones</div>
            <div className="text-sm font-medium text-white mt-2">{caseItem.regions.join(", ")}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-3">Consecuencias</h2>
        <p className="text-gray-300 leading-relaxed">{caseItem.consequences}</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-3">Figuras clave</h2>
        <div className="flex flex-wrap gap-2">
          {caseItem.keyFigures.map((f) => (
            <span
              key={f}
              className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-3">Tipos de corrupción</h2>
        <div className="flex flex-wrap gap-2">
          {caseItem.corruptionTypes.map((t) => (
            <span
              key={t}
              className="px-3 py-1 bg-red-900/50 border border-red-800 rounded-full text-sm text-red-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-3">Fuentes abiertas</h2>
        <div className="space-y-3">
          {caseItem.openSources.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <div className="text-sm text-white">{s.title}</div>
                <div className="text-xs text-gray-500">{s.entity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
