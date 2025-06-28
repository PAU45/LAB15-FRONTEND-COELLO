"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOrdenVenta } from "@//lib/api";

export default function CrearOrdenVenta() {
  const router = useRouter();
  const [form, setForm] = useState({
    fechaEmision: "",
    Motivo: "",
    Situacion: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createOrdenVenta(form);
    router.push('/orden-venta');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 mt-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow mb-6 text-center">Crear Orden de Venta</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="date"
            placeholder="Fecha Emisión"
            value={form.fechaEmision}
            onChange={e => setForm({ ...form, fechaEmision: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Motivo"
            value={form.Motivo}
            onChange={e => setForm({ ...form, Motivo: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Situación"
            value={form.Situacion}
            onChange={e => setForm({ ...form, Situacion: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}