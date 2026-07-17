import { CorruptionCase } from "../types";
import { calculateKPIs, formatCurrency, getStatusColor, getStatusTextColor } from "../utils/calculators";

interface DashboardProps {
  cases: CorruptionCase[];
  onCaseSelect: (caseItem: CorruptionCase) => void;
}

export function Dashboard({ cases, onCaseSelect }: DashboardProps) {
  const kpis = calculateKPIs(cases);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="text-2xl font-bold text-red-400">{formatCurrency(kpis.totalDesviado)}</div>
          <div className="text-xs text-gray-400 mt-1">Estimado total</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="text-2xl font-bold text-orange-400">{kpis.totalCasos}</div>
          <div className="text-xs text-gray-400 mt-1">Casos analizados</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="text-2xl font-bold text-yellow-400">{kpis.personasImplicadas}</div>
          <div className="text-xs text-gray-400 mt-1">Personas implicadas</div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{kpis.integridadIndex}/100</div>
          <div className="text-xs text-gray-400 mt-1">Índice de integridad</div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Resumen por partido</h2>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(
              cases.reduce((acc, c) => {
                c.parties.forEach(p => {
                  if (!acc[p]) acc[p] = { count: 0, amount: 0 };
                  acc[p].count++;
                  acc[p].amount += c.amountEstimated;
                });
                return acc;
              }, {} as Record<string, { count: number; amount: number }>)
            ).map(([party, data]) => (
              <div key={party} className="text-center">
                <div className="text-sm font-medium text-gray-300">{party}</div>
                <div className="text-lg font-bold text-white mt-1">{data.count} casos</div>
                <div className="text-xs text-gray-500">{formatCurrency(data.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Todos los casos</h2>
        <div className="space-y-3">
          {cases
            .sort((a, b) => b.year - a.year)
            .map((c) => (
              <button
                key={c.id}
                onClick={() => onCaseSelect(c)}
                className="w-full text-left bg-gray-800 hover:bg-gray-750 rounded-xl p-4 border border-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-semibold">{c.name}</span>
                    <span className="text-gray-500 text-sm">{c.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(c.status)} text-white`}>
                      {c.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 line-clamp-1">{c.description}</div>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span>{c.amountDisplay}</span>
                  <span>{c.implicatedCount} implicados</span>
                  <span>{c.regions.join(", ")}</span>
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
