'use client';

import { useMemo, useState } from 'react';

type Role = 'usuario' | 'trabajador';

const AGE_RANGES = [
  '18–24',
  '25–34',
  '35–44',
  '45–54',
  '55–64',
  '65 o más',
] as const;

const USER_DIFFICULTIES = [
  'Información poco clara',
  'Tiempo de espera',
  'Comunicación',
  'Plataforma o sistema',
  'Procedimientos',
  'Derivaciones',
  'Otro',
];

const WORKER_DIFFICULTIES = [
  'Falta de tiempo',
  'Falta de personal',
  'Recursos limitados',
  'Sistemas tecnológicos',
  'Normativa',
  'Comunicación',
  'Otro',
];

const MOMENTS = ['Antes de iniciar', 'Durante el proceso', 'Esperando respuesta', 'Al finalizar', 'Nunca sentí incertidumbre'];
const WORKER_MOMENTS = ['Antes de iniciar', 'Durante la ejecución', 'Esperando otra unidad', 'Al finalizar', 'Fue permanente durante todo el proceso'];

export const EncuestaInvestigacion = ({ onClose }: { onClose: () => void }) => {
  const [consent, setConsent] = useState(false);
  const [ageRange, setAgeRange] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [step, setStep] = useState<'intro' | 'role' | 'experience' | 'sent'>('intro');
  const [location, setLocation] = useState('');
  const [organization, setOrganization] = useState('');
  const [experience, setExperience] = useState('');
  const [friction, setFriction] = useState('');
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [moment, setMoment] = useState('');
  const [change, setChange] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  const isWorker = role === 'trabajador';
  const difficultyOptions = isWorker ? WORKER_DIFFICULTIES : USER_DIFFICULTIES;
  const momentOptions = isWorker ? WORKER_MOMENTS : MOMENTS;

  const canContinueIntro = consent && !!ageRange;
  const canContinueRole = !!role;

  const toggleDifficulty = (item: string) => {
    setDifficulties((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item]
    );
  };

  const payload = useMemo(
    () => ({
      survey: 'IFC',
      survey_version: '1.0-native',
      submitted_at_client: new Date().toISOString(),
      age_range: ageRange,
      role,
      location: isWorker ? undefined : location,
      organization: isWorker ? organization : undefined,
      experience,
      friction_1_5: Number(friction),
      main_difficulties: difficulties,
      greatest_uncertainty_or_difficulty_moment: moment,
      proposed_change: change,
    }),
    [ageRange, role, location, organization, experience, friction, difficulties, moment, change, isWorker]
  );

  const submit = async () => {
    if (!role || !ageRange || !experience || !friction || !moment || !change || difficulties.length === 0) return;
    setStatus('sending');

    try {
      const response = await fetch('/api/investigacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('No fue posible registrar la respuesta.');
      setStep('sent');
    } catch {
      setStatus('error');
    } finally {
      if (status !== 'error') setStatus('idle');
    }
  };

  const title = step === 'sent' ? 'Gracias por participar' : 'Encuesta de Experiencia Organizacional';

  return (
    <div className="flex h-full min-h-[500px] flex-col bg-white text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">TECNOVA</p>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <button onClick={onClose} aria-label="Cerrar encuesta" className="text-xl text-slate-500 hover:text-slate-900">×</button>
      </div>

      {step === 'intro' && (
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <div className="space-y-3 text-sm leading-relaxed">
            <p>En TECNOVA creemos que toda gestión deja una experiencia.</p>
            <p>Queremos comprender cómo viven las personas los procesos organizacionales para identificar dónde aparece la fricción y cómo ésta afecta el tiempo, la comprensión y la experiencia tanto de quienes utilizan un servicio como de quienes trabajan para hacerlo posible.</p>
            <p>No buscamos evaluar personas ni instituciones.</p>
            <p>Buscamos comprender experiencias.</p>
            <p>Tu participación es completamente voluntaria.</p>
            <p>Las respuestas son anónimas y no solicitamos datos personales identificables.</p>
            <p>La información será utilizada exclusivamente con fines de investigación para comprender la gestión desde la experiencia humana.</p>
          </div>

          <label className="flex gap-3 rounded-xl border border-slate-200 p-4 text-sm">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4" />
            <span>He leído y acepto participar voluntariamente en esta investigación. Comprendo que mis respuestas serán tratadas de forma anónima y utilizadas únicamente con fines de investigación y mejora de la gestión.</span>
          </label>

          <div>
            <label className="mb-2 block text-sm font-semibold">¿En qué rango de edad te encuentras? *</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {AGE_RANGES.map((range) => (
                <button key={range} type="button" onClick={() => setAgeRange(range)} className={`rounded-lg border px-3 py-2 text-sm ${ageRange === range ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-slate-200 hover:border-slate-400'}`}>
                  {range}
                </button>
              ))}
            </div>
          </div>

          <button disabled={!canContinueIntro} onClick={() => setStep('role')} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">
            Continuar
          </button>
        </div>
      )}

      {step === 'role' && (
        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <div>
            <h4 className="text-base font-semibold">Hoy respondes como: *</h4>
            <p className="mt-1 text-sm text-slate-600">La encuesta adapta las preguntas según tu experiencia.</p>
          </div>
          <div className="grid gap-3">
            <button type="button" onClick={() => setRole('usuario')} className={`rounded-xl border p-4 text-left ${role === 'usuario' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>
              <strong>Usuario de un servicio</strong>
            </button>
            <button type="button" onClick={() => setRole('trabajador')} className={`rounded-xl border p-4 text-left ${role === 'trabajador' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>
              <strong>Trabajador de una organización</strong>
            </button>
          </div>
          <button disabled={!canContinueRole} onClick={() => setStep('experience')} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-40">
            Continuar
          </button>
        </div>
      )}

      {step === 'experience' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {!isWorker ? (
            <>
              <div>
                <h4 className="font-semibold">Experiencia del Usuario</h4>
                <p className="mt-1 text-sm text-slate-600">Queremos comprender cómo viviste esta experiencia. No estamos evaluando personas ni instituciones.</p>
              </div>
              <Field label="¿Dónde ocurrió esta experiencia? *">
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ingresa el nombre del lugar..." className="field" />
              </Field>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold">Experiencia del Trabajador</h4>
                <p className="mt-1 text-sm text-slate-600">Queremos comprender cómo viviste este proceso de trabajo. No buscamos evaluar tu desempeño ni fiscalizar tu trabajo.</p>
              </div>
              <Field label="¿En qué organización ocurrió esta experiencia? *">
                <input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Nombre de la organización..." className="field" />
              </Field>
            </>
          )}

          <Field label={isWorker ? '¿Cómo viviste este proceso de trabajo? *' : '¿Cómo viviste este trámite o proceso? *'}>
            <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Describe tu experiencia..." className="field min-h-28" />
          </Field>

          <div>
            <label className="mb-2 block font-semibold">En una escala de 1 a 5, ¿cuánta fricción o {isWorker ? 'sobrecarga te generó este proceso de trabajo' : 'dificultad sentiste durante este trámite'}? *</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((value) => (
                <button key={value} type="button" onClick={() => setFriction(String(value))} className={`h-11 w-11 rounded-lg border ${friction === String(value) ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>
                  {value}
                </button>
              ))}
            </div>
            <div className="mt-1 flex justify-between text-xs text-slate-500"><span>Sin fricción (Fluido)</span><span>{isWorker ? 'Parálisis / Frustración extrema' : 'Bloqueo / Desgaste extremo'}</span></div>
          </div>

          <div>
            <label className="mb-2 block font-semibold">¿Qué fue lo que más {isWorker ? 'dificultó realizar correctamente este proceso' : 'dificultó tu experiencia'}? *</label>
            <div className="space-y-2">
              {difficultyOptions.map((item) => (
                <label key={item} className="flex items-center gap-3 text-sm">
                  <input type="checkbox" checked={difficulties.includes(item)} onChange={() => toggleDifficulty(item)} className="h-4 w-4" />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-semibold">¿En qué momento apareció la mayor {isWorker ? 'dificultad' : 'incertidumbre'}? *</label>
            <div className="grid gap-2">
              {momentOptions.map((item) => (
                <button key={item} type="button" onClick={() => setMoment(item)} className={`rounded-lg border px-3 py-2 text-left text-sm ${moment === item ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200'}`}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <Field label="Si pudieras cambiar una sola cosa de esta experiencia, ¿qué cambiarías? *">
            <textarea value={change} onChange={(e) => setChange(e.target.value)} placeholder="Escribe tu propuesta..." className="field min-h-28" />
          </Field>

          {status === 'error' && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">No pudimos registrar la respuesta. Revisa la conexión con el destino de datos e inténtalo nuevamente.</p>}

          <button type="button" disabled={status === 'sending'} onClick={submit} className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-50">
            {status === 'sending' ? 'Enviando…' : 'Enviar'}
          </button>
        </div>
      )}

      {step === 'sent' && (
        <div className="flex flex-1 items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-3">
            <div className="text-4xl">✓</div>
            <p className="text-lg font-semibold">Tu experiencia ha sido registrada.</p>
            <p className="text-sm text-slate-600">Gracias por contribuir a la investigación de TECNOVA.</p>
            <button onClick={onClose} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white">Cerrar</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .field { width: 100%; border: 1px solid #e2e8f0; border-radius: 0.75rem; padding: 0.75rem; outline: none; }
        .field:focus { border-color: #059669; box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1); }
      `}</style>
    </div>
  );
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-semibold">{label}</label>
      {children}
    </div>
  );
}
