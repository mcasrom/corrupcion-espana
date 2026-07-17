import { useState, useEffect } from "react";

interface Update {
  id: number;
  case_id: number;
  date: string;
  description: string;
  source_url: string | null;
  type: string;
  slug: string;
  case_name: string;
}

const TYPE_LABEL: Record<string, string> = {
  hecho: "Hecho",
  sentencia: "Sentencia",
  imputacion: "Imputación",
  archivo: "Archivo",
  noticia: "Noticia",
};

export function LiveFeed({ onSelectCase }: { onSelectCase?: (slug: string) => void }) {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/updates?limit=50")
      .then((r) => r.json())
      .then((d) => setUpdates(Array.isArray(d) ? d : []))
      .catch(() => setUpdates([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="editorial-card p-6 md:p-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="editorial-badge bg-red-700 text-white px-2.5 py-1 inline-block">
              EN VIVO
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-slate-950 mt-3">
              Hoy en el Observatorio
            </h2>
            <p className="text-[11px] text-slate-500 font-sans mt-1">
              Hechos reales documentados caso a caso. Cada entrada enlaza a su fuente verificable.
            </p>
          </div>
          <span className="text-[10px] font-mono text-emerald-700">● ACTUALIZADO</span>
        </div>
      </div>

      {loading && <p className="text-slate-500 font-sans text-sm">Cargando hechos recientes…</p>}
      {!loading && updates.length === 0 && (
        <div className="editorial-card p-6 text-sm text-slate-500 font-sans">
          Aún no hay hechos registrados. El equipo editor añade sentencias, imputaciones y
          archivos conforme se producen.
        </div>
      )}

      <ol className="relative border-l-2 border-black/10 ml-3 space-y-6">
        {updates.map((u) => (
          <li key={u.id} className="ml-5">
            <div className="absolute -left-[7px] w-3 h-3 rounded-full bg-red-700"></div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-black text-white font-sans font-bold">
                {TYPE_LABEL[u.type] || "Hecho"}
              </span>
              <time className="text-xs text-slate-500 font-mono">{u.date}</time>
            </div>
            <p className="text-sm text-slate-800 font-serif leading-relaxed">{u.description}</p>
            <p className="text-xs mt-1 font-sans">
              <button
                onClick={() => onSelectCase?.(u.slug)}
                className="text-red-700 hover:underline font-bold"
              >
                {u.case_name}
              </button>
              {u.source_url && (
                <>
                  {" · "}
                  <a href={u.source_url} target="_blank" rel="noreferrer" className="text-slate-500 hover:underline">
                    fuente
                  </a>
                </>
              )}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
