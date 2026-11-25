// src/app/admin/page.tsx
'use client';
import { obtenerCitas, actualizarEstadoCita, eliminarCita } from '@/lib/citasStore';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Cita {
  id: string;
  nombre: string;
  telefono: string;
  motivo: string;
  estado: string;
  fechaRegistro: string;
}

export default function AdminCitas() {
  const router = useRouter();

// Verificar autenticación al cargar
useEffect(() => {
  const auth = localStorage.getItem('adminAuth');
  if (auth !== 'true') {
    router.push('/admin/login');
  }
}, [router]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('Todas');
  const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);

  useEffect(() => { fetchCitas(); }, []);

  const fetchCitas = async () => {
    try {
      const res = await fetch('/api/citas');
      const data = await res.json();
      setCitas(data);
    } catch (error) { console.error(error); } 
    finally { setLoading(false); }
  };

  const cambiarEstado = async (id: string, nuevoEstado: string) => {
    await fetch(`/api/citas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    });
    fetchCitas();
  };

  // Función para abrir WhatsApp con mensaje pre-redactado
  const abrirWhatsApp = (cita: Cita, tipo: 'confirmar' | 'reprogramar') => {
    const numeroLimpio = cita.telefono.replace(/\D/g, '');
    let mensaje = '';
    
    if (tipo === 'confirmar') {
      mensaje = `✅ Hola ${cita.nombre}, tu cita ha sido CONFIRMADA. Te esperamos en Calle 4, Qta. Don Rafael, Lechería. Od. Ismenia Ávila`;
    } else {
      mensaje = `📅 Hola ${cita.nombre}, la hora solicitada está ocupada. Por favor contáctanos para reprogramar. Od. Ismenia Ávila`;
    }

    window.open(`https://wa.me/58${numeroLimpio}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  const citasFiltradas = filtro === 'Todas' ? citas : citas.filter(c => c.estado === filtro);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
  
  <div className="flex gap-3">
    <a href="/" className="bg-teal-700 text-white px-5 py-2 rounded-lg hover:bg-teal-800 transition">
      ← Volver al Sitio
    </a>
    
    <button
      onClick={() => {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('loginTime');
        router.push('/admin/login');
      }}
      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
    >
      Cerrar Sesión
    </button>
  </div>
</div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Todas', 'Pendiente', 'Confirmada', 'Atendida', 'Cancelada'].map(e => (
            <button key={e} onClick={() => setFiltro(e)} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filtro === e ? 'bg-teal-700 text-white' : 'bg-white border border-slate-200 text-slate-600'
              }`}>
              {e} ({e === 'Todas' ? citas.length : citas.filter(c => c.estado === e).length})
            </button>
          ))}
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? <div className="p-12 text-center">Cargando...</div> : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr className="text-xs font-semibold text-slate-500 uppercase">
                    <th className="p-4">Paciente</th>
                    <th className="p-4">Teléfono</th>
                    <th className="p-4">Mensaje</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {citasFiltradas.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="p-4 font-semibold">{c.nombre}</td>
                      <td className="p-4 font-mono text-slate-600">{c.telefono}</td>
                      <td className="p-4 max-w-xs">
                        <button onClick={() => setCitaSeleccionada(c)} 
                          className="text-left text-slate-600 hover:text-teal-700 w-full truncate block">
                          {c.motivo}
                        </button>
                      </td>
                      <td className="p-4">
                        <select value={c.estado} onChange={(e) => cambiarEstado(c.id, e.target.value)}
                          className="px-3 py-1 rounded-full text-xs font-bold border cursor-pointer outline-none">
                          <option>Pendiente</option><option>Confirmada</option>
                          <option>Atendida</option><option>Cancelada</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => setCitaSeleccionada(c)} 
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg" title="Ver detalle">👁️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE DETALLE CON WHATSAPP */}
      {citaSeleccionada && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-teal-700 text-white p-6 rounded-t-2xl flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{citaSeleccionada.nombre}</h2>
                <p className="text-teal-100 text-sm mt-1">📞 {citaSeleccionada.telefono}</p>
              </div>
              <button onClick={() => setCitaSeleccionada(null)} className="text-white/80 hover:text-white text-2xl">✕</button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Mensaje COMPLETO sin truncar */}
              <div>
                <h3 className="font-semibold text-slate-700 mb-2">💬 Mensaje completo del paciente:</h3>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700 whitespace-pre-wrap">
                  {citaSeleccionada.motivo}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-slate-700 mb-4">📱 Responder por WhatsApp:</h3>
                <div className="space-y-3">
                  <button onClick={() => abrirWhatsApp(citaSeleccionada, 'confirmar')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
                    ✅ Confirmar cita (Enviar WhatsApp)
                  </button>
                  <button onClick={() => abrirWhatsApp(citaSeleccionada, 'reprogramar')}
                    className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition flex items-center justify-center gap-2">
                    🔄 Proponer cambio de hora (Enviar WhatsApp)
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  Se abrirá WhatsApp Web o la App con el mensaje listo para enviar.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}