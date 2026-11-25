// src/app/api/citas/route.ts
import { NextResponse } from 'next/server';
import { 
  obtenerCitas, 
  guardarCita, 
  actualizarEstadoCita, 
  eliminarCita 
} from '@/lib/citasStore';

// GET: Obtener todas las citas (para el admin)
export async function GET() {
  try {
    const citas = await obtenerCitas();
    return NextResponse.json(citas, { status: 200 });
  } catch (error) {
    console.error('Error en GET /api/citas:', error);
    return NextResponse.json(
      { error: 'Error al obtener citas' },
      { status: 500 }
    );
  }
}

// POST: Guardar una nueva cita (desde el chatbot)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, telefono, motivo, estado, fecha_solicitada } = body;

    if (!nombre || !telefono || !motivo) {
      return NextResponse.json(
        { error: 'Faltan datos: nombre, telefono, motivo' },
        { status: 400 }
      );
    }

    const citaGuardada = await guardarCita({
      nombre,
      telefono,
      motivo,
      estado: estado || 'Pendiente',
      fecha_solicitada: fecha_solicitada || '',
    });

    if (!citaGuardada) {
      return NextResponse.json(
        { error: 'No se pudo guardar la cita' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, cita: citaGuardada },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en POST /api/citas:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}

// PUT: Actualizar estado de una cita (Confirmada, Atendida, Cancelada)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, estado } = body;

    if (!id || !estado) {
      return NextResponse.json(
        { error: 'Faltan datos: id y estado' },
        { status: 400 }
      );
    }

    const exito = await actualizarEstadoCita(id, estado);

    if (!exito) {
      return NextResponse.json(
        { error: 'No se pudo actualizar' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Estado actualizado' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en PUT /api/citas:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar una cita
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Falta el id' },
        { status: 400 }
      );
    }

    const exito = await eliminarCita(id);

    if (!exito) {
      return NextResponse.json(
        { error: 'No se pudo eliminar' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Cita eliminada' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en DELETE /api/citas:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}