'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TecnovaLogo } from './Logo';

export const ModalInvestigacion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const TALLY_URL_OPTIMIZED = "https://tally.so/r/pbXOv1?transparentBackground=1&dynamicHeight=1";

  const handleOpen = () => {
    setStep(1);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-slate-900 border border-emerald-500/50 hover:bg-slate-800 text-slate-100 text-xs font-medium px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-950/40"
      >
        Participar en la Investigación
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0b1329] border border-slate-800 rounded-2xl w-full max-w-3xl h-[88vh] flex flex-col shadow-2xl overflow-hidden relative"
            >
              <div className="bg-[#070c18] border-b border-slate-800/80 px-6 py-4 flex justify-between items-center shrink-0">
                <div className="flex items-center space-x-4">
                  <TecnovaLogo />
                  <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
                  <div className="hidden sm:block">
                    <h3 className="text-xs font-normal text-slate-200">Investigación sobre la Fricción Organizacional</h3>
                  </div>
                </div>
                <button 
                  onClick={handleClose} 
                  aria-label="Cerrar ventana"
                  className="text-slate-400 hover:text-white text-base transition p-1"
                >
                  ✕
                </button>
              </div>

              {step === 1 && (
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6 overflow-y-auto bg-[#0b1329]">
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold">
                      Participación Voluntaria & Privacidad
                    </span>
                    <h4 className="text-lg sm:text-xl font-light text-slate-100">
                      Tu experiencia ayuda a comprender la gestión cotidiana
                    </h4>
                    
                    <div className="text-xs sm:text-sm text-slate-300 font-light space-y-3 leading-relaxed">
                      <p>
                        Tu participación en esta investigación es <strong className="text-white">completamente voluntaria y anónima</strong>. No solicitamos datos personales identificables.
                      </p>
                      <p>
                        Los datos recopilados serán procesados exclusivamente para el cálculo e interpretación del <strong className="text-white">Índice de Fricción Organizacional (IFO/IFC)</strong>.
                      </p>
                      
                      <div className="p-4 bg-[#070c18] border border-slate-800/80 rounded-xl space-y-2 text-xs text-slate-300">
                        <p className="flex items-center space-x-2">
                          <span className="text-emerald-400">✓</span>
                          <span>Nunca serán utilizados para evaluar o calificar personas.</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <span className="text-emerald-400">✓</span>
                          <span>Nunca serán comercializados ni cedidos a terceros.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-medium text-xs px-8 py-3.5 rounded-full transition shadow-lg shadow-emerald-950/30"
                    >
                      Comprendo y deseo participar
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex-grow w-full bg-[#0b1329] relative overflow-hidden">
                  <iframe
                    src={TALLY_URL_OPTIMIZED}
                    className="w-full h-full border-0"
                    title="Investigación de Fricción Organizacional — TECNOVA SpA"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};