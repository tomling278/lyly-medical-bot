import { NextResponse } from 'next/server';
import { addCita } from '@/lib/citasStore';

export async function POST(request: Request) {
  try {
    const { mensajes } = await request.json();

    if (!mensajes || !Array.isArray(mensajes) || mensajes.length === 0) {
      return NextResponse.json({ respuesta: "Por favor, envía un mensaje válido." }, { status: 400 });
    }

    const ultimoMensaje = mensajes[mensajes.length - 1]?.texto || '';
    const lowerTexto = ultimoMensaje.toLowerCase();

    let respuestaTexto = "";

    const matchTelefono = ultimoMensaje.match(/04\d{2}[-\s]?\d{7}|\d{7,}/);
    const tieneIntencion = lowerTexto.includes('cita') || lowerTexto.includes('nombre') || lowerTexto.includes('soy') || matchTelefono;

    if (tieneIntencion) {
      const telefonoExtraido = matchTelefono ? matchTelefono[0] : 'Registrado en chat';

      // Guardamos la cita en el sistema de almacenamiento persistente
      addCita({
        nombre: 'Paciente Web (Lead)',
        telefono: telefonoExtraido,
        motivo: ultimoMensaje.length > 30 ? ultimoMensaje.substring(0, 30) + '...' : ultimoMensaje,
        fechaHora: 'Solicitado vía Chat',
        estado: 'Confirmada'
      });

      respuestaTexto = "✅ ¡Perfecto! Tu cita con la Dra. Ismenia Avila ha quedado registrada con éxito. Te esperamos en la Calle 4, Qta. Don Rafael en Lechería. ¡Nos vemos pronto!";
    } else {
      respuestaTexto = "¡Perfecto! Para dejar tu cupo listo con la Dra. Ismenia, por favor indícanos tu nombre completo y un número de teléfono de contacto.";
    }

    return NextResponse.json({ respuesta: respuestaTexto });

  } catch (error: any) {
    console.error("Error crítico:", error);
    return NextResponse.json({ 
      respuesta: "Estamos a tu orden en el Centro Médico Lyly y Odontología Ismenia Vila. Llámanos al 0412-392.28.55." 
    }, { status: 500 });
  }
}