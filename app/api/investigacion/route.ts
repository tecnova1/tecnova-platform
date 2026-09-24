import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const destination = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!destination) {
      return NextResponse.json({ error: 'Destino de datos no configurado.' }, { status: 503 });
    }

    const response = await fetch(destination, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'No fue posible registrar la respuesta.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'No fue posible procesar la respuesta.' }, { status: 500 });
  }
}
