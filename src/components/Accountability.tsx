import { useEffect, useState } from "react";

interface Detail {
  slug: string;
  name: string;
  year: number;
  status: string;
  hasConsequence: boolean;
  consequences: string;
  organUpdates: { type: string; date: string; description: string }[];
}

interface AccData {
  totals: { cases: number; withOrganSignal: number; withConsequence: number; organAndConsequence: number; organNoConsequence: number };
  rates: { gapRate: number; consequenceRate: number };
  byParty: Record<string, { total: number; gap: number }>;
  detail: Detail[];
}

export function Accountability() {
  const [data, setData] = useState<AccData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/accountability")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-sm text-slate-500">Cargando…</p>;
  if (!data) return <p className="text-sm text-slate-500">No hay datos.</p>;

  const parties = Object.entries(data.byParty).sort((a, b) => b[1].total - a[1].total);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 border border-black/10">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Órganos de control vs. Realidad</h2>
        <p className="text-sm text-slate-600 mb-5">
          Cruce entre lo que detectan los órganos (sentencias, investigaciones, imputaciones, juicios)
          y la consecuencia real registrada en cada caso. La <strong>brecha</strong> mide cuántos casos
          con señal de órgano no tienen consecuencia documentada.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-3xl font-black text-slate-900">{data.totals.cases}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Casos totales</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-3xl font-black text-slate-900">{data.totals.withOrganSignal}</div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Con señal de órgano</div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4">
            <div className="text-3xl font-black text-emerald-700">{data.rates.consequenceRate}%</div>
            <div className="text-[11px] uppercase tracking-wide text-emerald-700">Con consecuencia</div>
          </div>
          <div className="rounded-lg bg-red-50 p-4">
            <div className="text-3xl font-black text-red-700">{data.rates.gapRate}%</div>
            <div className="text-[11px] uppercase tracking-wide text-red-700">Brecha (sin consecuencia)</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-black/10">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Brecha por partido implicado</h3>
        <div className="space-y-2">
          {parties.map(([p, v]) => {
            const gapPct = v.total ? Math.round((v.gap / v.total) * 100) : 0;
            return (
              <div key={p} className="flex items-center gap-3">
                <div className="w-40 text-sm text-slate-700 truncate">{p}</div>
                <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${gapPct}%` }} />
                </div>
                <div className="w-24 text-right text-xs text-slate-500">
                  {v.gap}/{v.total} sin consecuencia
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-black/10">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Detalle de casos con señal de órgano</h3>
        <ul className="space-y-3">
          {data.detail.map((d) => (
            <li key={d.slug} className="rounded-lg border border-black/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-slate-900">{d.name}</span>
                <span
                  className={`text-[10px] uppercase px-2 py-0.5 rounded ${
                    d.hasConsequence ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {d.hasConsequence ? "Con consecuencia" : "Sin consecuencia"}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap gap-1">
                {d.organUpdates.map((u, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {u.type} · {u.date}
                  </span>
                ))}
              </div>
              {d.hasConsequence && (
                <p className="mt-2 text-sm text-slate-600">{d.consequences}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h3 className="text-sm font-semibold text-amber-800 mb-2">Metodología del indicador</h3>
        <ul className="space-y-1 text-xs text-amber-900/80 list-disc pl-4">
          <li>
            <strong>Señal de órgano:</strong> el caso tiene al menos un hecho registrado de tipo
            sentencia, investigación, imputación o juicio (lo que dictan tribunales, fiscalía o
            cámaras de control).
          </li>
          <li>
            <strong>Consecuencia real:</strong> el campo "consecuencias" del caso contiene una
            palabra de impacto firme (condena, cárcel, prisión, dimisión, inhabilitación, multa,
            devolución, fianza, procesado…). Si solo dice "investigación" o "debate", se cuenta como
            <em> sin consecuencia</em>.
          </li>
          <li>
            <strong>Brecha:</strong> % de casos con señal de órgano que no tienen consecuencia firme
            documentada. Mide el hueco entre detección institucional y resultado real.
          </li>
          <li>
            <strong>Limitación:</strong> depende de lo que esté registrado en cada caso. Casos muy
            recientes pueden aún no tener consecuencia reflejada, y la ausencia de palabra firme no
            descarta acuerdos extrajudiciales o sanciones no documentadas aquí.
          </li>
        </ul>
      </div>
    </div>
  );
}
