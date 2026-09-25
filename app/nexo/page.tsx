import { redirect } from "next/navigation";

export const metadata = {
  title: "Nexo Cívico — TECNOVA",
  description: "Método TECNOVA para observar antes de innovar.",
};

export default function NexoGatewayPage() {
  const url = process.env.NEXT_PUBLIC_NEXO_CIVICO_URL || "https://tecnova-civic-link.vercel.app";

  redirect(url);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <section className="max-w-xl text-center space-y-5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-emerald-400">Nexo Cívico</p>
        <h1 className="text-3xl md:text-5xl font-light text-white">Observar antes de innovar.</h1>
        <p className="text-sm md:text-base leading-7 text-slate-400">
          Esta puerta conecta TECNOVA con el método Nexo Cívico. La URL de despliegue debe configurarse en <code className="text-emerald-300">NEXT_PUBLIC_NEXO_CIVICO_URL</code> para abrir la experiencia operativa.
        </p>
        <a href="/" className="inline-flex rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-200 hover:border-emerald-500/50">Volver a TECNOVA</a>
      </section>
    </main>
  );
}
