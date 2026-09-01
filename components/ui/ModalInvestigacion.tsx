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
        className="bg-slate-900 border border-emerald-500/50 hover:bg-slate-800 text-slate-100 text-xs font-medium px-5 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto"
      >
        Participar en la Investigación
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#0b1329] border border-slate-800 rounded-xl sm:rounded-2xl w-full max-w-2xl md:max-w-3xl max-h-[90vh] md:max-h-[88vh] flex flex-col shadow-2xl overflow-hidden relative my-auto"
            >
              {/* Header */}
              <div className="bg-[#070c18] border-b border-slate-800/80 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center shrink-0 gap-3">
                <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
                  <div className="shrink-0">
                    <TecnovaLogo />
                  </div>
                  <div className="h-4 w-px bg-slate-800 hidden sm:block shrink-0"></div>
                  <div className="hidden sm:block min-w-0">
                    <h3 className="text-xs font-normal text-slate-200 truncate">Investigación sobre la Fricción Organizacional</h3>
                  </div>
                </div>
                <button 
                  onClick={handleClose} 
                  aria-label="Cerrar ventana"
                  className="text-slate-400 hover:text-white text-lg sm:text-base transition p-1 shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              {step === 1 && (
                <div className="p-4 sm:p-6 md:p-8 flex-grow flex flex-col justify-between space-y-4 sm:space-y-6 overflow-y-auto bg-[#0b1329]">
                  <div className="space-y-3 sm:space-y-4">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-400 font-mono font-semibold inline-block">
                      Participación Voluntaria & Privacidad
                    </span>
                    <h4 className="text-base sm:text-lg md:text-xl font-light text-slate-100 leading-snug">
                      Tu experiencia ayuda a comprender la gestión cotidiana
                    </h4>
                    
                    <div className="text-xs sm:text-sm text-slate-300 font-light space-y-2 sm:space-y-3 leading-relaxed">
                      <p>
                        Tu participación en esta investigación es <strong className="text-white">completamente voluntaria y anónima</strong>. No solicitamos datos personales identificables.
                      </p>
                      <p>
                        Los datos recopilados serán procesados exclusivamente para el cálculo e interpretación del <strong className="text-white">Índice de Fricción Organizacional (IFO/IFC)</strong>.
                      </p>
                      
                      <div className="p-3 sm:p-4 bg-[#070c18] border border-slate-800/80 rounded-lg sm:rounded-xl space-y-1.5 sm:space-y-2 text-xs text-slate-300">
                        <p className="flex items-start space-x-2">
                          <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                          <span>Nunca serán utilizados para evaluar o calificar personas.</span>
                        </p>
                        <p className="flex items-start space-x-2">
                          <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                          <span>Nunca serán comercializados ni cedidos a terceros.</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-slate-800/80 flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-medium text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition shadow-lg shadow-emerald-950/30"
                    >
                      Comprendo y deseo participar
                    </button>
                  </div>
                </div>
              )}

              {/* Form Step */}
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
