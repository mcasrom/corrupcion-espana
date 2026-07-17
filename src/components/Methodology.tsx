import { OSINT_METHODOLOGY } from "../data/sources";

export function Methodology() {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-2">{OSINT_METHODOLOGY.title}</h2>
        <p className="text-gray-400 text-sm">{OSINT_METHODOLOGY.description}</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Principios</h3>
        <div className="space-y-3">
          {OSINT_METHODOLOGY.principles.map((p, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <p className="text-gray-300 text-sm">{p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Fases del análisis</h3>
        <div className="space-y-4">
          {OSINT_METHODOLOGY.phases.map((phase, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-white">{i + 1}</span>
              </div>
              <div>
                <div className="font-semibold text-white">{phase.name}</div>
                <p className="text-sm text-gray-400 mt-1">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Fuentes de datos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: "CENDOJ", desc: "Sentencias y resoluciones judiciales" },
            { name: "BOE", desc: "Leyes, decretos y nombramientos oficiales" },
            { name: "Tribunal de Cuentas", desc: "Control externo de fondos públicos" },
            { name: "Fiscalía Anticorrupción", desc: "Investigación y acusación penal" },
            { name: "UDEF", desc: "Delitos económicos y blanqueo" },
            { name: "OLAF", desc: "Fraude contra el presupuesto europeo" },
            { name: "Audiencia Nacional", desc: "Delitos de terrorismo y crimen organizado" },
            { name: "Parlamentos autonómicos", desc: "Comisiones investigadoras regionales" }
          ].map((s) => (
            <div key={s.name} className="flex items-center gap-3 p-3 bg-gray-750 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div>
                <div className="text-sm font-medium text-white">{s.name}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
