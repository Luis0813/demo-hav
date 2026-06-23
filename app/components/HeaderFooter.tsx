"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [appointmentCount, setAppointmentCount] = useState(0);

  // Read count of appointments from localStorage
  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem("hav_appointments");
        if (stored) {
          const appointments = JSON.parse(stored);
          setAppointmentCount(appointments.length);
        } else {
          setAppointmentCount(0);
        }
      } catch (e) {
        console.error("Error reading localStorage", e);
      }
    };

    updateCount();
    
    // Listen to custom event when appointments change
    window.addEventListener("appointmentsChanged", updateCount);
    // Also update on focus
    window.addEventListener("focus", updateCount);
    
    return () => {
      window.removeEventListener("appointmentsChanged", updateCount);
      window.removeEventListener("focus", updateCount);
    };
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Médicos", href: "/medicos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-clinical-600 to-teal-brand-500 text-white shadow-md shadow-clinical-200 transition-transform group-hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-clinical-950 leading-none">
                Hospital Adventista
              </span>
              <span className="text-xs font-semibold tracking-wider text-teal-brand-600 uppercase leading-normal">
                de Venezuela
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors hover:text-clinical-600 ${
                  isActive ? "text-clinical-600 border-b-2 border-clinical-600 pb-1" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href="/agenda?tab=mis-citas"
            className={`text-sm font-semibold transition-colors hover:text-clinical-600 flex items-center gap-1.5 ${
              pathname === "/agenda" && pathname.includes("tab=mis-citas") 
                ? "text-clinical-600" 
                : "text-slate-600"
            }`}
          >
            Mis Citas
            {appointmentCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-brand-500 px-1.5 text-2xs font-bold text-white animate-pulse">
                {appointmentCount}
              </span>
            )}
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/agenda"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-clinical-600 to-clinical-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-clinical-200 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-clinical-300 active:translate-y-0"
          >
            Agendar Cita
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
          >
            <span className="sr-only">Abrir menú</span>
            {mobileMenuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="relative">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                {appointmentCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5 rounded-full bg-teal-brand-500" />
                )}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-clinical-600"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/agenda?tab=mis-citas"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-clinical-600"
          >
            <span>Mis Citas</span>
            {appointmentCount > 0 && (
              <span className="rounded-full bg-teal-brand-500 px-2.5 py-0.5 text-xs font-bold text-white">
                {appointmentCount} agendadas
              </span>
            )}
          </Link>
          <div className="pt-4 px-3">
            <Link
              href="/agenda"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-clinical-600 to-clinical-700 py-3 text-center text-sm font-bold text-white shadow-md shadow-clinical-200"
            >
              Agendar Cita Rápida
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Brief */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-brand-500 text-white font-bold">
                +
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Hospital Adventista de Venezuela
              </span>
            </div>
            <p className="text-sm max-w-md">
              Ofrecemos servicios de salud integral con altos estándares de calidad, respaldados por la red global de salud Adventista. Nos enfocamos en el bienestar físico, mental y espiritual de nuestros pacientes.
            </p>
            <div className="flex gap-4 text-xs font-medium text-slate-500 pt-2">
              <span>RIF: J-08516041-0</span>
              <span>•</span>
              <span>Barquisimeto, Lara</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-white transition-colors">
                  Especialidades y Servicios
                </Link>
              </li>
              <li>
                <Link href="/medicos" className="hover:text-white transition-colors">
                  Directorio Médico
                </Link>
              </li>
              <li>
                <Link href="/agenda" className="hover:text-white transition-colors">
                  Agendar Cita Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Contacto y Ubicación
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-teal-brand-500 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <span>
                  Av. Venezuela entre Av. Bracamontes y Av. Los Leones, Barquisimeto, Estado Lara.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-teal-brand-500 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.194-4.172-6.996-6.996l1.293-.97c.362-.271.528-.733.417-1.173L6.763 2.5a2.25 2.25 0 0 0-2.25-2.25H3.13m2.485 5.614-2.485-.291"
                  />
                </svg>
                <span>+58 (0251) 255-3355</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 text-teal-brand-500 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span>admision@hav.com.ve</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Hospital Adventista de Venezuela. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Términos de Servicio</span>
            <span className="hover:text-slate-400 cursor-pointer">Política de Privacidad</span>
            <span className="hover:text-slate-400 cursor-pointer">Soporte Técnico</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
