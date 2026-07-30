import { ModalInvestigacion } from '@/components/ui/ModalInvestigacion';

export const metadata = {
  title: 'Observatorio TECNOVA — Datos & Métricas',
  description: 'Módulo Activo de Investigación sobre Fricción Organizacional.',
};

export default function ObservatorioPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">Módulo Activo</span>
          <h1 className="text-3xl font-light text-slate-100 mt-1">Observatorio TECNOVA</h1>
          <p className="text-xs text-slate-400 font-light mt-1">Índice de Fricción Organizacional (IFO / IFC)</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-[11px] text-emerald-400 font-mono flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Módulo Vivo</span>
        </div>
      </div>

      {/* TARJETAS DE DATOS DEMOSTRATIVOS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">Historias Recopiladas</span>
          <p className="text-2xl font-light text-slate-100 font-mono">1,248</p>
          <span className="text-[10px] text-slate-500 block">Experiencias registradas</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">Tiempo Promedio Perdido</span>
          <p className="text-2xl font-light text-emerald-400 font-mono">42 min</p>
          <span className="text-[10px] text-slate-500 block">Por interacción</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">Fricción Frecuente</span>
          <p className="text-sm font-light text-slate-100 truncate">Plataforma Caída / Espera</p>
          <span className="text-[10px] text-slate-500 block">Cuello de botella principal</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-xs text-slate-400">Sectores Analizados</span>
          <p className="text-2xl font-light text-slate-100 font-mono">6</p>
          <span className="text-[10px] text-slate-500 block">Públicos y Privados</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 italic text-center">
        * Datos demostrativos. Próximamente este observatorio mostrará resultados reales obtenidos a partir de la investigación en tiempo real.
      </p>

      <div className="pt-6 text-center">
        <ModalInvestigacion />
      </div>
    </div>
  );
}
