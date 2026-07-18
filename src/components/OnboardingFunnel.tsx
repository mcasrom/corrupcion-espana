import { useState } from "react";

interface Step {
  title: string;
  body: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    title: "Un observatorio vivo de corrupción en España",
    body:
      "Datos reales, curados por editores. Nada se inventa: la IA solo modera comentarios y etiqueta hechos bajo supervisión humana. Aquí sigues casos, fuentes y consecuencias políticas con trazabilidad.",
    icon: "◆",
  },
  {
    title: "Recorre las secciones",
    body:
      "Panel: casos filtrables por partido, CCAA y periodo. Cronología: línea de tiempo. Mapa: corrupción por territorio. Análisis: tendencias e impacto por gobierno. En vivo: hechos recientes y comentarios.",
    icon: "▤",
  },
  {
    title: "Participa con tu correo",
    body:
      "Accede con un enlace mágico (sin contraseña). Comenta, vota y sigue casos. Los comentarios pasan por moderación antes de publicarse: sin spam, sin toxicidad.",
    icon: "✉",
  },
  {
    title: "Si eres editor",
    body:
      "En la pestaña 'En vivo' verás el panel de ingesta y moderación: procesas URLs, revisas borradores de hechos y publicas solo lo verificado. Tú decides qué es noticia.",
    icon: "✎",
  },
];

export function OnboardingFunnel({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) {
  const [i, setI] = useState(0);
  const last = i === STEPS.length - 1;
  const step = STEPS[i];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-lg rounded-xl bg-[#FAF9F6] p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-black text-lg leading-none"
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
          <span className="text-lg text-black">{step.icon}</span>
          <span>
            Paso {i + 1} / {STEPS.length}
          </span>
        </div>

        <h2 className="mb-3 text-xl font-bold leading-snug text-slate-900">{step.title}</h2>
        <p className="text-sm leading-relaxed text-slate-600">{step.body}</p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex gap-1.5">
            {STEPS.map((_, k) => (
              <span
                key={k}
                className={`h-1.5 w-6 rounded-full ${k === i ? "bg-black" : "bg-black/15"}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {i > 0 && (
              <button
                onClick={() => setI(i - 1)}
                className="rounded border border-black/20 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-black/5"
              >
                Atrás
              </button>
            )}
            {last ? (
              <button
                onClick={onLogin}
                className="rounded bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-black/80"
              >
                Acceder y empezar
              </button>
            ) : (
              <button
                onClick={() => setI(i + 1)}
                className="rounded bg-black px-4 py-1.5 text-xs font-semibold text-white hover:bg-black/80"
              >
                Siguiente
              </button>
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-[11px] text-slate-400 underline hover:text-slate-600"
        >
          Saltar introducción
        </button>
      </div>
    </div>
  );
}
