import React from 'react';
import Link from 'next/link';
import { ModalInvestigacion } from '@/components/ui/ModalInvestigacion';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-gray-100 flex flex-col justify-between p-4 sm:p-6 md:p-12 font-sans">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center pt-8 sm:pt-12 pb-6 sm:pb-8 space-y-4 sm:space-y-6">
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-2.5 sm:px-3 py-1 rounded-full border border-emerald-800 inline-block">
          Centro de Investigación & Intelligence
        </span>
        
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Comprender la Fricción. <br className="hidden sm:block" />
          <span className="text-emerald-400">Restaurar el Tiempo.</span>
        </h1>
        
        <p className="text-sm sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light px-2">
          Una investigación permanente sobre cómo viven las personas la gestión cotidiana.
        </p>

        <p className="text-xs sm:text-sm md:text-base text-gray-400 italic px-2">
          TECNOVA escucha historias para comprender la Fricción Organizacional.
        </p>

        {/* COMPONENTE MODAL INTERNO */}
        <div className="pt-3 sm:pt-4 flex justify-center">
          <ModalInvestigacion />
        </div>

        <div className="pt-2 flex justify-center">
          <Link
            href="/nexo"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/50 px-5 py-2.5 text-xs text-slate-300 transition hover:border-emerald-500/50 hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.7)]" />
            Entrar al método Nexo Cívico
            <span className="transition group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>

      {/* SECCIÓN: ¿POR QUÉ EXISTE TECNOVA? */}
      <section className="max-w-3xl mx-auto my-8 sm:my-12 p-4 sm:p-6 md:p-8 border border-gray-800/80 bg-gray-900/40 rounded-xl sm:rounded-2xl text-center space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-2xl font-bold text-white">¿Por qué existe TECNOVA?</h2>
        <blockquote className="text-sm sm:text-lg md:text-xl italic text-gray-300 space-y-2">
          <p className="leading-relaxed">
            "Todo comenzó con una pregunta: <br className="hidden sm:block" />
            <span className="text-emerald-400 font-semibold not-italic">
              ¿Cuánto tiempo pierde una persona producto de la fricción de un sistema?
            </span>
          </p>
          <p>Desde entonces seguimos buscando la respuesta."</p>
        </blockquote>
      </section>

      {/* PRINCIPIOS METODOLÓGICOS */}
      <section className="max-w-4xl mx-auto my-6 sm:my-8 text-center space-y-4 sm:space-y-6 px-2">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-white">Nuestros principios</h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            No como valores corporativos. Como principios metodológicos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 pt-2">
          {['Curiosidad', 'Honestidad', 'Incomodidad', 'Franqueza'].map((principio) => (
            <div key={principio} className="p-3 sm:p-4 bg-gray-900/60 border border-gray-800 rounded-lg sm:rounded-xl text-center hover:border-emerald-500/30 transition">
              <span className="font-semibold text-emerald-400 text-xs sm:text-sm block">{principio}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CONSTITUCIONAL */}
      <footer className="max-w-4xl mx-auto w-full pt-8 sm:pt-12 pb-4 sm:pb-6 border-t border-gray-800/60 text-center space-y-2">
        <p className="text-sm sm:text-base font-semibold text-gray-200">
          Comprender antes de transformar.
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500 px-2 leading-relaxed">
          Centro de Investigación | Plataforma de Inteligencia Organizacional | Laboratorio de Innovación
        </p>
      </footer>

    </main>
  );
}
