import { useState, useEffect } from "react";

interface FactDraft {
  id: number;
  case_slug: string | null;
  draft_text: string;
  source_url: string | null;
  suggested_type: string;
  status: string;
  case_name?: string;
}

export function FactQueue() {
  const [drafts, setDrafts] = useState<FactDraft[]>([]);
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const [ingesting, setIngesting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/fact-drafts", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setDrafts(d.drafts || []))
      .catch(() => setDrafts([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const ingest = async () => {
    const list = urls
      .split(/\n|,/)
      .map((u) => u.trim())
      .filter(Boolean);
    if (list.length === 0) {
      setMsg("Pega al menos una URL");
      return;
    }
    setIngesting(true);
    setMsg(null);
    try {
      const r = await fetch("/api/admin/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ urls: list }),
      });
      const d = await r.json();
      if (d.ok) {
        setMsg(`Procesadas ${d.drafts.length} URL(s). Revisa los borradores abajo.`);
        setUrls("");
        load();
      } else {
        setMsg(d.error || "Error al procesar");
      }
    } catch (e: any) {
      setMsg(e.message || "Error");
    } finally {
      setIngesting(false);
    }
  };

  const act = async (id: number, action: "approve" | "reject") => {
    setBusy(id);
    try {
      const r = await fetch(`/api/admin/fact-drafts/${id}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      const d = await r.json();
      if (!d.ok && d.error) setMsg(d.error);
      load();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="rounded-lg border border-black/10 bg-white p-5">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
        Autoingesta de hechos · cola de pendientes
      </h3>
      <p className="text-[11px] text-slate-500 mb-3">
        Pega URLs (una por línea o separadas por coma). Groq extrae un borrador objetivo a partir del
        contenido real. Nada se publica hasta que lo apruebes.
      </p>
      <textarea
        value={urls}
        onChange={(e) => setUrls(e.target.value)}
        placeholder="https://www.medio.es/noticia-de-corrupcion&#10;https://..."
        rows={3}
        className="w-full rounded border border-black/15 p-2 font-mono text-xs"
      />
      <button
        onClick={ingest}
        disabled={ingesting}
        className="mt-2 rounded bg-black px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
      >
        {ingesting ? "Procesando…" : "Procesar URLs"}
      </button>

      {msg && <p className="mt-2 text-[11px] text-slate-600">{msg}</p>}

      <div className="mt-5">
        {loading ? (
          <p className="text-[11px] text-slate-400">Cargando…</p>
        ) : drafts.length === 0 ? (
          <p className="text-[11px] text-slate-400">No hay borradores pendientes.</p>
        ) : (
          <ul className="space-y-3">
            {drafts.map((d) => (
              <li key={d.id} className="rounded border border-black/10 p-3">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wide">
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-slate-600">
                    {d.suggested_type}
                  </span>
                  {d.case_name ? (
                    <span className="rounded bg-emerald-50 px-2 py-0.5 text-emerald-700">
                      {d.case_name}
                    </span>
                  ) : (
                    <span className="rounded bg-amber-50 px-2 py-0.5 text-amber-700">
                      sin caso asociado
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-800">{d.draft_text}</p>
                {d.source_url && (
                  <a
                    href={d.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-[11px] text-blue-600 underline"
                  >
                    {d.source_url}
                  </a>
                )}
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => act(d.id, "approve")}
                    disabled={busy === d.id || !d.case_slug}
                    className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white disabled:opacity-40"
                  >
                    Aprobar y publicar
                  </button>
                  <button
                    onClick={() => act(d.id, "reject")}
                    disabled={busy === d.id}
                    className="rounded bg-black/5 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-40"
                  >
                    Descartar
                  </button>
                </div>
                {!d.case_slug && (
                  <p className="mt-1 text-[10px] text-amber-600">
                    Asocia el borrador a un caso manualmente (panel editor) antes de aprobar.
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
