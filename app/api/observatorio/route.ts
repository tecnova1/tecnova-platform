import { NextResponse } from 'next/server';

const EMPTY_METRICS = {
  historias_recopiladas: 0,
  tiempo_promedio_perdido_min: null,
  friccion_frecuente: null,
  sectores_analizados: 0,
};

export async function GET() {
  const destination = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!destination) return NextResponse.json(EMPTY_METRICS);

  try {
    const url = new URL(destination);
    url.searchParams.set('action', 'metrics');
    const token = process.env.GOOGLE_APPS_SCRIPT_TOKEN;
    if (token) url.searchParams.set('token', token);
    const response = await fetch(url.toString(), { cache: 'no-store' });
    if (!response.ok) return NextResponse.json(EMPTY_METRICS);
    const data = await response.json();
    return NextResponse.json({ ...EMPTY_METRICS, ...data });
  } catch {
    return NextResponse.json(EMPTY_METRICS);
  }
}
