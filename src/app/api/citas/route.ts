import { NextResponse } from 'next/server';
import { getCitas } from '../../../lib/citasStore';

export async function GET() {
  try {
    const citas = getCitas();
    return NextResponse.json(citas);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener citas" }, { status: 500 });
  }
}