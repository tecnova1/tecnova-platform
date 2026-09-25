'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialMenu } from './SocialMenu';
import { TecnovaLogo } from '../ui/Logo';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Investigación', href: '/investigacion' },
    { label: 'Observatorio', href: '/observatorio' },
    { label: 'Nexo Cívico', href: '/nexo' },
    { label: 'Publicaciones', href: '/publicaciones' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070c18]/90 backdrop-blur border-b border-slate-800/80 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <TecnovaLogo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs text-slate-400 tracking-wide">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-slate-100 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden flex flex-col space-y-1.5 p-2 hover:bg-slate-800/50 rounded-lg transition"
          >
            <span
              className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-slate-300 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>

          {/* Social Menu (visible on all sizes) */}
          <div className="hidden sm:block">
            <SocialMenu />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-800/80 mt-3"
          >
            <nav className="py-4 space-y-2 px-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 rounded-lg transition"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-slate-800/60">
                <div className="px-2">
                  <SocialMenu />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
