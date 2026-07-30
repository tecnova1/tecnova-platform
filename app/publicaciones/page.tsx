export const metadata = {
  title: 'Publicaciones — TECNOVA SpA',
  description: 'Artículos y avances de investigación.',
};

export default function PublicacionesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Difusión de Conocimiento</span>
        <h1 className="text-3xl font-light text-slate-100">Publicaciones</h1>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-3">
        <span className="text-[10px] border border-slate-800 text-slate-400 px-2.5 py-1 rounded-full">Próximamente</span>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          Este espacio albergará artículos, avances de investigación, análisis sectoriales y reflexiones desarrolladas por TECNOVA SpA.
        </p>
      </div>
    </div>
  );
}