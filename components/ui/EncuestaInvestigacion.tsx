'use client';

import { useState } from 'react';

type Role = 'usuario' | 'trabajador';

const AGE_RANGES = ['18–24', '25–34', '35–44', '45–54', '55–64', '65 o más'];

const USER_DIFFICULTIES = ['Información poco clara', 'Tiempo de espera', 'Comunicación', 'Plataforma o sistema', 'Procedimientos', 'Derivaciones', 'Otro'];
const WORKER_DIFFICULTIES = ['Falta de tiempo', 'Falta de personal', 'Recursos limitados', 'Sistemas tecnológicos', 'Normativa', 'Comunicación', 'Otro'];
const USER_MOMENTS = ['Antes de iniciar', 'Durante el proceso', 'Esperando respuesta', 'Al finalizar', 'Nunca sentí incertidumbre'];
const WORKER_MOMENTS = ['Antes de iniciar', 'Durante la ejecución', 'Esperando otra unidad', 'Al finalizar', 'Fue permanente durante todo el proceso'];

export const EncuestaInvestigacion = ({ onClose }: { onClose: () => void }) => {
  const [consent, setConsent] = useState(false);
  const [ageRange, setAgeRange] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [step, setStep] = useState<'consent' | 'age' | 'story' | 'context' | 'sent'>('consent');
  const [placeOrOrganization, setPlaceOrOrganization] = useState('');
  const [story, setStory] = useState('');
  const [friction, setFriction] = useState('');
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [moment, setMoment] = useState('');
  const [change, setChange] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const isWorker = role === 'trabajador';
  const difficultyOptions = isWorker ? WORKER_DIFFICULTIES : USER_DIFFICULTIES;
  const momentOptions = isWorker ? WORKER_MOMENTS : USER_MOMENTS;

  const toggleDifficulty = (item: string) => {
    setDifficulties((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  };

  const submit = async () => {
    if (!role || !ageRange || !story.trim() || !friction || !moment || difficulties.length === 0) return;
    setStatus('sending');

    const payload = {
      survey: 'IFC',
      survey_version: '1.0-native-conversational',
      submitted_at_client: new Date().toISOString(),
      consent: true,
      anonymous: true,
      age_range: ageRange,
      role,
      place_or_organization: placeOrOrganization,
      story,
      friction_1_5: Number(friction),
      main_difficulties: difficulties,
      greatest_uncertainty_or_difficulty_moment: moment,
      proposed_change: change,
    };

    try {
      const response = await fetch('/api/investigacion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error('No fue posible registrar la historia.');
      setStep('sent');
    } catch {
      setStatus('error');
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="flex h-full min-h-[500px] flex-col bg-white text-slate-800">
      {step !== 'sent' && (
        <div className="border-b border-slate-200 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">TECNOVA · Investigación</p>
          <h3 className="mt-1 text-xl font-semibold">Queremos escuchar tu historia</h3>
        </div>
      )}

      {step === 'consent' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          <div className="space-y-4 text-sm leading-relaxed">
            <p>En TECNOVA creemos que toda gestión deja una experiencia.</p>
            <p>Queremos comprender cómo viven las personas los procesos y cómo la fricción afecta su tiempo, su comprensión y su experiencia.</p>
            <p>No buscamos evaluar personas ni instituciones. Buscamos comprender experiencias.</p>
            <p>Tu participación es voluntaria y puedes abandonar el proceso antes de enviarlo.</p>
            <p><strong>Las respuestas son anónimas.</strong> No solicitamos nombre, RUT, correo electrónico ni otros datos destinados a identificarte directamente.</p>
            <p>La información será utilizada exclusivamente con fines de investigación sobre fricción organizacional y mejora de la gestión.</p>
          </div>
          <label className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0" />
            <span>He leído y acepto participar voluntariamente en esta investigación. Comprendo que mis respuestas serán tratadas de forma anónima y utilizadas únicamente con fines de investigación.</span>
          </label>
          <button disabled={!consent} onClick={() => setStep('age')} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">
            Acepto y continuar
          </button>
        </div>
      )}

      {step === 'age' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          <div>
            <h4 className="text-lg font-semibold">Antes de comenzar</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Sólo necesitamos un rango de edad para analizar las experiencias de forma agregada. No solicitamos tu edad exacta.</p>
          </div>
          <div>
            <label className="mb-3 block text-sm font-semibold">¿En qué rango de edad te encuentras? *</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {AGE_RANGES.map((range) => (
                <button key={range} type="button" onClick={() => setAgeRange(range)} className={`rounded-lg border px-3 py-3 text-sm ${ageRange === range ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 hover:border-slate-400'}`}>{range}</button>
              ))}
            </div>
          </div>
          <button disabled={!ageRange} onClick={() => setStep('story')} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">
            Continuar
          </button>
        </div>
      )}

      {step === 'story' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">Cuéntanos qué pasó</h4>
            <p className="text-sm leading-relaxed text-slate-600">No necesitas responder como si fuera una encuesta. Cuéntanos, con tus propias palabras, qué gestión, trámite o proceso viviste y qué ocurrió.</p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Tu historia *</label>
            <textarea autoFocus value={story} onChange={(e) => setStory(e.target.value)} placeholder="Cuéntanos la experiencia desde el principio. ¿Qué necesitabas hacer? ¿Qué ocurrió? ¿Cómo fue el recorrido?" className="field min-h-56" />
          </div>
          <button disabled={!story.trim()} onClick={() => setStep('context')} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">
            Continuar
          </button>
        </div>
      )}

      {step === 'context' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          <div>
            <h4 className="text-lg font-semibold">Ahora ayúdanos a comprender la historia</h4>
            <p className="mt-1 text-sm text-slate-600">Estas preguntas no califican tu experiencia. Nos ayudan a interpretar lo que nos contaste.</p>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">¿Cómo viviste esta experiencia? *</label>
            <div className="grid gap-2 sm:grid-cols-2">
              <button type="button" onClick={() => setRole('usuario')} className={`rounded-xl border p-3 text-left text-sm ${role === 'usuario' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>Soy usuario de un servicio</button>
              <button type="button" onClick={() => setRole('trabajador')} className={`rounded-xl border p-3 text-left text-sm ${role === 'trabajador' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>Soy trabajador de una organización</button>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">{isWorker ? '¿En qué organización ocurrió?' : '¿Dónde ocurrió?'}</label>
            <input value={placeOrOrganization} onChange={(e) => setPlaceOrOrganization(e.target.value)} placeholder={isWorker ? 'Nombre de la organización...' : 'Nombre del lugar o servicio...'} className="field" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Pensando en lo que nos contaste, ¿cuánta fricción sentiste? *</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((value) => <button key={value} type="button" onClick={() => setFriction(String(value))} className={`h-11 w-11 rounded-lg border ${friction === String(value) ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>{value}</button>)}
            </div>
            <div className="mt-1 flex justify-between text-xs text-slate-500"><span>Sin fricción</span><span>Bloqueo / desgaste extremo</span></div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">¿Qué parte del recorrido hizo más difícil tu experiencia?</label>
            <div className="space-y-2">
              {difficultyOptions.map((item) => <label key={item} className="flex items-center gap-3 text-sm"><input type="checkbox" checked={difficulties.includes(item)} onChange={() => toggleDifficulty(item)} className="h-4 w-4" />{item}</label>)}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">¿Cuándo sentiste la mayor incertidumbre o dificultad?</label>
            <div className="grid gap-2">
              {momentOptions.map((item) => <button key={item} type="button" onClick={() => setMoment(item)} className={`rounded-lg border px-3 py-2 text-left text-sm ${moment === item ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>{item}</button>)}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Si pudieras cambiar una sola cosa de lo que viviste, ¿qué cambiarías?</label>
            <textarea value={change} onChange={(e) => setChange(e.target.value)} placeholder="Cuéntanos..." className="field min-h-28" />
          </div>
          {status === 'error' && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">No pudimos registrar tu historia. Inténtalo nuevamente.</p>}
          <button type="button" disabled={status === 'sending' || !role || !friction || !moment || difficulties.length === 0} onClick={submit} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-50">{status === 'sending' ? 'Guardando historia…' : 'Compartir mi historia'}</button>
        </div>
      )}

      {step === 'sent' && (
        <div className="flex flex-1 items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-4">
            <div className="text-4xl">✓</div>
            <p className="text-xl font-semibold">Gracias por contarnos tu historia.</p>
            <p className="text-sm leading-relaxed text-slate-600">Tu experiencia pasa a formar parte de una investigación sobre la fricción organizacional y la forma en que los sistemas afectan el tiempo de las personas.</p>
            <button onClick={onClose} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white">Cerrar</button>
          </div>
        </div>
      )}

      <style jsx>{`.field { width: 100%; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 0.75rem; outline: none; } .field:focus { border-color: #059669; box-shadow: 0 0 0 2px rgba(5,150,105,.1); }`}</style>
    </div>
  );
};
