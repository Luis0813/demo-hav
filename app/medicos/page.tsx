"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  consultory: string;
  price: string;
  schedule: string;
  gender: "M" | "F";
  avatarBg: string;
  bio: string;
}

const DOCTORS: Doctor[] = [
  { id: "dr-alejandro-rivas", name: "Dr. Alejandro Rivas", specialty: "Cardiología", consultory: "Cons. 12 (Piso 1)", price: "45 USD", schedule: "Lun, Mié, Vie (08:00 AM - 12:00 PM)", gender: "M", avatarBg: "bg-blue-100 text-blue-700", bio: "Especialista en cardiología clínica y prevención cardiovascular, graduado con honores con 15 años de experiencia." },
  { id: "dra-elena-vasquez", name: "Dra. Elena Vásquez", specialty: "Cardiología", consultory: "Cons. 15 (Piso 1)", price: "50 USD", schedule: "Mar, Jue (01:00 PM - 05:00 PM)", gender: "F", avatarBg: "bg-teal-100 text-teal-700", bio: "Cardióloga pediatra dedicada al diagnóstico y tratamiento de cardiopatías congénitas y adquiridas en niños." },
  { id: "dr-miguel-rojas", name: "Dr. Miguel Rojas", specialty: "Pediatría", consultory: "Cons. 05 (PB)", price: "35 USD", schedule: "Lun a Vie (09:00 AM - 01:00 PM)", gender: "M", avatarBg: "bg-sky-100 text-sky-700", bio: "Médico pediatra enfocado en el crecimiento integral del niño sano y patologías pediátricas frecuentes." },
  { id: "dra-carmen-silva", name: "Dra. Carmen Silva", specialty: "Dra. Carmen Silva", specialty2: "Pediatría", consultory: "Cons. 08 (PB)", price: "35 USD", schedule: "Lun, Mar, Jue (02:00 PM - 06:00 PM)", gender: "F", avatarBg: "bg-pink-100 text-pink-700", bio: "Puericultora con amplia trayectoria en nutrición infantil y control de desarrollo del lactante y preescolar." } as any,
  { id: "dra-laura-mendez", name: "Dra. Laura Méndez", specialty: "Ginecología y Obstetricia", consultory: "Cons. 22 (Piso 2)", price: "40 USD", schedule: "Lun, Jue (08:00 AM - 02:00 PM)", gender: "F", avatarBg: "bg-rose-100 text-rose-700", bio: "Ginecóloga y obstetra dedicada al control de embarazos normales y de alto riesgo, y salud reproductiva." },
  { id: "dr-humberto-gomez", name: "Dr. Humberto Gómez", specialty: "Ginecología y Obstetricia", consultory: "Cons. 25 (Piso 2)", price: "45 USD", schedule: "Mar, Mié, Vie (01:00 PM - 06:00 PM)", gender: "M", avatarBg: "bg-indigo-100 text-indigo-700", bio: "Subespecialista en ginecología oncológica, cirugía mínimamente invasiva y patologías del tracto reproductor." },
  { id: "dr-carlos-perez", name: "Dr. Carlos Pérez", specialty: "Traumatología", consultory: "Cons. 10 (Piso 1)", price: "45 USD", schedule: "Mar, Jue, Vie (08:00 AM - 12:00 PM)", gender: "M", avatarBg: "bg-amber-100 text-amber-700", bio: "Traumatólogo y ortopedista especialista en reemplazos articulares de cadera y rodilla, y artrosis." },
  { id: "dr-luis-moreno", name: "Dr. Luis Moreno", specialty: "Traumatología", consultory: "Cons. 11 (Piso 1)", price: "40 USD", schedule: "Lun, Mié (02:00 PM - 06:00 PM)", gender: "M", avatarBg: "bg-emerald-100 text-emerald-700", bio: "Especialista en traumatología deportiva, lesiones de ligamentos, meniscos y rehabilitación acelerada." },
  { id: "dr-roberto-mendoza", name: "Dr. Roberto Mendoza", specialty: "Medicina Interna", consultory: "Cons. 03 (PB)", price: "40 USD", schedule: "Lun a Vie (08:00 AM - 01:00 PM)", gender: "M", avatarBg: "bg-cyan-100 text-cyan-700", bio: "Internista dedicado al manejo y control integral de la hipertensión, diabetes y síndrome metabólico en adultos." },
  { id: "dra-silvia-torres", name: "Dra. Silvia Torres", specialty: "Medicina Interna", consultory: "Cons. 04 (PB)", price: "45 USD", schedule: "Mar, Jue (02:00 PM - 06:00 PM)", gender: "F", avatarBg: "bg-violet-100 text-violet-700", bio: "Especialista en medicina interna con mención en endocrinología, control tiroideo y hormonal." },
  { id: "dra-patricia-colmenares", name: "Dra. Patricia Colmenares", specialty: "Odontología", consultory: "Cons. 30 (Piso 3)", price: "30 USD", schedule: "Lun a Jue (08:00 AM - 12:00 PM)", gender: "F", avatarBg: "bg-purple-100 text-purple-700", bio: "Odontóloga general especialista en odontología estética, limpiezas ultrasónicas y diseño de sonrisa." },
  { id: "dr-juan-rojas", name: "Dr. Juan C. Rojas", specialty: "Odontología", consultory: "Cons. 31 (Piso 3)", price: "35 USD", schedule: "Mar, Jue, Vie (01:00 PM - 05:00 PM)", gender: "M", avatarBg: "bg-green-100 text-green-700", bio: "Ortodoncista y cirujano bucal con experiencia en alineación dental y extracción de cordales sin dolor." }
];

// Quick patch for the Pediatría typo in array initialization
DOCTORS[3].specialty = "Pediatría";

const SPECIALTIES = ["Todos", "Cardiología", "Pediatría", "Ginecología y Obstetricia", "Traumatología", "Medicina Interna", "Odontología"];

export default function MedicosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Todos");

  // Filter Doctors list
  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "Todos" || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Directorio Médico Especializado
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Conoce a nuestro personal médico altamente capacitado en Barquisimeto. Filtra por especialidad médica y reserva tu cita directamente con el profesional de tu preferencia.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar médico por nombre o especialidad..."
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-clinical-500 focus:outline-none bg-slate-50"
            />
          </div>

          {/* Specialty Filters buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {SPECIALTIES.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
                  selectedSpecialty === spec
                    ? "bg-clinical-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-clinical-200 transition-all duration-200"
              >
                <div className="space-y-4">
                  {/* Doctor Details Header */}
                  <div className="flex items-center gap-3">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center text-lg font-bold ${doc.avatarBg} shrink-0`}>
                      {doc.name.replace("Dr. ", "").replace("Dra. ", "").substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-950 text-base leading-tight group-hover:text-clinical-700 transition-colors">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-slate-600">{doc.specialty}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-3xs text-slate-400 font-bold uppercase tracking-wider">{doc.consultory}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    "{doc.bio}"
                  </p>

                  {/* Doctor Schedule and Price Box */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-2xs text-slate-600 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">🕒 Horario:</span>
                      <span>{doc.schedule}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400">💰 Consulta:</span>
                      <span className="text-clinical-700 font-bold">{doc.price}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <Link
                    href={`/agenda?doctor=${doc.id}`}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-clinical-600 to-clinical-700 py-3 text-center text-xs font-bold text-white shadow-sm hover:shadow-md transition-all"
                  >
                    Agendar Cita con {doc.name.split(" ")[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl space-y-4">
            <span className="text-4xl block">🔍</span>
            <div>
              <h3 className="font-bold text-slate-800 text-base">No se encontraron especialistas</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Intenta ajustar la búsqueda o seleccionar otra especialidad médica en los filtros superiores.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
