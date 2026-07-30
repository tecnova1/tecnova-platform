'use client';

import { useState } from 'react';

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
        <div className="text-emerald-400 text-xl font-light">✓</div>
        <h3 className="text-slate-200 text-sm font-light">Gracias por comunicarte con TECNOVA.</h3>
        <p className="text-xs text-slate-500 font-light">Hemos recibido tu mensaje y responderemos a la brevedad.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light">
      <div>
        <label className="block text-slate-400 mb-1">Nombre</label>
        <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/50 transition" />
      </div>
      <div>
        <label className="block text-slate-400 mb-1">Correo Electrónico</label>
        <input required type="email" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/50 transition" />
      </div>
      <div>
        <label className="block text-slate-400 mb-1">Asunto</label>
        <input required type="text" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/50 transition" />
      </div>
      <div>
        <label className="block text-slate-400 mb-1">Mensaje</label>
        <textarea required rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-emerald-500/50 transition"></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-200 py-3 rounded-xl transition font-medium"
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};