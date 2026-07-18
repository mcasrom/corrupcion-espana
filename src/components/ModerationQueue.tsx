import { useState, useEffect } from "react";

interface PendingComment {
  id: number;
  content: string;
  email: string;
  slug: string;
  name: string;
  created_at: string;
}

export function ModerationQueue() {
  const [items, setItems] = useState<PendingComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/comments/pending", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setItems(d.comments || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const act = async (id: number, action: "approve" | "reject") => {
    setBusy(id);
    try {
      await fetch(`/api/admin/comments/${id}/${action}`, {
        method: "POST",
        credentials: "include",
      });
      load();
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="editorial-card p-6">
      <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-950 mb-4">
        Moderación · Cola de revisión (Groq)
      </h3>
      {loading ? (
        <p className="text-xs font-sans text-slate-400">Cargando…</p>
      ) : items.length === 0 ? (
        <p className="text-xs font-sans text-slate-400">No hay comentarios pendientes. Todo limpio.</p>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div key={c.id} className="border border-black/10 rounded p-3">
              <p className="text-sm font-serif text-slate-800">{c.content}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] font-sans uppercase tracking-wider text-slate-400">
                  {c.email} · {c.name}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => act(c.id, "approve")}
                    disabled={busy === c.id}
                    className="px-3 py-1 bg-emerald-700 text-white text-[10px] uppercase tracking-widest font-bold rounded disabled:opacity-50"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => act(c.id, "reject")}
                    disabled={busy === c.id}
                    className="px-3 py-1 bg-red-700 text-white text-[10px] uppercase tracking-widest font-bold rounded disabled:opacity-50"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
