import fs from 'fs';
import path from 'path';

export interface Cita {
  id: string;
  nombre: string;
  telefono: string;
  motivo: string;
  fechaHora: string;
  estado: 'Pendiente' | 'Confirmada' | 'Atendida';
  fechaRegistro: string;
}

const filePath = path.join(process.cwd(), 'citas.json');

export const getCitas = (): Cita[] => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error leyendo citas:", error);
  }
  return [];
};

export const addCita = (cita: Omit<Cita, 'id' | 'fechaRegistro'>) => {
  try {
    const citas = getCitas();
    const nueva: Cita = {
      ...cita,
      id: Math.random().toString(36).substring(2, 9),
      fechaRegistro: new Date().toLocaleDateString()
    };
    citas.unshift(nueva);
    fs.writeFileSync(filePath, JSON.stringify(citas, null, 2), 'utf8');
    return nueva;
  } catch (error) {
    console.error("Error guardando cita:", error);
  }
};