import { ContactForm } from '@/components/forms/ContactForm';
import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Contacto — TECNOVA SpA',
  description: 'Iniciar conversación con TECNOVA SpA.',
};

export default function ContactoPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-20 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Contacto Institucional</span>
        <h1 className="text-3xl font-light text-slate-100">Iniciar Conversación</h1>
        <p className="text-xs text-slate-400 font-light">
          Correo directo: <a href={`mailto:${siteConfig.email}`} className="text-emerald-400 hover:underline">{siteConfig.email}</a>
        </p>
      </div>

      <ContactForm />
    </div>
  );
}