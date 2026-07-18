interface ShareButtonsProps {
  url: string;
  title: string;
  layout?: "row" | "col";
}

export function ShareButtons({ url, title, layout = "row" }: ShareButtonsProps) {
  const full = typeof window !== "undefined" ? `${window.location.origin}${url.startsWith("/") ? url : "/" + url}` : url;
  const shareX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(full)}`;
  const shareWa = `https://wa.me/?text=${encodeURIComponent(title + " " + full)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
    } catch {
      /* ignore */
    }
  };

  const base = "px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold font-sans rounded border border-black/15 hover:bg-black hover:text-white transition-colors";
  const wrap = layout === "col" ? "flex flex-col gap-2" : "flex gap-2 flex-wrap";

  return (
    <div className={wrap}>
      <a href={shareX} target="_blank" rel="noreferrer" className={base}>X</a>
      <a href={shareWa} target="_blank" rel="noreferrer" className={base}>WhatsApp</a>
      <button onClick={copy} className={base}>Copiar enlace</button>
    </div>
  );
}
