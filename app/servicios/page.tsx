import React from "react";
import Link from "next/link";

interface ServiceItem {
  name: string;
  description: string;
  details: string[];
  icon: string;
  colorClass: string;
  badge: string;
  link: string;
}

export default function ServiciosPage() {
  const specialties: ServiceItem[] = [
    {
      name: "Cardiología",
      description: "Evaluación cardiovascular completa, prevención de riesgos cardíacos y tratamientos especializados.",
      details: ["Electrocardiogramas", "Ecocardiogramas", "Monitoreo Holter", "Pruebas de esfuerzo"],
      icon: "❤️",
      colorClass: "border-blue-105 hover:border-blue-300 bg-blue-50/20",
      badge: "Piso 1",
      link: "/agenda?service=consulta"
    },
    {
      name: "Pediatría y Neonatología",
      description: "Control de niño sano, vacunación, emergencias pediátricas y seguimiento de crecimiento.",
      details: ["Control de niño sano", "Evaluación del desarrollo", "Esquema de vacunas", "Emergencias 24h"],
      icon: "👶",
      colorClass: "border-pink-100 hover:border-pink-300 bg-pink-50/20",
      badge: "Planta Baja",
      link: "/agenda?service=consulta"
    },
    {
      name: "Ginecología y Obstetricia",
      description: "Atención integral de la mujer en todas las etapas, control prenatal de alto riesgo y planificación familiar.",
      details: ["Control prenatal", "Citologías / Papanicolaou", "Ecos obstétricos", "Planificación familiar"],
      icon: "👩‍🍼",
      colorClass: "border-rose-100 hover:border-rose-300 bg-rose-50/20",
      badge: "Piso 2",
      link: "/agenda?service=consulta"
    },
    {
      name: "Traumatología y Ortopedia",
      description: "Tratamiento de fracturas, lesiones deportivas, artrosis y corrección de afecciones del sistema motor.",
      details: ["Infiltraciones", "Cirugía artroscópica", "Yesos y férulas", "Fisioterapia"],
      icon: "🦴",
      colorClass: "border-amber-100 hover:border-amber-300 bg-amber-50/20",
      badge: "Piso 1",
      link: "/agenda?service=consulta"
    },
    {
      name: "Medicina Interna",
      description: "Diagnóstico y tratamiento de enfermedades multisistémicas crónicas en adultos.",
      details: ["Hipertensión arterial", "Control de diabetes", "Chequeos ejecutivos", "Gripe y virus"],
      icon: "⚕️",
      colorClass: "border-violet-100 hover:border-violet-300 bg-violet-50/20",
      badge: "Planta Baja",
      link: "/agenda?service=consulta"
    },
    {
      name: "Odontología Integral",
      description: "Salud oral preventiva, ortodoncia, endodoncia, estética dental y cirugía maxilofacial.",
      details: ["Limpieza dental", "Tratamiento de conducto", "Brackets / Ortodoncia", "Extracciones"],
      icon: "🦷",
      colorClass: "border-teal-100 hover:border-teal-300 bg-teal-50/20",
      badge: "Piso 3",
      link: "/agenda?service=consulta"
    }
  ];

  const diagnosticServices = [
    {
      category: "Laboratorio Clínico",
      description: "Procesamiento automatizado de muestras biológicas con entrega de resultados el mismo día.",
      exams: ["Hematología Completa", "Perfil 20", "Exámenes de Hormonas", "Pruebas Inmunológicas", "Uroanálisis y Coprología"],
      icon: "🧪",
      badge: "Automatizado 24h"
    },
    {
      category: "Imagenología Digital",
      description: "Estudios radiológicos y de resonancia con equipos digitales de baja radiación y alta resolución.",
      exams: ["Rayos X Digitales", "Ecografía General y 4D", "Tomografía Computarizada (TAC)", "Resonancia Magnética Abierta", "Mamografía Digital"],
      icon: "📸",
      badge: "Previa Cita"
    },
    {
      category: "Estudios Cardiológicos",
      description: "Pruebas específicas no invasivas para evaluar la función del miocardio.",
      exams: ["Electrocardiograma", "Prueba de Esfuerzo Físico", "Eco-Doppler Color", "Monitoreo Holter Presión/Ritmo"],
      icon: "📈",
      badge: "Cardiólogo de Turno"
    }
  ];

  const surgicalServices = [
    {
      title: "Quirófanos Equipados",
      description: "Salas de operaciones modernas con sistemas de flujo laminar y tecnología de punta para cirugías menores y mayores.",
      details: "Cirugía General, Traumatología, Ginecología y Obstetricia, Urología y Cirugía Pediátrica."
    },
    {
      title: "Unidad de Hospitalización",
      description: "Habitaciones privadas y compartidas acondicionadas con monitoreo, camas eléctricas, aire acondicionado y enfermería dedicada.",
      details: "Cómodas instalaciones para el paciente y su acompañante durante la recuperación."
    },
    {
      title: "Maternidad y Neonatología",
      description: "Salas especiales de parto y retén para garantizar el nacimiento y cuidado inicial de los recién nacidos con incubadoras modernas.",
      details: "Unidad de cuidados intensivos neonatales (UCIN) lista ante cualquier eventualidad."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Especialidades Médicas y Servicios
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Explora las áreas de atención del Hospital Adventista de Venezuela. Contamos con tecnología de vanguardia y profesionales enfocados en tu restauración integral.
          </p>
        </div>

        {/* SECTION 1: Medical Specialties */}
        <section className="space-y-8 mb-20">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="text-2xl">🩺</span>
            <h2 className="text-2xl font-bold text-slate-900">Consultas de Especialistas</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {specialties.map((spec, i) => (
              <div
                key={i}
                className={`group flex flex-col justify-between p-6 rounded-2xl border border-slate-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${spec.colorClass}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{spec.icon}</span>
                    <span className="rounded-full bg-slate-100 border border-slate-200/50 px-2.5 py-0.5 text-3xs font-bold text-slate-500 uppercase tracking-wider">
                      {spec.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-950 mb-2 group-hover:text-clinical-700 transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {spec.description}
                  </p>
                  
                  {/* Bullet list of clinical details */}
                  <div className="space-y-1.5 pt-2">
                    <h4 className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Servicios Comunes:</h4>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-3xs text-slate-600 font-semibold">
                      {spec.details.map((d, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="text-teal-brand-500">•</span> {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                  <Link
                    href={spec.link}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-2 text-xs font-bold text-clinical-600 transition-all hover:bg-clinical-600 hover:text-white hover:border-clinical-600"
                  >
                    Agendar Cita
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: Diagnostics & Labs */}
        <section className="space-y-8 mb-20 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="text-2xl">🧪</span>
            <h2 className="text-2xl font-bold text-slate-900">Laboratorio y Diagnóstico por Imagen</h2>
          </div>
          <p className="text-sm text-slate-500 max-w-xl">
            Realizamos tus exámenes clínicos en instalaciones modernas dentro del mismo hospital para agilizar el diagnóstico.
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-4">
            {diagnosticServices.map((service, i) => (
              <div key={i} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{service.category}</h3>
                    <span className="inline-block bg-teal-brand-50 text-teal-brand-600 text-3xs font-extrabold px-1.5 py-0.5 rounded mt-0.5 uppercase tracking-wider">
                      {service.badge}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-1.5 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h4 className="text-3xs font-bold text-slate-400 uppercase tracking-wider">Pruebas Frecuentes:</h4>
                  <ul className="space-y-1 text-xs text-slate-700 font-semibold">
                    {service.exams.map((exam, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-teal-brand-500 shrink-0">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                        {exam}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-8 border-t border-slate-100 mt-6">
            <Link
              href="/agenda?service=examen"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-brand-500 to-teal-brand-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-teal-100 hover:shadow-lg transition-all"
            >
              Verificar Disponibilidad y Reservar Examen
            </Link>
          </div>
        </section>

        {/* SECTION 3: Quirófano & Hospitalización */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <span className="text-2xl">🏥</span>
            <h2 className="text-2xl font-bold text-slate-900">Hospitalización y Cirugías</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {surgicalServices.map((s, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 space-y-4">
                <div className="text-teal-brand-400 text-xs font-bold uppercase tracking-wider">Servicios Quirúrgicos</div>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.description}</p>
                <div className="text-xs border-t border-slate-800 pt-3 text-slate-300">
                  <span className="font-semibold text-white">Especialidades:</span> {s.details}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-900 p-8 border border-slate-850 flex flex-col md:flex-row items-center justify-between text-white gap-6">
            <div>
              <h3 className="text-lg font-bold">¿Tienes una orden de hospitalización o cirugía programada?</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Nuestro personal de admisiones te ayudará con el presupuesto de quirófanos y el proceso de pre-admisión administrativa.
              </p>
            </div>
            <Link
              href="/agenda?service=operacion"
              className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-white text-slate-900 font-bold px-6 py-3 text-xs shadow-sm hover:bg-slate-50 transition-colors shrink-0"
            >
              Agendar Pre-Admisión Quirúrgica
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
