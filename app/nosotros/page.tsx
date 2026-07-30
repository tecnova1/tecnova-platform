export const metadata = {
  title: 'Nosotros — TECNOVA SpA',
  description: 'Observando la gestión desde la experiencia humana.',
};

export default function NosotrosPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Quiénes Somos</span>
        <h1 className="text-3xl font-light text-slate-100">Observando la gestión desde la experiencia humana</h1>
      </div>

      <div className="text-slate-300 leading-relaxed space-y-6 font-light text-sm md:text-base">
        <p>
          TECNOVA nace desde años observando la gestión. No desde la tecnología. Hablamos de personas.
        </p>
        <div className="p-6 bg-slate-900 border-l-2 border-emerald-500 rounded-r-xl text-slate-200 font-normal">
          Detrás de cada trámite existen dos seres humanos: quien necesita ayuda y quien intenta entregarla. Muchas veces ambos viven exactamente la misma frustración.
        </div>
        <p>
          Estudiamos ambas experiencias para transformar las vivencias en conocimiento, el conocimiento en innovación y la innovación en dignidad.
        </p>
      </div>

      {/* MODULOS RESERVADOS */}
      <div className="pt-8 border-t border-slate-800 space-y-6">
        <h2 className="text-xl font-light text-slate-200">Arquitectura de Módulos Futuros</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-2 opacity-75">
            <span className="text-[10px] text-slate-500 border border-slate-800 px-2 py-0.5 rounded">En Desarrollo</span>
            <h3 className="text-sm font-medium text-slate-200">Nexo Cívico</h3>
            <p className="text-xs text-slate-400 font-light">Gestión territorial, reportes ciudadanos estructurados, geolocalización GPS y seguimiento comunitario.</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-2 opacity-75">
            <span className="text-[10px] text-slate-500 border border-slate-800 px-2 py-0.5 rounded">En Desarrollo</span>
            <h3 className="text-sm font-medium text-slate-200">Replikarte</h3>
            <p className="text-xs text-slate-400 font-light">Mediación cultural, educación, economía circular e innovación social para la democratización del patrimonio visual.</p>
          </div>
        </div>
      </div>
    </div>
  );
}