"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createDetalleOrdenVta } from "@//lib/api";

export default function CrearDetalleOrdenVta() {
  const router = useRouter();
  const [form, setForm] = useState({
    NroOrdenVta: "",
    CodMedicamento: "",
    descripcionMed: "",
    cantidadRequerida: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createDetalleOrdenVta({
      ...form,
      NroOrdenVta: parseInt(form.NroOrdenVta),
      CodMedicamento: parseInt(form.CodMedicamento),
      cantidadRequerida: parseInt(form.cantidadRequerida)
    });
    router.push('/detalle-orden-vta');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center drop-shadow-lg">Registrar Detalle de Orden de Venta</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nro Orden</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Nro Orden"
              type="number"
              value={form.NroOrdenVta}
              onChange={e => setForm({ ...form, NroOrdenVta: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Cod Medicamento</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Cod Medicamento"
              type="number"
              value={form.CodMedicamento}
              onChange={e => setForm({ ...form, CodMedicamento: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Descripción</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Descripción"
              value={form.descripcionMed}
              onChange={e => setForm({ ...form, descripcionMed: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Cantidad Requerida</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Cantidad Requerida"
              type="number"
              value={form.cantidadRequerida}
              onChange={e => setForm({ ...form, cantidadRequerida: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
            Crear
          </button>
          <button type="button" onClick={() => router.push('/detalle-orden-vta')} className="w-full py-2 mt-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}