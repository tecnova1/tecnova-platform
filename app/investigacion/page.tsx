export const metadata = {
  title: 'Investigación — TECNOVA SpA',
  description: 'Marco metodológico del Índice de Fricción Organizacional.',
};

export default function InvestigacionPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">
      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Metodología & Estudio</span>
        <h1 className="text-3xl font-light text-slate-100">Índice de Fricción Organizacional (IFO / IFC)</h1>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl space-y-4 text-xs md:text-sm text-slate-300 font-light leading-relaxed">
        <p>
          La Fricción Organizacional es la medida del impacto emocional, temporal y operativo que sufren las personas al interactuar con sistemas de gestión rígidos o ineficientes.
        </p>
        <p>
          Nuestro enfoque metodológico no evalúa rendimiento numérico ni productividad deshumanizada; analiza la pérdida de tiempo útil y la complejidad percibida.
        </p>
      </div>
    </div>
  );
}