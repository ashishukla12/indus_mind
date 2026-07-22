export default function Topbar({ title, subtitle }) {
  return (
    <header className="h-16 shrink-0 border-b border-line bg-ink/60 backdrop-blur px-6 flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold text-text">{title}</h2>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-panel-2 border border-line flex items-center justify-center tag-mono text-[11px] text-signal">
          RE
        </div>
      </div>
    </header>
  );
}
