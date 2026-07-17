import { useState } from "react";

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  const send = async () => {
    if (!email.includes("@")) { setMsg("Introduce un email válido."); setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/auth/request-link", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error");
      setStatus("sent");
      setMsg("Revisa tu correo. Haz clic en el enlace para acceder.");
    } catch (e: any) {
      setStatus("error");
      setMsg(e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="editorial-card p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-sm font-sans font-extrabold uppercase tracking-widest text-slate-950 mb-4">
          Acceder al Observatorio
        </h3>
        {status === "sent" ? (
          <p className="text-sm font-sans text-emerald-700">{msg}</p>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-[#FAF9F6] border border-black/15 rounded px-3 py-2 text-sm font-sans"
            />
            {status === "error" && <p className="text-xs text-red-700 mt-2 font-sans">{msg}</p>}
            <button
              onClick={send}
              disabled={status === "sending"}
              className="mt-3 w-full px-4 py-2 bg-red-700 hover:bg-red-800 rounded text-white text-sm font-bold font-sans disabled:opacity-50"
            >
              {status === "sending" ? "Enviando…" : "Enviar enlace de acceso"}
            </button>
            <p className="text-[10px] text-slate-400 mt-3 font-sans">
              Sin contraseña. Te enviamos un enlace mágico a tu correo.
            </p>
          </>
        )}
        <button onClick={onClose} className="mt-4 text-[10px] uppercase tracking-widest text-slate-500 hover:text-slate-800 font-sans">
          Cerrar
        </button>
      </div>
    </div>
  );
}
