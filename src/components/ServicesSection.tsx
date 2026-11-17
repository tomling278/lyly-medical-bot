// src/components/ServicesSection.tsx
const SERVICIOS = [
  {
    icono: '✨',
    nombre: 'Blanqueamiento Dental',
    descripcion: 'Recupera el brillo natural de tus dientes con tecnología LED de última generación.',
  },
  {
    icono: '😁',
    nombre: 'Ortodoncia y Brackets',
    descripcion: 'Alinea tu sonrisa con brackets tradicionales o invisibles, según tu preferencia.',
  },
  {
    icono: '🦷',
    nombre: 'Limpieza Profesional',
    descripcion: 'Eliminación profunda de sarro y placa para mantener tus encías saludables.',
  },
  {
    icono: '🔬',
    nombre: 'Endodoncia',
    descripcion: 'Tratamiento de conducto indoloro con equipos de alta precisión.',
  },
  {
    icono: '💎',
    nombre: 'Odontología Estética',
    descripcion: 'Carillas, resinas y diseño de sonrisa para lucir una sonrisa perfecta.',
  },
  {
    icono: '👶',
    nombre: 'Odontopediatría',
    descripcion: 'Atención especializada y cariñosa para los más pequeños de la casa.',
  },
  {
    icono: '🩺',
    nombre: 'Extracciones Simples',
    descripcion: 'Procedimientos seguros y rápidos con anestesia localizada.',
  },
  {
    icono: '📋',
    nombre: 'Consulta de Diagnóstico',
    descripcion: 'Evaluación completa con plan de tratamiento personalizado.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
            NUESTROS SERVICIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Tratamientos especializados para tu sonrisa
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios odontológicos con la más alta calidad y tecnología.
          </p>
        </div>

        {/* Grid de Servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICIOS.map((servicio, i) => (
            <div
              key={i}
              className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-teal-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                {servicio.icono}
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-lg">
                {servicio.nombre}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {servicio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}