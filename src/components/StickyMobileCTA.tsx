// src/components/StickyMobileCTA.tsx
'use client';

const BUSINESS = {
  telefono: "0412-3922855",
  whatsapp: "584123922855", // Formato internacional sin el + ni espacios
};

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)] p-3 flex gap-3 safe-area-bottom">
      {/* Botón WhatsApp */}
      <a 
        href={`https://wa.me/${BUSINESS.whatsapp}?text=Hola,%20quisiera%20agendar%20una%20cita%20con%20la%20Dra.%20Ismenia`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-green-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition active:scale-95"
      >
        <span className="text-lg">💬</span>
        <span>WhatsApp</span>
      </a>
      
      {/* Botón Llamar */}
      <a 
        href={`tel:${BUSINESS.telefono}`}
        className="flex-1 bg-teal-700 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-teal-800 transition active:scale-95"
      >
        <span className="text-lg">📞</span>
        <span>Llamar</span>
      </a>
    </div>
  );
}