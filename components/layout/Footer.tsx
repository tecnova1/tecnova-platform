import Link from 'next/link';
import { TecnovaLogo } from '../ui/Logo';
import { siteConfig } from '@/config/site';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-8 sm:py-12 px-4 sm:px-6 text-xs font-light text-slate-400">
      <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
        <div className="flex justify-center items-center">
          <TecnovaLogo />
        </div>
        <p className="text-slate-400 text-xs sm:text-sm">Centro de Investigación y Plataforma de Inteligencia Organizacional</p>
        <p className="text-slate-300 italic text-xs sm:text-sm px-2 leading-relaxed">"La dignidad del tiempo humano." — Comprender antes de transformar.</p>
        <p className="text-slate-400 text-xs sm:text-sm">
          Contacto Directo: <a href={`mailto:${siteConfig.email}`} className="text-emerald-400 hover:underline break-all">{siteConfig.email}</a>
        </p>
        <div className="pt-3 sm:pt-4 border-t border-slate-900 text-slate-500 space-y-1 text-[10px] sm:text-[11px]">
          <p>&copy; {new Date().getFullYear()} TECNOVA SpA. Todos los derechos reservados.</p>
          <p className="text-emerald-500/80">Innovación al servicio del Ser.</p>
        </div>
      </div>
    </footer>
  );
};
