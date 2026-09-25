'use client';

import { useState } from 'react';

type Role = 'usuario' | 'trabajador';
type Step = 'welcome' | 'privacy' | 'role' | 'user' | 'worker' | 'sent';

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

const USER_MOMENTS = [
  'Antes de iniciar',
  'Durante el proceso',
  'Esperando respuesta',
  'Al finalizar',
  'Nunca sentí incertidumbre',
];

const WORKER_MOMENTS = [
  'Antes de iniciar',
  'Durante la ejecución',
  'Esperando otra unidad',
  'Al finalizar',
  'Fue permanente durante todo el proceso',
];

export const EncuestaInvestigacion = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<Step>('welcome');
  const [consent, setConsent] = useState(false);
  const [role, setRole] = useState<Role | ''>('');
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
    setDifficulties((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );
  };

  const chooseRole = (nextRole: Role) => {
    setRole(nextRole);
    setPlaceOrOrganization('');
    setStory('');
    setFriction('');
    setDifficulties([]);
    setMoment('');
    setChange('');
    setStep(nextRole === 'usuario' ? 'user' : 'worker');
  };

  const submit = async () => {
    if (
      !role ||
      !consent ||
      !story.trim() ||
      !friction ||
      !moment ||
      difficulties.length === 0
    ) {
      return;
    }

    setStatus('sending');

    const payload = {
      survey: 'IFC',
      survey_version: '1.1-native',
      research_type: 'Experiencia Organizacional',
      origin: 'IFC_NATIVO',
      consent: true,
      anonymous: true,
      role,
      place_or_organization: placeOrOrganization.trim(),
      story: story.trim(),
      friction_1_5: Number(friction),
      main_difficulties: difficulties,
      greatest_uncertainty_or_difficulty_moment: moment,
      proposed_change: change.trim(),
    };

    try {
      const response = await fetch('/api/investigacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('No fue posible registrar la historia.');
      }

      setStatus('idle');
      setStep('sent');
    } catch {
      setStatus('error');
    }
  };

  const renderScale = () => (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {isWorker
          ? 'En una escala de 1 a 5, ¿cuánta fricción o sobrecarga te generó este proceso de trabajo? *'
          : 'En una escala de 1 a 5, ¿cuánta fricción o dificultad sentiste durante este trámite? *'}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setFriction(String(value))}
            className={`h-11 w-11 rounded-lg border text-sm ${
              friction === String(value)
                ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                : 'border-slate-200 hover:border-slate-400'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs text-slate-500">
        <span>Sin fricción (Fluido)</span>
        <span>{isWorker ? 'Parálisis / Frustración extrema' : 'Bloqueo / Desgaste extremo'}</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-full min-h-[500px] flex-col bg-white text-slate-800">
      {step !== 'sent' && (
        <div className="border-b border-slate-200 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
            TECNOVA · Investigación
          </p>
          <h3 className="mt-1 text-xl font-semibold">Encuesta de Experiencia Organizacional</h3>
        </div>
      )}

      {step === 'welcome' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          <div className="space-y-4 text-sm leading-relaxed">
            <h4 className="text-lg font-semibold">¿Cómo viviste esta experiencia? *</h4>
            <p>En TECNOVA creemos que toda gestión deja una experiencia.</p>
            <p>
              Queremos comprender cómo viven las personas los procesos organizacionales para
              identificar dónde aparece la fricción y cómo ésta afecta el tiempo, la comprensión y
              la experiencia tanto de quienes utilizan un servicio como de quienes trabajan para
              hacerlo posible.
            </p>
            <p>No buscamos evaluar personas ni instituciones.</p>
            <p>Buscamos comprender experiencias.</p>
            <p>Tu participación es completamente voluntaria.</p>
            <p>Las respuestas son anónimas.</p>
            <p>No recopilamos datos personales.</p>
            <p>
              La información será utilizada exclusivamente con fines de investigación para
              comprender la gestión desde la experiencia humana.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStep('privacy')}
            className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white"
          >
            Continuar
          </button>
        </div>
      )}

      {step === 'privacy' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          <div className="space-y-4 text-sm leading-relaxed">
            <h4 className="text-lg font-semibold">¿Cómo protegemos tu información?</h4>
            <p className="font-semibold">Protección de tu información</p>
            <p>En TECNOVA creemos que la confianza comienza por el respeto a las personas.</p>
            <div className="space-y-2">
              <p>Por ello:</p>
              <p>• No solicitamos nombre, RUT, correo electrónico ni ningún dato que permita identificarte directamente.</p>
              <p>• Tu participación es completamente voluntaria.</p>
              <p>• Puedes abandonar el formulario en cualquier momento antes de enviarlo.</p>
              <p>• Las respuestas serán analizadas únicamente de forma agregada y estadística.</p>
              <p>• La información será utilizada exclusivamente para investigación sobre fricción organizacional y mejora de la gestión.</p>
              <p>• Nunca se publicarán respuestas individuales.</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold">Fundamento normativo (Chile)</p>
              <p>
                El tratamiento de la información se inspira en los principios establecidos en la
                Ley N.º 19.628 sobre Protección de la Vida Privada y la Ley N.º 20.285 sobre
                Acceso a la Información Pública, junto con principios internacionales de
                investigación ética: participación voluntaria, confidencialidad, minimización de
                datos y finalidad específica.
              </p>
            </div>
            <p>
              Al responder este formulario autorizas el uso de información anónima únicamente para
              fines de investigación y análisis organizacional. TECNOVA no investiga personas.
              Investiga experiencias.
            </p>
          </div>

          <label className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0"
            />
            <span>
              He leído y acepto participar voluntariamente en esta investigación. Comprendo que
              mis respuestas serán tratadas de forma anónima y utilizadas únicamente con fines de
              investigación y mejora de la gestión.
            </span>
          </label>

          <button
            type="button"
            disabled={!consent}
            onClick={() => setStep('role')}
            className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Acepto y continuar
          </button>
        </div>
      )}

      {step === 'role' && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          <div>
            <h4 className="text-lg font-semibold">Hoy respondes como: *</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Esta elección nos permite comparar la experiencia de quienes utilizan un servicio
              con la de quienes trabajan para hacerlo posible.
            </p>
          </div>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => chooseRole('usuario')}
              className="rounded-xl border border-slate-200 p-4 text-left text-sm hover:border-emerald-500 hover:bg-emerald-50"
            >
              <span className="font-semibold">Usuario de un servicio</span>
            </button>
            <button
              type="button"
              onClick={() => chooseRole('trabajador')}
              className="rounded-xl border border-slate-200 p-4 text-left text-sm hover:border-emerald-500 hover:bg-emerald-50"
            >
              <span className="font-semibold">Trabajador de una organización</span>
            </button>
          </div>
        </div>
      )}

      {(step === 'user' || step === 'worker') && (
        <div className="flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
          {isWorker ? (
            <>
              <div className="space-y-3 text-sm leading-relaxed">
                <h4 className="text-lg font-semibold">Experiencia del Trabajador</h4>
                <p>Queremos comprender cómo viviste este proceso de trabajo.</p>
                <p>No buscamos evaluar tu desempeño.</p>
                <p>No buscamos fiscalizar tu trabajo.</p>
                <p>
                  Queremos comprender las condiciones en las que desarrollas tu labor y cómo éstas
                  influyen en la experiencia de quienes forman parte de la gestión.
                </p>
                <p>Tu experiencia es fundamental para comprender aquello que normalmente permanece invisible.</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  ¿En qué organización ocurrió esta experiencia? *
                </label>
                <input
                  value={placeOrOrganization}
                  onChange={(event) => setPlaceOrOrganization(event.target.value)}
                  placeholder="Nombre de la organización..."
                  className="field"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">¿Cómo viviste este proceso de trabajo? *</label>
                <textarea
                  value={story}
                  onChange={(event) => setStory(event.target.value)}
                  placeholder="Describe tu experiencia..."
                  className="field min-h-32"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3 text-sm leading-relaxed">
                <h4 className="text-lg font-semibold">Experiencia del Usuario</h4>
                <p>Queremos comprender cómo viviste esta experiencia.</p>
                <p>No estamos evaluando personas.</p>
                <p>No estamos evaluando instituciones.</p>
                <p>Queremos comprender cómo se vive la gestión desde la experiencia de quienes utilizan los servicios.</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  ¿Dónde ocurrió esta experiencia? *
                </label>
                <input
                  value={placeOrOrganization}
                  onChange={(event) => setPlaceOrOrganization(event.target.value)}
                  placeholder="Ingresa el nombre del lugar..."
                  className="field"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold">¿Cómo viviste este trámite o proceso? *</label>
                <textarea
                  value={story}
                  onChange={(event) => setStory(event.target.value)}
                  placeholder="Describe tu experiencia..."
                  className="field min-h-32"
                />
              </div>
            </>
          )}

          {renderScale()}

          <div>
            <label className="mb-2 block text-sm font-semibold">
              {isWorker
                ? '¿Qué fue lo que más dificultó realizar correctamente este proceso? *'
                : '¿Qué fue lo que más dificultó tu experiencia? *'}
            </label>
            <div className="space-y-2">
              {difficultyOptions.map((item) => (
                <label key={item} className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={difficulties.includes(item)}
                    onChange={() => toggleDifficulty(item)}
                    className="h-4 w-4"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              {isWorker
                ? '¿En qué momento apareció la mayor dificultad? *'
                : '¿En qué momento apareció la mayor incertidumbre? *'}
            </label>
            <div className="grid gap-2">
              {momentOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMoment(item)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    moment === item
                      ? 'border-emerald-600 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Si pudieras cambiar una sola cosa {isWorker ? 'del proceso' : 'de esta experiencia'}, ¿qué cambiarías? *
            </label>
            <textarea
              value={change}
              onChange={(event) => setChange(event.target.value)}
              placeholder="Escribe tu propuesta..."
              className="field min-h-28"
            />
          </div>

          {status === 'error' && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              No pudimos registrar tu historia. El envío no fue confirmado. Revisa la conexión y vuelve a intentarlo.
            </p>
          )}

          <button
            type="button"
            disabled={
              status === 'sending' ||
              !placeOrOrganization.trim() ||
              !story.trim() ||
              !friction ||
              difficulties.length === 0 ||
              !moment ||
              !change.trim()
            }
            onClick={submit}
            className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending' ? 'Guardando información…' : 'Enviar información'}
          </button>
        </div>
      )}

      {step === 'sent' && (
        <div className="flex flex-1 items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-4">
            <div className="text-4xl">✓</div>
            <p className="text-xl font-semibold">Gracias por compartir tu experiencia.</p>
            <p className="text-sm leading-relaxed text-slate-600">
              Tu información fue enviada correctamente y quedó registrada para la investigación de TECNOVA.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .field {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 0.75rem;
          outline: none;
        }
        .field:focus {
          border-color: #059669;
          box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.1);
        }
      `}</style>
    </div>
  );
};
