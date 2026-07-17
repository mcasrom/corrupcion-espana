import { ORGANISMS } from "../data/organisms";

export function ControlMap() {
  const byLevel = {
    1: ORGANISMS.filter((o) => o.level === 1),
    2: ORGANISMS.filter((o) => o.level === 2),
    3: ORGANISMS.filter((o) => o.level === 3)
  };

  const levelLabels: Record<number, string> = {
    1: "Nivel Nacional",
    2: "Nivel Intermedio / Autonómico",
    3: "Nivel Local / Sectorial"
  };

  const typeColors: Record<string, string> = {
    prevencion: "bg-green-900/50 border-green-700 text-green-300",
    fiscalizacion: "bg-blue-900/50 border-blue-700 text-blue-300",
    judicial: "bg-red-900/50 border-red-700 text-red-300"
  };

  const typeLabels: Record<string, string> = {
    prevencion: "Prevención",
    fiscalizacion: "Fiscalización",
    judicial: "Judicial"
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-2">Mapa de organismos de control</h2>
        <p className="text-gray-400 text-sm">
          Organismos públicos que intervienen en la detección, investigación y juzgamiento de la
          corrupción en España.
        </p>
      </div>

      {([1, 2, 3] as const).map((level) => (
        <div key={level}>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">{levelLabels[level]}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {byLevel[level].map((o) => (
              <div
                key={o.id}
                className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-white">{o.shortLabel}</div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
                      typeColors[o.type]
                    }`}
                  >
                    {typeLabels[o.type]}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{o.role}</p>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-500">Disparador: </span>
                    <span className="text-gray-300">{o.trigger}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Legal/Fraude: </span>
                    <span className="text-gray-300">{o.legalVsFraud}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Ejemplo: </span>
                    <span className="text-gray-300">{o.example}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
