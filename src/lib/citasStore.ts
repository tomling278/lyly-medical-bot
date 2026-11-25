// src/lib/citasStore.ts
import { supabase } from './supabase';

export interface Cita {
  id?: string;
  nombre: string;
  telefono: string;
  motivo: string;
  estado: string;
  fecha_solicitada?: string;
  created_at?: string;
}

// Guardar una nueva cita en Supabase
export async function guardarCita(cita: Cita): Promise<Cita | null> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .insert([
        {
          nombre: cita.nombre,
          telefono: cita.telefono,
          motivo: cita.motivo,
          estado: cita.estado || 'Pendiente',
          fecha_solicitada: cita.fecha_solicitada || '',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error al guardar cita:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error inesperado:', err);
    return null;
  }
}

// Obtener todas las citas (para el admin)
export async function obtenerCitas(): Promise<Cita[]> {
  try {
    const { data, error } = await supabase
      .from('citas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error al obtener citas:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error inesperado:', err);
    return [];
  }
}

// Actualizar el estado de una cita (Confirmada, Atendida, Cancelada)
export async function actualizarEstadoCita(
  id: string,
  estado: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('citas')
      .update({ estado })
      .eq('id', id);

    if (error) {
      console.error('Error al actualizar estado:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error inesperado:', err);
    return false;
  }
}

// Eliminar una cita
export async function eliminarCita(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('citas')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar cita:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error inesperado:', err);
    return false;
  }
}