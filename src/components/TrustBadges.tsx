// src/components/TrustBadges.tsx
const BADGES = [
  { icono: '🏆', valor: '+15', label: 'Años de experiencia' },
  { icono: '👨‍⚕️', valor: '+2,000', label: 'Pacientes atendidos' },
  { icono: '🛡️', valor: '100%', label: 'Protocolos de bioseguridad' },
  { icono: '💳', valor: 'Todos', label: 'Seguros y tarjetas' },
];

export default function TrustBadges() {
  return (
    <section className="bg-gradient-to-r from-teal-700 to-purple-700 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BADGES.map((badge, i) => (
            <div key={i} className="text-center text-white">
              <div className="text-3xl mb-2">{badge.icono}</div>
              <div className="text-2xl md:text-3xl font-extrabold mb-1">
                {badge.valor}
              </div>
              <div className="text-xs md:text-sm text-teal-100">
                {badge.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}