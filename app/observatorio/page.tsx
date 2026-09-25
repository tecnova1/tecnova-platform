'use client';

import { useEffect, useState } from 'react';
import { ModalInvestigacion } from '@/components/ui/ModalInvestigacion';

type Metrics = {
  historias_recopiladas: number;
  tiempo_promedio_perdido_min: number | null;
  friccion_frecuente: string | null;
  sectores_analizados: number;
};

const EMPTY: Metrics = {
  historias_recopiladas: 0,
  tiempo_promedio_perdido_min: null,
  friccion_frecuente: null,
  sectores_analizados: 0,
};

export default function ObservatorioPage() {
  const [metrics, setMetrics] = useState<Metrics>(EMPTY);

  useEffect(() => {
    fetch('/api/observatorio', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : EMPTY)
      .then((data) => setMetrics({ ...EMPTY, ...data }))
      .catch(() => setMetrics(EMPTY));
  }, []);

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
          <span>Recolección Abierta</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Historias Recopiladas" value={metrics.historias_recopiladas} subtext={metrics.historias_recopiladas ? 'Experiencias registradas' : 'Esperando primeras respuestas'} />
        <MetricCard label="Tiempo Promedio Perdido" value={metrics.tiempo_promedio_perdido_min == null ? '-- min' : String(metrics.tiempo_promedio_perdido_min) + ' min'} subtext={metrics.tiempo_promedio_perdido_min == null ? 'No medido todavía' : 'Calculado sobre las experiencias registradas'} highlight />
        <MetricCard label="Fricción Frecuente" value={metrics.friccion_frecuente ?? 'Por determinar'} subtext={metrics.friccion_frecuente ? 'Categoría más registrada' : 'En análisis de datos'} />
        <MetricCard label="Sectores Analizados" value={metrics.sectores_analizados} subtext={metrics.sectores_analizados ? 'Lugares u organizaciones registradas' : 'Estudio recién iniciado'} />
      </div>

      <p className="text-xs text-slate-500 italic text-center">
        Los indicadores se consolidan a partir de las experiencias recolectadas. El tiempo perdido sólo se mostrará cuando exista una medición válida.
      </p>

      <div className="pt-6 text-center">
        <ModalInvestigacion />
      </div>
    </div>
  );
}

function MetricCard({ label, value, subtext, highlight = false }: { label: string; value: string | number; subtext: string; highlight?: boolean }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
      <span className="text-xs text-slate-400">{label}</span>
      <p className={highlight ? 'text-2xl font-light font-mono text-emerald-400' : 'text-2xl font-light font-mono text-slate-100'}>{value}</p>
      <span className="text-[10px] text-slate-500 block">{subtext}</span>
    </div>
  );
}
