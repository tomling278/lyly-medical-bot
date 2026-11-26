// src/app/api/webhook-medical/route.ts
import { NextResponse } from 'next/server';
import { guardarCita } from '@/lib/citasStore';

// ✅ CORREGIDO: Coincide con el nombre en Vercel (sin NEXT_PUBLIC_)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `Eres el asistente virtual de la clínica de la Od. Ismenia Ávila, especialista en Odontología Operatoria y Estética en Lechería, Venezuela.

Información de la clínica:
- Nombre: Od. Ismenia Ávila
- Teléfono/WhatsApp: 0412-3922855
- Horario: Lunes a Viernes de 8:00am a 5:00pm
- Servicios: limpieza dental, blanqueamiento, ortodoncia, implantes, caries, endodoncia, diseño de sonrisa, extracciones.

Reglas:
1. Responde SIEMPRE en español, con tono cálido y profesional.
2. Si el paciente quiere agendar, pide: nombre, teléfono y motivo.
3. Sé breve (máximo 3-4 líneas por respuesta).
4. No inventes precios exactos, da rangos aproximados.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mensajes = body.mensajes || [];

    if (!Array.isArray(mensajes) || mensajes.length === 0) {
      return NextResponse.json({ error: 'No hay mensajes' }, { status: 400 });
    }

    // Mapear el historial al formato que espera Gemini
    const contents = mensajes
      .filter((m: any) => m.texto)
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.texto) }],
      }));

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Falta GEMINI_API_KEY en variables de entorno' },
        { status: 500 }
      );
    }

    // ✅ CORREGIDO: Formato limpio del fetch para evitar errores de sintaxis
    const res = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.error('Error de Gemini:', data);
      return NextResponse.json({ error: 'Error de Gemini' }, { status: 502 });
    }

    const respuesta =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Disculpa, no pude procesar tu mensaje. ¿Puedes repetirlo?';

    // 🧠 DETECCIÓN DE CITA: guardar en Supabase automáticamente
    const ultimoUsuario = [...mensajes].reverse().find((m: any) => m.role === 'user');
    if (ultimoUsuario?.texto) {
      const texto: string = ultimoUsuario.texto;
      const telMatch = texto.match(/0\d{3}[-\s]?\d{7}/);
      const quiereAgendar = /cita|agendar|agenda|mañana|citas/i.test(texto);

      if (telMatch && quiereAgendar) {
        const nombreMatch = texto.match(/(?:mi nombre es|soy|nombre[:\s])\s*([A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,30})/i);
        const nombre = nombreMatch ? nombreMatch[1].trim() : 'Paciente Web';

        const servicios = ['limpieza', 'blanqueamiento', 'ortodoncia', 'implante', 'caries', 'endodoncia', 'sonrisa', 'extraccion', 'revisión', 'consulta'];
        const motivoMatch = servicios.find(s => texto.toLowerCase().includes(s));
        const motivo = motivoMatch ? motivoMatch.charAt(0).toUpperCase() + motivoMatch.slice(1) : 'Agendamiento general';

        await guardarCita({
          nombre,
          telefono: telMatch[0],
          motivo,
          estado: 'Pendiente',
          fecha_solicitada: texto.match(/mañana|pasado|lunes|martes|miércoles|jueves|viernes|sábado|\d{1,2}:\d{2}/i)?.[0] || '',
        });
      }
    }

    return NextResponse.json({ respuesta, message: respuesta });

  } catch (error) {
    console.error('Error en webhook-medical:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}