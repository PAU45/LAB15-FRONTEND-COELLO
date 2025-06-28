"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createDetalleOrdenCompra } from "@//lib/api";

export default function CrearDetalleOrdenCompra() {
  const router = useRouter();
  const [form, setForm] = useState({
    NroOrdenC: "",
    CodMedicamento: "",
    descripcion: "",
    cantidad: "",
    precio: "",
    montouni: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createDetalleOrdenCompra({
      ...form,
      NroOrdenC: parseInt(form.NroOrdenC),
      CodMedicamento: parseInt(form.CodMedicamento),
      cantidad: parseInt(form.cantidad),
      precio: parseFloat(form.precio),
      montouni: parseFloat(form.montouni)
    });
    router.push('/detalle-orden-compra');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 mt-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow mb-6 text-center">Crear Detalle Orden de Compra</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Nro Orden</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Nro Orden"
              type="number"
              value={form.NroOrdenC}
              onChange={e => setForm({ ...form, NroOrdenC: e.target.value })}
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
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Cantidad</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="Cantidad"
                type="number"
                value={form.cantidad}
                onChange={e => setForm({ ...form, cantidad: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Precio</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="Precio"
                type="number"
                step="0.01"
                value={form.precio}
                onChange={e => setForm({ ...form, precio: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Monto Unitario</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="Monto Unitario"
                type="number"
                step="0.01"
                value={form.montouni}
                onChange={e => setForm({ ...form, montouni: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
            Crear
          </button>
          <button type="button" onClick={() => router.push('/detalle-orden-compra')} className="w-full py-2 mt-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}