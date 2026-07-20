import { useEffect, useState } from "react";
import { CorruptionCase } from "../types";
import { calculateKPIs, formatCurrency, groupCasesByParty, groupByCCAA, groupByPeriodTimeline } from "../utils/calculators";

interface ImpactData {
  counts: { nombramientos: number; dimisiones: number; posicionesGobierno: number };
  byGobierno: Record<string, number>;
}

function BarRow({ label, value, max, pct, color }: { label: string; value: string; max: number; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <div className="w-40 text-[11px] font-sans uppercase tracking-wider text-slate-700 shrink-0 truncate">{label}</div>
      <div className="flex-1 h-3 bg-black/5 rounded overflow-hidden">
        <div className={`h-3 ${color} rounded`} style={{ width: `${max > 0 ? Math.max(2, (pct / max) * 100) : 0}%` }} />
      </div>
      <div className="text-xs font-bold font-sans text-slate-800 w-20 text-right">{value}</div>
    </div>
  );
}

export function Analysis({ cases }: { cases: CorruptionCase[] }) {
  const [impact, setImpact] = useState<ImpactData | null>(null);

  useEffect(() => {
    fetch("/api/impact")
      .then((r) => r.json())
      .then((d) => setImpact(d))
      .catch(() => setImpact(null));
  }, []);

  const kpis = calculateKPIs(cases);

  const byParty = Object.entries(groupCasesByParty(cases))
    .map(([party, cs]) => ({ party, count: cs.length, amount: cs.reduce((s, c) => s + c.amountEstimated / c.parties.length, 0) }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);
  const maxParty = Math.max(...byParty.map((x) => x.amount), 1);

  const byCCAA = groupByCCAA(cases).sort((a, b) => b.amount - a.amount).slice(0, 10);
  const maxCCAA = Math.max(...byCCAA.map((x) => x.amount), 1);

  const timeline = groupByPeriodTimeline(cases);
  const maxTl = Math.max(...timeline.map((t) => t.cost), 1);

  const gobiernos = impact ? Object.entries(impact.byGobierno).sort((a, b) => b[1] - a[1]) : [];

  return (
    <div className="space-y-6">
      <div className="editorial-card p-6 md:p-8">
        <span className="editorial-badge bg-red-700 text-white px-2.5 py-1 inline-block mb-3">ANÁLISIS</span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-slate-950">
          Tendencias de la corrupción en España
        </h2>
        <p className="text-[11px] text-slate-500 font-sans mt-1">
          Agregaciones vivas sobre {cases.length} expedientes documentados. Se actualizan con cada caso añadido.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="editorial-card p-5">
          <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">Coste total</div>
          <div className="text-2xl font-serif font-light text-slate-950 mt-2">{formatCurrency(kpis.totalDesviado)}€</div>
        </div>
        <div className="editorial-card p-5">
          <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">Implicados</div>
          <div className="text-2xl font-serif font-light text-slate-950 mt-2">{kpis.personasImplicadas}</div>
        </div>
        <div className="editorial-card p-5">
          <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">Sentenciados</div>
          <div className="text-2xl font-serif font-light text-slate-950 mt-2">{kpis.casosSentenciados}</div>
        </div>
        <div className="editorial-card p-5">
          <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500 font-bold">En curso</div>
          <div className="text-2xl font-serif font-light text-slate-950 mt-2">{kpis.investigacionesActivas}</div>
        </div>
      </div>

      <div className="editorial-card p-6 md:p-8">
        <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-950 mb-4">
          Importe desviado por partido (casos con implicación)
        </h3>
        {byParty.map((x) => (
          <BarRow key={x.party} label={x.party} value={`${formatCurrency(x.amount)}€`} max={maxParty} pct={x.amount} color="bg-red-700" />
        ))}
      </div>

      <div className="editorial-card p-6 md:p-8">
        <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-950 mb-4">
          Importe desviado por Comunidad Autónoma
        </h3>
        {byCCAA.map((x) => (
          <BarRow key={x.name} label={x.name} value={`${formatCurrency(x.amount)}€`} max={maxCCAA} pct={x.amount} color="bg-amber-700" />
        ))}
      </div>

      <div className="editorial-card p-6 md:p-8">
        <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-950 mb-4">
          Evolución histórica del importe (por periodo constitucional)
        </h3>
        <div className="space-y-2">
          {timeline.map((t) => (
            <div key={t.period} className="flex items-center gap-3">
              <div className="w-44 text-[11px] font-sans uppercase tracking-wider text-slate-700 shrink-0">{t.period}</div>
              <div className="flex-1 h-3 bg-black/5 rounded overflow-hidden">
                <div className="h-3 bg-slate-800 rounded" style={{ width: `${maxTl > 0 ? Math.max(2, (t.cost / maxTl) * 100) : 0}%` }} />
              </div>
              <div className="text-xs font-bold font-sans text-slate-800 w-24 text-right">{formatCurrency(t.cost)}€</div>
            </div>
          ))}
        </div>
      </div>

      {impact && (
        <div className="editorial-card p-6 md:p-8">
          <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-950 mb-4">
            Trascendencia política (cargos caídos por gobierno de turno)
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="border border-black/10 rounded p-3 text-center">
              <div className="text-2xl font-black text-red-700">{impact.counts.dimisiones}</div>
              <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500">Dimisiones</div>
            </div>
            <div className="border border-black/10 rounded p-3 text-center">
              <div className="text-2xl font-black text-emerald-700">{impact.counts.nombramientos}</div>
              <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500">Nombramientos</div>
            </div>
            <div className="border border-black/10 rounded p-3 text-center">
              <div className="text-2xl font-black text-amber-700">{impact.counts.posicionesGobierno}</div>
              <div className="text-[10px] font-sans uppercase tracking-widest text-slate-500">Pos. Gobierno</div>
            </div>
          </div>
          {gobiernos.map(([g, n]) => (
            <BarRow key={g} label={g} value={`${n}`} max={gobiernos[0][1]} pct={n} color="bg-red-700" />
          ))}
        </div>
      )}
    </div>
  );
}
