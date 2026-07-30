import Link from 'next/link';
import { SocialMenu } from './SocialMenu';
import { TecnovaLogo } from '../ui/Logo';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#070c18]/90 backdrop-blur border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/">
          <TecnovaLogo />
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-xs text-slate-400 tracking-wide">
          <Link href="/" className="hover:text-slate-100 transition">Inicio</Link>
          <Link href="/nosotros" className="hover:text-slate-100 transition">Nosotros</Link>
          <Link href="/investigacion" className="hover:text-slate-100 transition">Investigación</Link>
          <Link href="/observatorio" className="hover:text-slate-100 transition">Observatorio</Link>
          <Link href="/publicaciones" className="hover:text-slate-100 transition">Publicaciones</Link>
          <Link href="/contacto" className="hover:text-slate-100 transition">Contacto</Link>
        </nav>

        <SocialMenu />
      </div>
    </header>
  );
};