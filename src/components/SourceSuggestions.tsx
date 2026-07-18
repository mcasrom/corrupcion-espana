import { useState, useEffect } from "react";

interface Sug {
  id: number;
  case_slug: string;
  case_name: string;
  title: string;
  proposed_url: string | null;
}

export function SourceSuggestions() {
  const [items, setItems] = useState<Sug[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/source-suggestions", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setItems(d.suggestions || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const act = async (id: number, action: "approve" | "reject") => {
    setBusy(id);
    try {
      await fetch(`/api/admin/source-suggestions/${id}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      load();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="rounded-lg border border-black/10 bg-white p-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Fuentes sugeridas · 1 clic para aprobar
      </h3>
      <p className="text-[11px] text-slate-500 mb-3">
        Enlaces reales (Wikipedia del caso) propuestos para las fuentes sin URL. Aprueba para
        enlazarlos al caso. Tu supervisión mínima: un clic.
      </p>

      {loading ? (
        <p className="text-[11px] text-slate-400">Cargando…</p>
      ) : items.length === 0 ? (
        <p className="text-[11px] text-slate-400">No hay sugerencias pendientes.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 rounded border border-black/10 p-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900 truncate">{s.case_name}</div>
                <div className="text-[11px] text-slate-500 truncate">{s.title}</div>
                {s.proposed_url && (
                  <a
                    href={s.proposed_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-blue-600 underline truncate block"
                  >
                    {s.proposed_url}
                  </a>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => act(s.id, "approve")}
                  disabled={busy === s.id || !s.proposed_url}
                  className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white disabled:opacity-40"
                >
                  Aprobar
                </button>
                <button
                  onClick={() => act(s.id, "reject")}
                  disabled={busy === s.id}
                  className="rounded bg-black/5 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-40"
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
