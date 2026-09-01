'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/site';

export const SocialMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Abrir redes sociales de TECNOVA"
        className="text-xs border border-slate-800 bg-slate-900/80 hover:border-emerald-500/50 text-slate-300 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center sm:justify-start"
      >
        <span>Síguenos</span>
        <span className="text-[10px] text-slate-500">▼</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-52 bg-slate-900 border border-slate-800 rounded-lg sm:rounded-xl shadow-2xl p-2 z-50 text-xs"
          >
            <button
              onClick={() => handleSelect(siteConfig.links.linkedin)}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <span className="block font-medium">LinkedIn</span>
              <span className="block text-[10px] text-slate-500">TECNOVA SpA</span>
            </button>
            <button
              onClick={() => handleSelect(siteConfig.links.instagram)}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <span className="block font-medium">Instagram</span>
              <span className="block text-[10px] text-slate-500">@tecnovaspa</span>
            </button>
            <button
              onClick={() => handleSelect(siteConfig.links.facebook)}
              className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-emerald-400 transition"
            >
              <span className="block font-medium">Facebook</span>
              <span className="block text-[10px] text-slate-500">TECNOVA1.SpA.</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
