import Link from 'next/link';
import { TecnovaLogo } from '../ui/Logo';
import { siteConfig } from '@/config/site';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 px-6 text-xs font-light text-slate-400">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex justify-center items-center">
          <TecnovaLogo />
        </div>
        <p className="text-slate-400">Centro de Investigación y Plataforma de Inteligencia Organizacional</p>
        <p className="text-slate-300 italic">"La dignidad del tiempo humano." — Comprender antes de transformar.</p>
        <p className="text-slate-400">
          Contacto Directo: <a href={`mailto:${siteConfig.email}`} className="text-emerald-400 hover:underline">{siteConfig.email}</a>
        </p>
        <div className="pt-4 border-t border-slate-900 text-slate-500 space-y-1 text-[11px]">
          <p>&copy; {new Date().getFullYear()} TECNOVA SpA. Todos los derechos reservados.</p>
          <p className="text-emerald-500/80">Innovación al servicio del Ser.</p>
        </div>
      </div>
    </footer>
  );
};