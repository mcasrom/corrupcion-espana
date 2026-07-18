import { useState, useEffect } from "react";

interface Comment {
  id: number;
  content: string;
  name: string | null;
  email: string;
  badge: string | null;
  created_at: string;
  votes_up: number;
  votes_down: number;
  replies?: Comment[];
}

interface CaseCommentsProps {
  slug: string;
  user: { email: string; role: string } | null;
}

function timeAgo(iso: string): string {
  const d = new Date(iso).getTime();
  const s = Math.floor((Date.now() - d) / 1000);
  if (s < 60) return "hace segundos";
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)} h`;
  return `hace ${Math.floor(s / 86400)} d`;
}

export function CaseComments({ slug, user }: CaseCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");

  const load = () => {
    setLoading(true);
    fetch(`/api/cases/${slug}`, { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setComments(d.comments || []))
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  };

  useEffect(load, [slug]);

  const send = async () => {
    if (!text.trim()) return;
    setSending(true);
    setMsg("");
    try {
      const res = await fetch(`/api/cases/${slug}/comments`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setText("");
      if (data.moderation === "pendiente") {
        setMsg("Comentario enviado. Está en revisión por moderación automática y aparecerá pronto.");
      }
      load();
    } catch (e: any) {
      setMsg(e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-lg font-semibold text-white mb-3">Comentarios de la comunidad</h2>

      {user ? (
        <div className="mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Aporta contexto, fuentes o análisis sobre este caso…"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white resize-none"
            rows={3}
          />
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={send}
              disabled={sending || !text.trim()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm font-bold disabled:opacity-50"
            >
              {sending ? "Enviando…" : "Publicar comentario"}
            </button>
            {msg && <span className="text-xs text-amber-400">{msg}</span>}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400 mb-6">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-red-400 underline">
            Accede
          </a>{" "}
          para participar en la conversación.
        </p>
      )}

      {loading ? (
        <p className="text-gray-500 text-sm">Cargando comentarios…</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500 text-sm">Aún no hay comentarios. Sé el primero en aportar.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="border-b border-gray-700 pb-4 last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-white">{c.name || c.email.split("@")[0]}</span>
                {c.badge && (
                  <span className="text-[10px] uppercase tracking-wider bg-red-900/50 text-red-300 px-2 py-0.5 rounded">
                    {c.badge}
                  </span>
                )}
                <span className="text-xs text-gray-500">{timeAgo(c.created_at)}</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{c.content}</p>
              {c.replies?.map((r) => (
                <div key={r.id} className="ml-4 mt-3 pl-3 border-l border-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-white">{r.name || r.email.split("@")[0]}</span>
                    {r.badge && (
                      <span className="text-[10px] uppercase tracking-wider bg-red-900/50 text-red-300 px-2 py-0.5 rounded">
                        {r.badge}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{timeAgo(r.created_at)}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{r.content}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
