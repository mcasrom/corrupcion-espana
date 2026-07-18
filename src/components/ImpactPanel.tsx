import { useState, useEffect } from "react";

interface ImpactItem {
  id: number;
  date: string;
  description: string;
  type: string;
  case_name: string;
  year: number;
}

interface ImpactData {
  top: ImpactItem[];
  thisWeek: number;
  counts: { nombramientos: number; dimisiones: number; posicionesGobierno: number };
  byGobierno: Record<string, number>;
}

const TYPE_LABEL: Record<string, string> = {
  nombramiento: "Nombramiento",
  dimision: "Dimisión",
  "posicion-gobierno": "Posición de gobierno",
  sentencia: "Sentencia",
  investigacion: "Investigación",
  presupuesto: "Presupuesto",
  hecho: "Hecho",
};

const TYPE_COLOR: Record<string, string> = {
  nombramiento: "bg-emerald-700",
  dimision: "bg-red-700",
  "posicion-gobierno": "bg-amber-700",
  sentencia: "bg-purple-700",
  investigacion: "bg-slate-700",
  presupuesto: "bg-blue-700",
  hecho: "bg-slate-600",
};

export function ImpactPanel() {
  const [data, setData] = useState<ImpactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/impact")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="editorial-card p-6 text-xs font-sans text-slate-400">Cargando impacto político…</div>;
  if (!data) return null;

  const gobiernos = Object.entries(data.byGobierno).sort((a, b) => b[1] - a[1]);

  return (
    <div className="editorial-card p-6 md:p-8">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-black uppercase tracking-tight text-slate-950 font-serif">
          Impacto en el Poder
        </h2>
        <span className="text-[10px] font-sans uppercase tracking-widest text-emerald-700 font-bold">
          {data.thisWeek} esta semana
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="border border-black/10 rounded p-3 text-center">
          <div className="text-2xl font-black text-red-700">{data.counts.dimisiones}</div>
          <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500">Dimisiones</div>
        </div>
        <div className="border border-black/10 rounded p-3 text-center">
          <div className="text-2xl font-black text-emerald-700">{data.counts.nombramientos}</div>
          <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500">Nombramientos</div>
        </div>
        <div className="border border-black/10 rounded p-3 text-center">
          <div className="text-2xl font-black text-amber-700">{data.counts.posicionesGobierno}</div>
          <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500">Pos. Gobierno</div>
        </div>
      </div>

      <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-700 mb-3">
        Hoy en el poder — consecuencias recientes
      </h3>
      <div className="space-y-3">
        {data.top.map((i) => (
          <div key={i.id} className="flex gap-3 items-start border-b border-black/5 pb-3 last:border-0">
            <span className={`text-[9px] font-sans uppercase tracking-wider text-white px-2 py-0.5 rounded shrink-0 mt-0.5 ${TYPE_COLOR[i.type] || "bg-slate-600"}`}>
              {TYPE_LABEL[i.type] || i.type}
            </span>
            <div>
              <p className="text-sm font-serif text-slate-800 leading-snug">{i.description}</p>
              <div className="text-[10px] font-sans uppercase tracking-wider text-slate-400 mt-1">
                {i.case_name} · {i.date}
              </div>
            </div>
          </div>
        ))}
        {data.top.length === 0 && (
          <p className="text-xs font-sans text-slate-400">Sin movimientos políticos registrados recientemente.</p>
        )}
      </div>

      {gobiernos.length > 0 && (
        <>
          <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-700 mb-3 mt-6">
            Trascendencia por gobierno de turno
          </h3>
          <div className="space-y-2">
            {gobiernos.map(([g, n]) => (
              <div key={g} className="flex items-center gap-3">
                <div className="w-40 text-[10px] font-sans uppercase tracking-wider text-slate-600 shrink-0">{g}</div>
                <div className="flex-1 h-2 bg-black/5 rounded">
                  <div className="h-2 bg-red-700 rounded" style={{ width: `${Math.max(8, (n / gobiernos[0][1]) * 100)}%` }} />
                </div>
                <div className="text-xs font-bold font-sans text-slate-800 w-6 text-right">{n}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
