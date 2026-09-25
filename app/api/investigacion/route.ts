import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const destination = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!destination) {
      return NextResponse.json({ error: 'Destino de datos no configurado.' }, { status: 503 });
    }

    const record = {
      source: 'IFC',
      system: 'TECNOVA',
      case_id: crypto.randomUUID(),
      received_at: new Date().toISOString(),
      ...payload,
    };

    const url = new URL(destination);
    const token = process.env.GOOGLE_APPS_SCRIPT_TOKEN;
    if (token) url.searchParams.set('token', token);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'No fue posible registrar la respuesta.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, case_id: record.case_id });
  } catch {
    return NextResponse.json({ error: 'No fue posible procesar la respuesta.' }, { status: 500 });
  }
}
