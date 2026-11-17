// src/components/TestimonialsSection.tsx
'use client';
import { useState, useEffect } from 'react';

interface Testimonio {
  id: string;
  nombre: string;
  texto: string;
  rating: number;
  tratamiento: string;
  fecha: string;
}

// Datos de ejemplo (luego los cambiaremos por los reales de la Dra. Ismenia)
const TESTIMONIOS: Testimonio[] = [
  {
    id: '1',
    nombre: 'María González',
    texto: 'Excelente atención. La Dra. Ismenia es muy profesional y el consultorio es impecable. Me hice un blanqueamiento y quedó perfecto.',
    rating: 5,
    tratamiento: 'Blanqueamiento Dental',
    fecha: 'Octubre 2026',
  },
  {
    id: '2',
    nombre: 'Carlos Ramírez',
    texto: 'Tenía mucho miedo al dentista, pero aquí me trataron con mucha paciencia. El tratamiento fue indoloro. 100% recomendado.',
    rating: 5,
    tratamiento: 'Endodoncia',
    fecha: 'Septiembre 2026',
  },
  {
    id: '3',
    nombre: 'Ana Martínez',
    texto: 'Llevé a mi hijo de 7 años y salió feliz. La doctora tiene mucha mano con los niños. El ambiente es muy agradable.',
    rating: 5,
    tratamiento: 'Odontopediatría',
    fecha: 'Agosto 2026',
  },
];

export default function TestimonialsSection() {
  const [activo, setActivo] = useState(0);

  // Auto-rotación cada 5 segundos para resaltar uno
  useEffect(() => {
    const intervalo = setInterval(() => {
      setActivo((prev) => (prev + 1) % TESTIMONIOS.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
            TESTIMONIOS REALES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            La satisfacción de nuestros pacientes es nuestra mejor carta de presentación.
          </p>
        </div>

        {/* Grid de Testimonios */}
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIOS.map((t, index) => (
            <div
              key={t.id}
              className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 ${
                index === activo
                  ? 'border-teal-300 shadow-lg scale-105'
                  : 'border-slate-100 hover:shadow-md'
              }`}
            >
              {/* Estrellas */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${i < t.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Texto */}
              <p className="text-slate-700 mb-6 italic leading-relaxed">
                "{t.texto}"
              </p>

              {/* Autor */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {t.nombre.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{t.nombre}</div>
                  <div className="text-xs text-teal-600 font-medium">{t.tratamiento}</div>
                  <div className="text-xs text-slate-400">{t.fecha}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Puntos de navegación */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActivo(i)}
              className={`h-2 rounded-full transition-all ${
                i === activo ? 'bg-teal-600 w-8' : 'bg-slate-300 w-2'
              }`}
              aria-label={`Ver testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}