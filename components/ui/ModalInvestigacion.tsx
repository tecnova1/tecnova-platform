'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TecnovaLogo } from './Logo';
import { EncuestaInvestigacion } from './EncuestaInvestigacion';

export const ModalInvestigacion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-slate-900 border border-emerald-500/50 hover:bg-slate-800 text-slate-100 text-xs font-medium px-5 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 w-full sm:w-auto">
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
              className="bg-white border border-slate-800 rounded-xl sm:rounded-2xl w-full h-[90vh] md:h-auto max-w-4xl flex flex-col shadow-2xl overflow-hidden relative my-auto"
            >
              <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
                <div className="shrink-0"><TecnovaLogo /></div>
                <h3 className="text-xs font-normal text-slate-700 truncate">Investigación sobre la Fricción Organizacional</h3>
                <button onClick={() => setIsOpen(false)} aria-label="Cerrar investigación" className="ml-auto text-xl text-slate-500 hover:text-slate-900">×</button>
              </div>
              <EncuestaInvestigacion onClose={() => setIsOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
