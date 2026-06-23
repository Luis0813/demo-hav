"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Mock Data for Doctor Directory
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  consultory: string;
  price: string;
  schedule: string;
  gender: "M" | "F";
  avatarBg: string;
}

const DOCTORS: Doctor[] = [
  { id: "dr-alejandro-rivas", name: "Dr. Alejandro Rivas", specialty: "Cardiología", consultory: "Cons. 12 (Piso 1)", price: "45 USD", schedule: "Lun, Mié, Vie (08:00 AM - 12:00 PM)", gender: "M", avatarBg: "bg-blue-100 text-blue-700" },
  { id: "dra-elena-vasquez", name: "Dra. Elena Vásquez", specialty: "Cardiología", consultory: "Cons. 15 (Piso 1)", price: "50 USD", schedule: "Mar, Jue (01:00 PM - 05:00 PM)", gender: "F", avatarBg: "bg-teal-100 text-teal-700" },
  { id: "dr-miguel-rojas", name: "Dr. Miguel Rojas", specialty: "Pediatría", consultory: "Cons. 05 (PB)", price: "35 USD", schedule: "Lun a Vie (09:00 AM - 01:00 PM)", gender: "M", avatarBg: "bg-sky-100 text-sky-700" },
  { id: "dra-carmen-silva", name: "Dra. Carmen Silva", specialty: "Pediatría", consultory: "Cons. 08 (PB)", price: "35 USD", schedule: "Lun, Mar, Jue (02:00 PM - 06:00 PM)", gender: "F", avatarBg: "bg-pink-100 text-pink-700" },
  { id: "dra-laura-mendez", name: "Dra. Laura Méndez", specialty: "Ginecología y Obstetricia", consultory: "Cons. 22 (Piso 2)", price: "40 USD", schedule: "Lun, Jue (08:00 AM - 02:00 PM)", gender: "F", avatarBg: "bg-rose-100 text-rose-700" },
  { id: "dr-humberto-gomez", name: "Dr. Humberto Gómez", specialty: "Ginecología y Obstetricia", consultory: "Cons. 25 (Piso 2)", price: "45 USD", schedule: "Mar, Mié, Vie (01:00 PM - 06:00 PM)", gender: "M", avatarBg: "bg-indigo-100 text-indigo-700" },
  { id: "dr-carlos-perez", name: "Dr. Carlos Pérez", specialty: "Traumatología", consultory: "Cons. 10 (Piso 1)", price: "45 USD", schedule: "Mar, Jue, Vie (08:00 AM - 12:00 PM)", gender: "M", avatarBg: "bg-amber-100 text-amber-700" },
  { id: "dr-luis-moreno", name: "Dr. Luis Moreno", specialty: "Traumatología", consultory: "Cons. 11 (Piso 1)", price: "40 USD", schedule: "Lun, Mié (02:00 PM - 06:00 PM)", gender: "M", avatarBg: "bg-emerald-100 text-emerald-700" },
  { id: "dr-roberto-mendoza", name: "Dr. Roberto Mendoza", specialty: "Medicina Interna", consultory: "Cons. 03 (PB)", price: "40 USD", schedule: "Lun a Vie (08:00 AM - 01:00 PM)", gender: "M", avatarBg: "bg-cyan-100 text-cyan-700" },
  { id: "dra-silvia-torres", name: "Dra. Silvia Torres", specialty: "Medicina Interna", consultory: "Cons. 04 (PB)", price: "45 USD", schedule: "Mar, Jue (02:00 PM - 06:00 PM)", gender: "F", avatarBg: "bg-violet-100 text-violet-700" },
  { id: "dra-patricia-colmenares", name: "Dra. Patricia Colmenares", specialty: "Odontología", consultory: "Cons. 30 (Piso 3)", price: "30 USD", schedule: "Lun a Jue (08:00 AM - 12:00 PM)", gender: "F", avatarBg: "bg-purple-100 text-purple-700" },
  { id: "dr-juan-rojas", name: "Dr. Juan C. Rojas", specialty: "Odontología", consultory: "Cons. 31 (Piso 3)", price: "35 USD", schedule: "Mar, Jue, Vie (01:00 PM - 05:00 PM)", gender: "M", avatarBg: "bg-green-100 text-green-700" }
];

// Mock Data for Clinical Exams
const EXAMS = [
  { id: "ex-perfil-20", name: "Perfil 20 Completo (Laboratorio)", category: "Laboratorio Clínico", price: "25 USD", duration: "15 min" },
  { id: "ex-rayos-x", name: "Rayos X de Tórax (Imagenología)", category: "Radiodiagnóstico", price: "20 USD", duration: "20 min" },
  { id: "ex-eco-abdominal", name: "Ecografía Abdominal Completa", category: "Radiodiagnóstico", price: "30 USD", duration: "30 min" },
  { id: "ex-resonancia", name: "Resonancia Magnética (Cerebral/Lumbar)", category: "Imagenología de Alta Res.", price: "120 USD", duration: "45 min" },
  { id: "ex-electro", name: "Electrocardiograma de Esfuerzo", category: "Cardiología Diagnóstica", price: "35 USD", duration: "25 min" },
  { id: "ex-audiometria", name: "Examen de Audiometría Completa", category: "Otorrinolaringología", price: "15 USD", duration: "20 min" }
];

// Mock Data for Surgeries
const SURGERIES = [
  { id: "op-cirugia-vesicula", name: "Colecistectomía (Vesícula por Laparoscopia)", category: "Cirugía General", price: "950 USD", stay: "Ambulatoria / 1 día" },
  { id: "op-hernia", name: "Hernioplastia Inguinal/Umbilical", category: "Cirugía General", price: "700 USD", stay: "Ambulatoria" },
  { id: "op-cesarea", name: "Parto / Cesárea Planificada", category: "Maternidad y Obstetricia", price: "1200 USD", stay: "2 días hospitalización" },
  { id: "op-artroscopia", name: "Artroscopia Diagnóstica de Rodilla", category: "Traumatología y Quirófano", price: "850 USD", stay: "Ambulatoria" }
];

const SPECIALTIES = ["Cardiología", "Pediatría", "Ginecología y Obstetricia", "Traumatología", "Medicina Interna", "Odontología"];

interface Appointment {
  id: string;
  serviceType: "consulta" | "examen" | "operacion";
  specialty: string;
  itemName: string; // Doctor name or exam name or surgery name
  details: string; // consultory / room
  price: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientId: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  createdDate: string;
}

function AgendaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Tab State
  const [activeTab, setActiveTab] = useState<"agendar" | "mis-citas">("agendar");

  // Booking Flow Steps State (1 to 6)
  const [currentStep, setCurrentStep] = useState(1);

  // Form selections
  const [serviceType, setServiceType] = useState<"consulta" | "examen" | "operacion">("consulta");
  const [specialty, setSpecialty] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedExamId, setSelectedExamId] = useState("");
  const [selectedSurgeryId, setSelectedSurgeryId] = useState("");
  
  // Date and time
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Patient Info
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [reason, setReason] = useState("");

  // Storage and list states
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [successAppointment, setSuccessAppointment] = useState<Appointment | null>(null);

  // Trigger search params loading
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "mis-citas") {
      setActiveTab("mis-citas");
    }

    const serviceParam = searchParams.get("service");
    if (serviceParam === "consulta" || serviceParam === "examen" || serviceParam === "operacion") {
      setServiceType(serviceParam);
      setCurrentStep(2); // Jump to Step 2 if service is pre-selected
    }

    const doctorParam = searchParams.get("doctor");
    if (doctorParam) {
      const doc = DOCTORS.find((d) => d.id === doctorParam);
      if (doc) {
        setServiceType("consulta");
        setSpecialty(doc.specialty);
        setSelectedDoctorId(doc.id);
        setCurrentStep(4); // Jump to Date selection
      }
    }
  }, [searchParams]);

  // Load appointments from localStorage
  useEffect(() => {
    const loadAppointments = () => {
      try {
        const stored = localStorage.getItem("hav_appointments");
        if (stored) {
          setMyAppointments(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Error reading appointments", e);
      }
    };
    loadAppointments();
  }, [activeTab]);

  // Dispatch custom event to notify Navbar of updates
  const notifyAppointmentsUpdate = () => {
    window.dispatchEvent(new Event("appointmentsChanged"));
  };

  // Step 1: Handle Service selection
  const handleSelectService = (type: "consulta" | "examen" | "operacion") => {
    setServiceType(type);
    // Reset following states
    setSpecialty("");
    setSelectedDoctorId("");
    setSelectedExamId("");
    setSelectedSurgeryId("");
    setCurrentStep(2);
  };

  // Step 2: Handle Specialty or category selection
  const handleSelectSpecialty = (spec: string) => {
    setSpecialty(spec);
    setCurrentStep(3);
  };

  // Step 3: Handle Doctor / Exam / Surgery selection
  const handleSelectItem = (id: string) => {
    if (serviceType === "consulta") {
      setSelectedDoctorId(id);
    } else if (serviceType === "examen") {
      setSelectedExamId(id);
    } else {
      setSelectedSurgeryId(id);
    }
    setCurrentStep(4);
  };

  // Step 4: Handle Date and Time Selection
  const handleSelectDateTime = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCurrentStep(5);
  };

  // Step 5: Submit booking and generate appointment
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientId || !patientPhone || !patientEmail) {
      alert("Por favor rellene los campos obligatorios");
      return;
    }

    // Determine Item details
    let itemName = "";
    let details = "";
    let price = "";

    if (serviceType === "consulta") {
      const doc = DOCTORS.find((d) => d.id === selectedDoctorId);
      itemName = doc ? doc.name : "";
      details = doc ? `${doc.specialty} - ${doc.consultory}` : "";
      price = doc ? doc.price : "";
    } else if (serviceType === "examen") {
      const exam = EXAMS.find((e) => e.id === selectedExamId);
      itemName = exam ? exam.name : "";
      details = exam ? `${exam.category} (${exam.duration})` : "";
      price = exam ? exam.price : "";
    } else {
      const surg = SURGERIES.find((s) => s.id === selectedSurgeryId);
      itemName = surg ? surg.name : "";
      details = surg ? `${surg.category} - ${surg.stay}` : "";
      price = surg ? surg.price : "";
    }

    const apptId = `HAV-${Math.floor(100000 + Math.random() * 900000)}`;

    const newAppointment: Appointment = {
      id: apptId,
      serviceType,
      specialty: serviceType === "consulta" ? specialty : (serviceType === "examen" ? "Examen Clínico" : "Procedimiento Quirúrgico"),
      itemName,
      details,
      price,
      date: selectedDate,
      timeSlot: selectedTime,
      patientName,
      patientId,
      patientPhone,
      patientEmail,
      reason: reason || "Consulta General",
      createdDate: new Date().toLocaleDateString("es-VE", { dateStyle: "short" })
    };

    try {
      const stored = localStorage.getItem("hav_appointments");
      const currentList: Appointment[] = stored ? JSON.parse(stored) : [];
      const updatedList = [newAppointment, ...currentList];
      localStorage.setItem("hav_appointments", JSON.stringify(updatedList));
      setMyAppointments(updatedList);
      setSuccessAppointment(newAppointment);
      notifyAppointmentsUpdate();
      setCurrentStep(6);
    } catch (e) {
      console.error("Error saving appointment", e);
      alert("Error al procesar la cita. Intente de nuevo.");
    }
  };

  // Cancel an appointment
  const handleCancelAppointment = (id: string) => {
    if (confirm("¿Está seguro de que desea cancelar esta cita programada?")) {
      try {
        const stored = localStorage.getItem("hav_appointments");
        if (stored) {
          const currentList: Appointment[] = JSON.parse(stored);
          const updatedList = currentList.filter((app) => app.id !== id);
          localStorage.setItem("hav_appointments", JSON.stringify(updatedList));
          setMyAppointments(updatedList);
          notifyAppointmentsUpdate();
        }
      } catch (e) {
        console.error("Error canceling appointment", e);
      }
    }
  };

  // Helper to get printable label for service type
  const getServiceLabel = (type: string) => {
    if (type === "consulta") return "Consulta Médica";
    if (type === "examen") return "Examen de Diagnóstico";
    return "Operación / Cirugía";
  };

  // Reset Booking Form
  const handleResetForm = () => {
    setServiceType("consulta");
    setSpecialty("");
    setSelectedDoctorId("");
    setSelectedExamId("");
    setSelectedSurgeryId("");
    setSelectedDate("");
    setSelectedTime("");
    setPatientName("");
    setPatientId("");
    setPatientPhone("");
    setPatientEmail("");
    setReason("");
    setSuccessAppointment(null);
    setCurrentStep(1);
    setActiveTab("agendar");
  };

  // Generate simulated time slots
  const timeSlots = ["08:00 AM", "08:45 AM", "09:30 AM", "10:15 AM", "11:00 AM", "01:30 PM", "02:15 PM", "03:00 PM", "03:45 PM", "04:30 PM"];

  // Generate date options for the next 10 business days
  const getDateOptions = () => {
    const options = [];
    const date = new Date();
    let count = 0;
    while (count < 10) {
      date.setDate(date.getDate() + 1);
      const day = date.getDay();
      if (day !== 0 && day !== 6) { // skip Saturday and Sunday
        options.push({
          iso: date.toISOString().split("T")[0],
          formatted: date.toLocaleDateString("es-VE", { weekday: "short", day: "numeric", month: "short" })
        });
        count++;
      }
    }
    return options;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Title and Tabs header */}
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Portal Digital de Pacientes
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Agenda tus citas médicas presenciales, laboratorios y cirugías sin necesidad de filas o esperas telefónicas.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center pt-4">
            <div className="inline-flex rounded-xl bg-slate-200/80 p-1 border border-slate-200">
              <button
                onClick={() => {
                  setActiveTab("agendar");
                  router.push("/agenda");
                }}
                className={`rounded-lg px-6 py-2.5 text-sm font-bold transition-all ${
                  activeTab === "agendar"
                    ? "bg-white text-clinical-850 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Agendar Cita
              </button>
              <button
                onClick={() => setActiveTab("mis-citas")}
                className={`rounded-lg px-6 py-2.5 text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === "mis-citas"
                    ? "bg-white text-clinical-850 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Mis Citas Reservadas
                {myAppointments.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-clinical-600 px-1 text-2xs font-bold text-white">
                    {myAppointments.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab CONTENT 1: Booking Portal */}
        {activeTab === "agendar" && (
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden animate-fade-in-up">
            
            {/* Step indicator bar */}
            {currentStep < 6 && (
              <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap gap-4">
                <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? "text-clinical-600" : ""}`}>
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-3xs font-bold ${currentStep === 1 ? "bg-clinical-600 text-white" : "bg-slate-200"}`}>1</span>
                  Servicio
                </div>
                <div className="text-slate-300">/</div>
                <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? "text-clinical-600" : ""}`}>
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-3xs font-bold ${currentStep === 2 ? "bg-clinical-600 text-white" : (currentStep > 2 ? "bg-clinical-100 text-clinical-700" : "bg-slate-200")}`}>2</span>
                  Categoría
                </div>
                <div className="text-slate-300">/</div>
                <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? "text-clinical-600" : ""}`}>
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-3xs font-bold ${currentStep === 3 ? "bg-clinical-600 text-white" : (currentStep > 3 ? "bg-clinical-100 text-clinical-700" : "bg-slate-200")}`}>3</span>
                  Médico / Item
                </div>
                <div className="text-slate-300">/</div>
                <div className={`flex items-center gap-1.5 ${currentStep >= 4 ? "text-clinical-600" : ""}`}>
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-3xs font-bold ${currentStep === 4 ? "bg-clinical-600 text-white" : (currentStep > 4 ? "bg-clinical-100 text-clinical-700" : "bg-slate-200")}`}>4</span>
                  Fecha/Hora
                </div>
                <div className="text-slate-300">/</div>
                <div className={`flex items-center gap-1.5 ${currentStep >= 5 ? "text-clinical-600" : ""}`}>
                  <span className={`h-5 w-5 rounded-full flex items-center justify-center text-3xs font-bold ${currentStep === 5 ? "bg-clinical-600 text-white" : "bg-slate-200"}`}>5</span>
                  Datos Paciente
                </div>
              </div>
            )}

            {/* Stepper Body */}
            <div className="p-6 sm:p-10">
              
              {/* STEP 1: Select Service Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2 mb-4">
                    <h2 className="text-xl font-extrabold text-slate-900">¿Qué servicio necesitas programar?</h2>
                    <p className="text-sm text-slate-500">Selecciona el tipo de servicio médico principal.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Consulta Card */}
                    <button
                      onClick={() => handleSelectService("consulta")}
                      className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-slate-200 hover:border-clinical-500 hover:bg-clinical-50/50 hover:shadow-md transition-all duration-200"
                    >
                      <span className="text-3xl mb-3">🩺</span>
                      <span className="font-bold text-slate-950 text-base">Consulta Médica</span>
                      <span className="text-xs text-slate-500 mt-2">Médicos generales y de especialidades.</span>
                    </button>
                    {/* Examen Card */}
                    <button
                      onClick={() => handleSelectService("examen")}
                      className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-slate-200 hover:border-teal-brand-500 hover:bg-teal-brand-50/50 hover:shadow-md transition-all duration-200"
                    >
                      <span className="text-3xl mb-3">🧪</span>
                      <span className="font-bold text-slate-950 text-base">Examen o Diagnóstico</span>
                      <span className="text-xs text-slate-500 mt-2">Laboratorio clínico y estudios de imagen.</span>
                    </button>
                    {/* Operacion Card */}
                    <button
                      onClick={() => handleSelectService("operacion")}
                      className="group flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 hover:shadow-md transition-all duration-200"
                    >
                      <span className="text-3xl mb-3">🏥</span>
                      <span className="font-bold text-slate-950 text-base">Cirugía / Operación</span>
                      <span className="text-xs text-slate-500 mt-2">Intervenciones quirúrgicas programadas.</span>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Specialty / Category */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Seleccionar Categoría</h2>
                      <p className="text-sm text-slate-500">
                        Servicio: <span className="font-semibold text-clinical-600 uppercase text-xs tracking-wider">{getServiceLabel(serviceType)}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50"
                    >
                      Atrás
                    </button>
                  </div>

                  {serviceType === "consulta" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {SPECIALTIES.map((spec) => (
                        <button
                          key={spec}
                          onClick={() => handleSelectSpecialty(spec)}
                          className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-clinical-400 hover:bg-slate-50 font-semibold text-sm text-slate-800 transition-all text-left"
                        >
                          <span>{spec}</span>
                          <span className="text-slate-400">➔</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {serviceType === "examen" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Array.from(new Set(EXAMS.map(e => e.category))).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleSelectSpecialty(cat)}
                          className="flex items-center justify-between p-5 rounded-xl border border-slate-200 hover:border-teal-brand-500 hover:bg-slate-50 font-semibold text-sm text-slate-800 transition-all text-left"
                        >
                          <div>
                            <span className="block text-slate-900">{cat}</span>
                            <span className="text-xs font-normal text-slate-400">Ver exámenes disponibles</span>
                          </div>
                          <span className="text-slate-400">➔</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {serviceType === "operacion" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Array.from(new Set(SURGERIES.map(s => s.category))).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleSelectSpecialty(cat)}
                          className="flex items-center justify-between p-5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-slate-50 font-semibold text-sm text-slate-800 transition-all text-left"
                        >
                          <div>
                            <span className="block text-slate-900">{cat}</span>
                            <span className="text-xs font-normal text-slate-400">Ver procedimientos quirúrgicos</span>
                          </div>
                          <span className="text-slate-400">➔</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Select Doctor / Exam / Surgery */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        {serviceType === "consulta" ? "Seleccione un Médico" : (serviceType === "examen" ? "Seleccione el Examen" : "Seleccione la Cirugía")}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Categoría: <span className="font-semibold text-clinical-600">{specialty}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50"
                    >
                      Atrás
                    </button>
                  </div>

                  {/* Filtered Doctor Cards */}
                  {serviceType === "consulta" && (
                    <div className="grid grid-cols-1 gap-4">
                      {DOCTORS.filter(d => d.specialty === specialty).map((doc) => (
                        <div
                          key={doc.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-xl border border-slate-200 hover:border-clinical-300 hover:bg-slate-50/50 gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center text-sm font-bold ${doc.avatarBg} shrink-0`}>
                              {doc.name.replace("Dr. ", "").replace("Dra. ", "").substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-950 text-sm leading-snug">{doc.name}</h3>
                              <p className="text-xs text-slate-400 font-medium">{doc.specialty} • {doc.consultory}</p>
                              <p className="text-2xs text-slate-500 mt-1">🕒 {doc.schedule}</p>
                            </div>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-0 pt-3 sm:pt-0 gap-2">
                            <div className="text-sm font-bold text-slate-900">
                              Costo: <span className="text-clinical-700">{doc.price}</span>
                            </div>
                            <button
                              onClick={() => handleSelectItem(doc.id)}
                              className="rounded-lg bg-clinical-600 px-4 py-2 text-xs font-bold text-white hover:bg-clinical-700 transition-colors"
                            >
                              Seleccionar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Filtered Exam Cards */}
                  {serviceType === "examen" && (
                    <div className="grid grid-cols-1 gap-4">
                      {EXAMS.filter(e => e.category === specialty).map((exam) => (
                        <div
                          key={exam.id}
                          className="flex items-center justify-between p-5 rounded-xl border border-slate-200 hover:border-teal-brand-500 hover:bg-slate-50/50 gap-4"
                        >
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm leading-snug">{exam.name}</h3>
                            <p className="text-xs text-slate-400 font-medium mt-1">Duración estimada: {exam.duration}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-teal-brand-600">{exam.price}</span>
                            <button
                              onClick={() => handleSelectItem(exam.id)}
                              className="rounded-lg bg-teal-brand-500 px-4 py-2 text-xs font-bold text-white hover:bg-teal-brand-600 transition-colors"
                            >
                              Seleccionar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Filtered Surgery Cards */}
                  {serviceType === "operacion" && (
                    <div className="grid grid-cols-1 gap-4">
                      {SURGERIES.filter(s => s.category === specialty).map((surg) => (
                        <div
                          key={surg.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-slate-50/50 gap-4"
                        >
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm leading-snug">{surg.name}</h3>
                            <p className="text-xs text-slate-400 font-medium mt-1">Hospitalización: {surg.stay}</p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-6">
                            <div className="text-xs text-slate-500">
                              Estimado: <span className="font-bold text-slate-900 text-sm">{surg.price}</span>
                            </div>
                            <button
                              onClick={() => handleSelectItem(surg.id)}
                              className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-white hover:bg-amber-600 transition-colors"
                            >
                              Seleccionar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Choose Date and Time */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Seleccionar Fecha y Hora</h2>
                      <p className="text-sm text-slate-500">Elige un día laboral disponible y un bloque horario.</p>
                    </div>
                    <button
                      onClick={() => {
                        // Go back to step 3, or step 1 if direct doctor selected
                        if (searchParams.get("doctor")) {
                          handleResetForm();
                        } else {
                          setCurrentStep(3);
                        }
                      }}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50"
                    >
                      Atrás
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Dates Column */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Días Disponibles (Próximos 10 días laborales)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {getDateOptions().map((opt) => (
                          <button
                            key={opt.iso}
                            onClick={() => setSelectedDate(opt.iso)}
                            className={`p-3 rounded-lg border text-xs font-semibold transition-all text-center ${
                              selectedDate === opt.iso
                                ? "bg-clinical-600 text-white border-clinical-600 shadow-sm"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <span className="block capitalize">{opt.formatted.split(",")[0]}</span>
                            <span className="block text-sm font-bold">{opt.formatted.split(",")[1]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Slots Column */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                        Horarios Disponibles
                      </label>
                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`p-3 rounded-lg border text-xs font-bold transition-all text-center ${
                                selectedTime === slot
                                  ? "bg-clinical-600 text-white border-clinical-600 shadow-sm"
                                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-slate-400 text-xs font-medium px-4 text-center">
                          Por favor, selecciona primero una fecha de consulta para ver los horarios.
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={() => setCurrentStep(5)}
                        className="rounded-xl bg-gradient-to-r from-clinical-600 to-clinical-700 px-6 py-3 text-sm font-bold text-white shadow-md shadow-clinical-200 hover:shadow-lg transition-all"
                      >
                        Continuar a Datos Paciente ➔
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 5: Patient Details Form */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Datos Personales del Paciente</h2>
                      <p className="text-sm text-slate-500">Ingresa la información requerida para registrar la cita.</p>
                    </div>
                    <button
                      onClick={() => setCurrentStep(4)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-50"
                    >
                      Atrás
                    </button>
                  </div>

                  <form onSubmit={handleConfirmBooking} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="Ej. Juan Pérez"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Cédula de Identidad *
                        </label>
                        <input
                          type="text"
                          required
                          value={patientId}
                          onChange={(e) => setPatientId(e.target.value)}
                          placeholder="Ej. V-12345678"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Teléfono de Contacto *
                        </label>
                        <input
                          type="tel"
                          required
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value)}
                          placeholder="Ej. 0414-1234567"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          value={patientEmail}
                          onChange={(e) => setPatientEmail(e.target.value)}
                          placeholder="Ej. juan.perez@email.com"
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Motivo de Consulta o Notas Adicionales
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Describe brevemente tus síntomas o requerimientos..."
                        rows={3}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-clinical-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between text-xs mt-6 text-slate-600">
                      <div>
                        Cita programada para el <span className="font-bold text-slate-900">{selectedDate}</span> a las <span className="font-bold text-slate-900">{selectedTime}</span>.
                      </div>
                      <div className="font-bold text-clinical-600 text-sm">
                        Total a abonar en sede
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="submit"
                        className="rounded-xl bg-gradient-to-r from-teal-brand-500 to-clinical-600 px-8 py-3 text-sm font-bold text-white shadow-md shadow-clinical-200 hover:shadow-lg transition-all"
                      >
                        Confirmar y Agendar Cita
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 6: Success Confirmation */}
              {currentStep === 6 && successAppointment && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-brand-50 text-teal-brand-500 border border-teal-brand-200 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="h-8 w-8"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  
                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold text-slate-950">¡Cita Agendada Exitosamente!</h2>
                    <p className="text-xs text-teal-brand-600 font-bold tracking-wider uppercase">Cód. Confirmación: {successAppointment.id}</p>
                  </div>

                  {/* Receipt styled Box */}
                  <div className="mx-auto max-w-md border border-slate-200 rounded-2xl bg-slate-50/50 p-6 text-left text-sm space-y-4 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-clinical-600 to-teal-brand-500" />
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Servicio</span>
                      <span className="font-bold text-slate-900 capitalize">{getServiceLabel(successAppointment.serviceType)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Médico / Detalle</span>
                      <span className="font-bold text-slate-900 text-right">{successAppointment.itemName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Ubicación / Sala</span>
                      <span className="font-medium text-slate-700">{successAppointment.details}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Fecha y Hora</span>
                      <span className="font-bold text-slate-950">{successAppointment.date} • {successAppointment.timeSlot}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-medium text-slate-500">Paciente</span>
                      <span className="font-semibold text-slate-800">{successAppointment.patientName} ({successAppointment.patientId})</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-slate-900">Monto Estimado</span>
                      <span className="text-lg font-extrabold text-clinical-600">{successAppointment.price}</span>
                    </div>
                  </div>

                  <p className="text-2xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                    Hemos guardado esta cita en el navegador de tu computadora. Por favor asiste 15 minutos antes de la hora acordada y presenta tu cédula de identidad en taquilla.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button
                      onClick={() => window.print()}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 gap-2.5 shadow-sm"
                    >
                      🖨️ Imprimir Resumen
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-clinical-600 to-clinical-700 px-6 py-3 text-xs font-bold text-white shadow-md shadow-clinical-200 hover:shadow-lg transition-all"
                    >
                      Agendar Nueva Cita
                    </button>
                    <button
                      onClick={() => setActiveTab("mis-citas")}
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 px-6 py-3 text-xs font-bold text-slate-700 transition-colors"
                    >
                      Ver Mis Citas Guardadas
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab CONTENT 2: Appointments list dashboard */}
        {activeTab === "mis-citas" && (
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Mis Citas Agendadas Recientemente</h2>

            {myAppointments.length > 0 ? (
              <div className="space-y-4">
                {myAppointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="border border-slate-100 rounded-xl p-5 hover:border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col md:flex-row justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-3xs font-extrabold uppercase tracking-wider ${
                          appt.serviceType === "consulta"
                            ? "bg-blue-50 text-blue-700 border border-blue-100"
                            : (appt.serviceType === "examen" ? "bg-teal-50 text-teal-700 border border-teal-100" : "bg-amber-50 text-amber-700 border border-amber-100")
                        }`}>
                          {getServiceLabel(appt.serviceType)}
                        </span>
                        <span className="text-3xs font-bold text-slate-400">Cod: {appt.id}</span>
                      </div>
                      
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base">{appt.itemName}</h3>
                        <p className="text-xs text-slate-500 font-medium">{appt.details}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-2xs text-slate-500 font-semibold">
                        <span className="flex items-center gap-1 text-slate-700">
                          📅 {appt.date}
                        </span>
                        <span className="flex items-center gap-1 text-slate-700">
                          🕒 {appt.timeSlot}
                        </span>
                        <span>
                          👤 Paciente: {appt.patientName} ({appt.patientId})
                        </span>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 pt-3 md:pt-0 gap-4 shrink-0">
                      <div className="text-right">
                        <div className="text-2xs font-semibold text-slate-400">Costo Estimado</div>
                        <div className="text-base font-extrabold text-clinical-700">{appt.price}</div>
                      </div>
                      <button
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 px-3.5 py-1.5 text-xs font-bold transition-colors"
                      >
                        Cancelar Cita
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 border-t border-slate-100 text-2xs text-slate-400 text-center">
                  Citas almacenadas localmente en este navegador. Para agendar una cita oficial real, por favor contactar al (+58) 0251-2553355.
                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <span className="text-4xl block">🗓️</span>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">No tienes citas agendadas</h3>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                    Usa el selector de citas para programar tu primera atención en el Hospital Adventista de Venezuela.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("agendar")}
                  className="rounded-xl bg-clinical-600 hover:bg-clinical-700 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-clinical-200 transition-all"
                >
                  Agendar Cita Ahora
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function AgendaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 text-center">
        <div className="space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-clinical-600 mx-auto"></div>
          <p className="text-sm font-semibold text-slate-500">Cargando portal de citas...</p>
        </div>
      </div>
    }>
      <AgendaContent />
    </Suspense>
  );
}
