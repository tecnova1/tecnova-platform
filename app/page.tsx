import React from 'react';
import { ModalInvestigacion } from '@/components/ui/ModalInvestigacion';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] text-gray-100 flex flex-col justify-between p-6 sm:p-12 font-sans">
      
      {/* HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center pt-12 pb-8 space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800">
          Centro de Investigación & Intelligence
        </span>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Comprender la Fricción. <br />
          <span className="text-emerald-400">Restaurar el Tiempo.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-light">
          Una investigación permanente sobre cómo viven las personas la gestión cotidiana.
        </p>

        <p className="text-sm sm:text-base text-gray-400 italic">
          TECNOVA escucha historias para comprender la Fricción Organizacional.
        </p>

        {/* COMPONENTE MODAL INTERNO */}
        <div className="pt-4 flex justify-center">
          <ModalInvestigacion />
        </div>
      </section>

      {/* SECCIÓN: ¿POR QUÉ EXISTE TECNOVA? */}
      <section className="max-w-3xl mx-auto my-12 p-8 border border-gray-800/80 bg-gray-900/40 rounded-2xl text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">¿Por qué existe TECNOVA?</h2>
        <blockquote className="text-lg sm:text-xl italic text-gray-300">
          "Todo comenzó con una pregunta: <br />
          <span className="text-emerald-400 font-semibold not-italic">
            ¿Cuánto tiempo pierde una persona producto de la fricción de un sistema?
          </span>
          <br />
          Desde entonces seguimos buscando la respuesta."
        </blockquote>
      </section>

      {/* PRINCIPIOS METODOLÓGICOS */}
      <section className="max-w-4xl mx-auto my-8 text-center space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Nuestros principios</h2>
          <p className="text-sm text-gray-400">
            No como valores corporativos. Como principios metodológicos.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {['Curiosidad', 'Honestidad', 'Incomodidad', 'Franqueza'].map((principio) => (
            <div key={principio} className="p-4 bg-gray-900/60 border border-gray-800 rounded-xl text-center">
              <span className="font-semibold text-emerald-400">{principio}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CONSTITUCIONAL */}
      <footer className="max-w-4xl mx-auto w-full pt-12 pb-6 border-t border-gray-800/60 text-center space-y-2">
        <p className="text-base font-semibold text-gray-200">
          Comprender antes de transformar.
        </p>
        <p className="text-xs text-gray-500">
          Centro de Investigación | Plataforma de Inteligencia Organizacional | Laboratorio de Innovación
        </p>
      </footer>

    </main>
  );
}
