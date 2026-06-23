import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const stats = [
    { number: "+70", label: "Años de Trayectoria", icon: "🏆" },
    { number: "+45", label: "Especialistas Médicos", icon: "👨‍⚕️" },
    { number: "24/7", label: "Emergencias Activas", icon: "🚨" },
    { number: "100%", label: "Atención Humanizada", icon: "❤️" },
  ];

  const quickServices = [
    {
      title: "Consultas Médicas",
      description: "Evaluación profesional y diagnóstico preventivo en más de 15 especialidades médicas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-clinical-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801-1.206a2.25 2.25 0 0 0-3.32 0c-.38.403-.605.943-.605 1.544a2.25 2.25 0 0 0 2.25 2.25h3.32a2.25 2.25 0 0 0 2.25-2.25c0-.601-.225-1.14-.605-1.544Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 3.75h.008v.008H18V3.75Zm0 2.25h.008v.008H18V6Zm0 2.25h.008v.008H18V8.25Z" />
        </svg>
      ),
      tag: "Consulte con su especialista",
      link: "/agenda?service=consulta"
    },
    {
      title: "Exámenes y Diagnóstico",
      description: "Laboratorio clínico automatizado, rayos X, ecografías y tomografías con resultados rápidos.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-teal-brand-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v1.244c0 .414-.336.75-.75.75H7.5a.75.75 0 0 0-.75.75v1.244c0 .414-.336.75-.75.75H4.5a.75.75 0 0 0-.75.75v1.244c0 .414-.336.75-.75.75H1.5M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12ZM16.5 10.5h-3m3 3h-3m3 3h-3" />
        </svg>
      ),
      tag: "Resultados en línea",
      link: "/agenda?service=examen"
    },
    {
      title: "Cirugías y Hospitalización",
      description: "Quirófanos equipados para intervenciones generales, ginecológicas y atención de maternidad.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-amber-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
        </svg>
      ),
      tag: "Quirófanos de última generación",
      link: "/agenda?service=operacion"
    }
  ];

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 pt-10 pb-20 lg:pt-16 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(#e0effe_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Text Content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-clinical-50 px-4 py-1.5 text-sm font-semibold text-clinical-700 border border-clinical-100 animate-fade-in-up">
                <span className="flex h-2 w-2 rounded-full bg-clinical-500 animate-ping" />
                Actualización y Modernización 2026
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl leading-tight">
                Cuidamos tu salud con <span className="bg-gradient-to-r from-clinical-600 to-teal-brand-500 bg-clip-text text-transparent">excelencia médica</span> y valores cristianos
              </h1>
              <p className="mx-auto lg:mx-0 max-w-xl text-lg text-slate-600 leading-relaxed">
                En el Hospital Adventista de Venezuela integramos la mejor tecnología de diagnóstico y profesionales dedicados para sanar tu cuerpo, calmar tu mente y reconfortar tu espíritu.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/agenda"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-clinical-600 to-clinical-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-clinical-200 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-clinical-300"
                >
                  Agendar Cita Médica
                </Link>
                <Link
                  href="/medicos"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5"
                >
                  Conocer Médicos
                </Link>
              </div>
            </div>

            {/* Visual Media */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-clinical-600 to-teal-brand-500 opacity-20 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src="/hospital-hav.jpeg"
                    alt="Hospital Adventista de Venezuela"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-y border-slate-200/80 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="text-3xl font-extrabold text-clinical-950 sm:text-4xl">
                  {stat.number}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {stat.icon} {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services / Actions */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-brand-600">
              Nuestros Servicios
            </h2>
            <p className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Atención médica completa al alcance de tu mano
            </p>
            <p className="text-base text-slate-500">
              Selecciona el servicio que necesitas para agendar tu atención inmediata en nuestra sede de Barquisimeto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {quickServices.map((service, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-clinical-200"
              >
                <div className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-clinical-50 group-hover:border-clinical-100 transition-colors">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-clinical-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{service.tag}</span>
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-clinical-600 group-hover:text-clinical-800 transition-colors"
                  >
                    Agendar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holistic Values Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-clinical-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Image/Decoration Column */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
                <div className="text-teal-brand-500 font-bold text-sm tracking-wider uppercase mb-2">
                  Estilo de Vida Saludable
                </div>
                <h3 className="text-2xl font-bold mb-4">El Enfoque de los 8 Remedios Naturales</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Promovemos la curación integral combinando la ciencia médica con los ocho factores de salud instituidos por el Creador:
                </p>
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    💧 Agua Pura
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    ☀️ Luz Solar
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    🥗 Alimentación Sana
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    🌬️ Aire Puro
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    🏃 Ejercicio Físico
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    😴 Descanso Adecuado
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    ⚖️ Temperancia
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg border border-white/5">
                    🙏 Confianza en Dios
                  </div>
                </div>
              </div>
            </div>

            {/* Mision text */}
            <div className="space-y-6">
              <div className="inline-block rounded-full bg-teal-brand-600/20 px-3.5 py-1 text-xs font-semibold text-teal-brand-400 border border-teal-brand-600/30">
                Red Global de Salud Adventista
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sanamos con Amor, Servimos con Esperanza
              </h2>
              <p className="text-slate-300 leading-relaxed">
                Nuestra misión va más allá del cuidado clínico. Nos esforzamos por reflejar el ministerio de Cristo al brindar atención médica de calidad que nutre también el bienestar mental y la fe de cada paciente.
              </p>
              <p className="text-slate-300 leading-relaxed">
                Como parte de una red de salud con presencia internacional en más de 90 países, adoptamos protocolos actualizados y nos enfocamos en programas preventivos de salud para la comunidad barquisimetana.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 border-l-2 border-teal-brand-500 pl-4">
                  <div>
                    <div className="text-sm font-bold text-slate-200">"El Dios del cielo restablecerá tu salud..."</div>
                    <div className="text-xs text-slate-400">Jeremías 30:17</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA Banner */}
      <section className="bg-clinical-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900">
            ¿Listo para programar tu visita médica?
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Utiliza nuestro portal de citas online para reservar tu consulta, laboratorio o examen en menos de 3 minutos. Sin colas y con confirmación inmediata.
          </p>
          <div className="flex justify-center">
            <Link
              href="/agenda"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-clinical-600 to-clinical-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-clinical-200 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Comenzar Registro de Cita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
