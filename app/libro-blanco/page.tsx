export const metadata = {
  title: 'Libro Blanco TECNOVA — Metodología IFC',
  description: 'Documentación del Índice de Fricción Organizacional.',
};

export default function LibroBlancoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">
      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Marco Teórico</span>
        <h1 className="text-3xl font-light text-slate-100">Libro Blanco TECNOVA</h1>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl space-y-4">
        <span className="text-[10px] border border-slate-800 text-slate-400 px-2.5 py-1 rounded-full">Próximamente</span>
        <p className="text-xs text-slate-400 font-light leading-relaxed">
          El Libro Blanco reunirá la filosofía, la metodología científica utilizada para construir el Índice de Fricción Organizacional (IFC) y los hallazgos consolidados.
        </p>
      </div>
    </div>
  );
}