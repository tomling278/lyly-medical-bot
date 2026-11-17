'use client';
import { useState } from 'react';
import Image from 'next/image';
import TestimonialsSection from '@/components/TestimonialsSection';
import ServicesSection from '@/components/ServicesSection';
import TrustBadges from '@/components/TrustBadges';
const BUSINESS = {
  nombre: "Dra. Ismenia Ávila",
  subtitulo: "Odontología Operatoria y Estética",
  telefono: "0412-3922855",
  direccion: "Calle 4 con carreras 10 y 11, Qta. Don Rafael, Lechería",
  horario: "Lunes a Viernes: 8:00 AM - 5:00 PM"
};

export default function HomePage() {
  const [chatAbierto, setChatAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<{role: 'user' | 'assistant', texto: string}[]>([
    { role: 'assistant', texto: `¡Hola! 👋 Bienvenidos a ${BUSINESS.nombre}. ¿En qué podemos atenderte hoy?` }
  ]);
  const [input, setInput] = useState('');
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async () => {
    if (!input.trim() || cargando) return;
    const nuevoMensaje = { role: 'user' as const, texto: input };
    const historial = [...mensajes, nuevoMensaje];
    setMensajes(historial);
    setInput('');
    setCargando(true);

    try {
      const res = await fetch('/api/webhook-medical', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensajes: historial })
      });
      const data = await res.json();
      setMensajes(prev => [...prev, { role: 'assistant', texto: data.respuesta }]);
    } catch (error) {
      setMensajes(prev => [...prev, { role: 'assistant', texto: `Error. Llama al ${BUSINESS.telefono}` }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 shrink-0">
              <Image 
                src="/images/logo.jpg" 
                alt="Logo Dra. Ismenia Ávila" 
                fill
                sizes="48px"
                priority
                className="object-contain"
              />
            </div>
            <div className="leading-tight">
              <h1 className="font-bold text-lg text-slate-900">{BUSINESS.nombre}</h1>
              <p className="text-xs text-slate-500">{BUSINESS.subtitulo}</p>
            </div>
          </div>
          <a href="/admin" className="text-sm font-medium text-slate-600 hover:text-teal-700 transition">Panel Admin →</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-4">ATENCIÓN PERSONALIZADA</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Recupera tu confianza con una <span className="text-teal-700">sonrisa saludable</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Tecnología de vanguardia y ambiente cálido para tu comodidad en Lechería.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setChatAbierto(true)} className="bg-teal-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-teal-800 transition shadow-lg">💬 Agendar Cita Ahora</button>
            <a href={`tel:${BUSINESS.telefono}`} className="border-2 border-slate-200 text-slate-700 px-8 py-3.5 rounded-xl font-semibold hover:border-teal-700 transition text-center">📞 {BUSINESS.telefono}</a>
          </div>
        </div>
      </header>
            <TrustBadges />

      {/* Galería de Instalaciones (CORREGIDA Y LIMPIA) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">NUESTRAS INSTALACIONES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Conoce nuestro consultorio</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: '/images/fachada.jpg', label: 'Fachada Principal' },
              { src: '/images/consultorio1.jpg', label: 'Consultorio 1' },
              { src: '/images/consultorio2.jpg', label: 'Consultorio 2' },
              { src: '/images/consultorio3.jpg', label: 'Consultorio 3' },
            ].map((img, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden shadow-md aspect-square group bg-slate-100">
                <Image 
                  src={img.src} 
                  alt={img.label} 
                  fill 
                  sizes="(max-width: 768px) 50vw, 25vw" 
                  loading="lazy" 
                  className="object-cover group-hover:scale-110 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                  <span className="text-white text-sm font-medium">{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            

      {/* Info Section */}
            {/* Galería de Instalaciones */}
      <section className="py-16 bg-white">
         
      </section>
            <ServicesSection />

      {/* 👇 AGREGA ESTA LÍNEA AQUÍ 👇 */}
      <TestimonialsSection />

      {/* Info Section (Ubicación, Horario...) */}
      <section className="py-16 bg-slate-50">
         
      </section>
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="font-bold text-lg mb-2">Ubicación</h3>
            <p className="text-slate-600 text-sm">{BUSINESS.direccion}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="text-3xl mb-3">🕒</div>
            <h3 className="font-bold text-lg mb-2">Horario</h3>
            <p className="text-slate-600 text-sm">{BUSINESS.horario}</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="font-bold text-lg mb-2">Bioseguridad</h3>
            <p className="text-slate-600 text-sm">Protocolos estrictos de esterilización.</p>
          </div>
        </div>
      </section>

      {/* Chat Widget Flotante */}
      {chatAbierto && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden">
          <div className="bg-teal-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🤖</div>
              <div><h3 className="font-bold text-sm">Asistente Virtual</h3><p className="text-xs text-teal-100">● En línea</p></div>
            </div>
            <button onClick={() => setChatAbierto(false)} className="text-white/80 hover:text-white text-xl">✕</button>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {mensajes.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-teal-700 text-white rounded-br-none' : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'}`}>{m.texto}</div>
              </div>
            ))}
            {cargando && <div className="flex justify-start"><div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm"><div className="flex gap-1"><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span><span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span></div></div></div>}
          </div>
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()} placeholder="Escribe tu mensaje..." className="flex-1 bg-slate-100 border-0 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
            <button onClick={enviarMensaje} disabled={cargando || !input.trim()} className="bg-teal-700 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-teal-800 transition disabled:opacity-50">➤</button>
          </div>
        </div>
      )}

      {!chatAbierto && (
        <button onClick={() => setChatAbierto(true)} className="fixed bottom-6 right-6 bg-teal-700 text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-teal-800 hover:scale-110 transition z-40">💬</button>
      )}

      <footer className="bg-slate-900 text-white py-8"><div className="max-w-6xl mx-auto px-4 text-center"><p className="text-sm text-slate-400">© 2026 {BUSINESS.nombre}. Todos los derechos reservados.</p></div></footer>
    </div>
  );
}