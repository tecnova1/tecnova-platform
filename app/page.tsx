import Link from 'next/link';
import { ModalInvestigacion } from '@/components/ui/ModalInvestigacion';

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      {/* HERO SECTION */}
      <section className="px-6 pt-24 pb-16 text-center max-w-4xl mx-auto space-y-8">
        <span className="text-[11px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block">
          Sede Digital & Centro de Investigación
        </span>
        
        <h1 className="text-3xl md:text-5xl font-light text-slate-100 leading-relaxed tracking-tight">
          Restaurando la <span className="font-normal border-b-2 border-emerald-500 pb-1">dignidad del tiempo humano</span>.
        </h1>
        
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
          La tecnología debe acompañar al Ser. Nunca entorpecerlo.<br className="hidden md:inline"/>
          Comprendemos cómo las personas viven la gestión cotidiana para descubrir dónde aparece la fricción y cómo devolver tiempo, claridad y confianza.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <ModalInvestigacion />
          <Link
            href="/nosotros"
            className="w-full sm:w-auto bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium px-8 py-4 rounded-full transition"
          >
            Conocer TECNOVA
          </Link>
        </div>
      </section>

      {/* FILOSOFÍA Y MANIFIESTO */}
      <section className="px-6 py-16 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-slate-500 text-xs tracking-widest uppercase">El Tiempo Humano</p>
          <p className="text-slate-200 text-base md:text-lg font-light leading-relaxed italic">
            "La existencia humana ocupa apenas un instante dentro del universo. La muerte podrá perdonar un momento de nuestra existencia, pero el tiempo jamás nos devolverá aquello que la fricción nos arrebató."
          </p>
          <p className="text-slate-400 text-xs md:text-sm font-light pt-2 leading-relaxed">
            Cada fila innecesaria. Cada sitio web que no carga. Cada trámite incomprensible. Cada espera sin explicación... representa tiempo de vida perdido.
          </p>
        </div>
      </section>
    </div>
  );
}