import { useState, useEffect } from "react";

interface CaseOption {
  slug: string;
  name: string;
}

const TYPES = ["hecho", "nombramiento", "dimision", "posicion-gobierno", "sentencia", "investigacion", "presupuesto", "imputacion", "archivo", "noticia"];
const TYPE_LABEL: Record<string, string> = {
  hecho: "Hecho", nombramiento: "Nombramiento", dimision: "Dimisión", "posicion-gobierno": "Posición de gobierno",
  sentencia: "Sentencia", investigacion: "Investigación", presupuesto: "Presupuesto",
  imputacion: "Imputación", archivo: "Archivo", noticia: "Noticia",
};

export function AddUpdateForm({ onAdded }: { onAdded?: () => void }) {
  const [cases, setCases] = useState<CaseOption[]>([]);
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [type, setType] = useState("hecho");
  const [description, setDescription] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/cases?limit=100")
      .then((r) => r.json())
      .then((d) => setCases((d.cases || []).map((c: any) => ({ slug: c.slug, name: c.name }))))
      .catch(() => setCases([]));
  }, []);

  const submit = async () => {
    setMsg(null);
    if (!slug || !description.trim()) {
      setMsg({ ok: false, text: "Selecciona un caso y escribe el hecho." });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/case-updates", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseSlug: slug, date, description, sourceUrl, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      const suggested = data.suggestedByAI ? " (Groq sugirió: " + TYPE_LABEL[data.type] + ")" : "";
      setMsg({ ok: true, text: "Hecho publicado." + suggested });
      setDescription(""); setSourceUrl(""); setType(data.type || "hecho");
      onAdded?.();
    } catch (e: any) {
      setMsg({ ok: false, text: e.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="editorial-card p-6 border-2 border-red-700/30">
      <h3 className="text-xs font-sans font-extrabold uppercase tracking-widest text-slate-950 mb-4">
        Añadir hecho real (editor)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <select value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-[#FAF9F6] border border-black/15 rounded px-3 py-2 text-sm text-slate-800 font-sans">
          <option value="">— Caso —</option>
          {cases.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-[#FAF9F6] border border-black/15 rounded px-3 py-2 text-sm text-slate-800 font-sans flex-1" />
          <select value={type} onChange={(e) => setType(e.target.value)} className="bg-[#FAF9F6] border border-black/15 rounded px-2 py-2 text-sm text-slate-800 font-sans">
            {TYPES.map((t) => <option key={t} value={t}>{TYPE_LABEL[t]}</option>)}
          </select>
        </div>
      </div>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
        placeholder="Describe el hecho (sentencia, imputación, archivo…)"
        className="w-full mt-3 bg-[#FAF9F6] border border-black/15 rounded px-3 py-2 text-sm text-slate-800 font-sans" />
      <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} placeholder="URL de la fuente (BOE, medio, tribunal)…"
        className="w-full mt-3 bg-[#FAF9F6] border border-black/15 rounded px-3 py-2 text-sm text-slate-800 font-sans" />
      <div className="flex items-center gap-3 mt-3">
        <button onClick={submit} disabled={saving} className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded text-white text-sm font-bold font-sans disabled:opacity-50">
          {saving ? "Publicando…" : "Publicar hecho"}
        </button>
        {msg && <span className={`text-sm font-sans ${msg.ok ? "text-emerald-700" : "text-red-700"}`}>{msg.text}</span>}
      </div>
    </div>
  );
}
