import { CorruptionCase } from "../types";
import { getStatusColor } from "../utils/calculators";

interface ChronologyProps {
  cases: CorruptionCase[];
  onCaseSelect: (caseItem: CorruptionCase) => void;
}

export function Chronology({ cases, onCaseSelect }: ChronologyProps) {
  const sorted = [...cases].sort((a, b) => a.year - b.year);
  const periods = [
    { label: "Transición (1975-1995)", start: 1975, end: 1995 },
    { label: "Burbuja Inmobiliaria (1996-2007)", start: 1996, end: 2007 },
    { label: "Crisis y Ajuste (2008-2018)", start: 2008, end: 2018 },
    { label: "Época Contemporánea (2019-Presente)", start: 2019, end: 2030 }
  ];

  return (
    <div className="space-y-8">
      {periods.map((period) => {
        const periodCases = sorted.filter(
          (c) => c.year >= period.start && c.year <= period.end
        );
        if (periodCases.length === 0) return null;

        return (
          <div key={period.label}>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px flex-1 bg-gray-700" />
              <h3 className="text-sm font-semibold text-gray-400 whitespace-nowrap">
                {period.label}
              </h3>
              <div className="h-px flex-1 bg-gray-700" />
            </div>

            <div className="space-y-3">
              {periodCases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCaseSelect(c)}
                  className="w-full text-left bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 text-center">
                      <div className="text-lg font-bold text-white">{c.year}</div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-gray-600 relative">
                      <div className={`absolute inset-0 rounded-full ${getStatusColor(c.status)}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-sm text-gray-400 mt-1 line-clamp-1">
                        {c.description}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{c.amountDisplay}</span>
                        <span>{c.parties.join(", ")}</span>
                        <span>{c.status}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
