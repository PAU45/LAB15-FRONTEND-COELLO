"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createMedicamento } from "@//lib/api";

export default function CrearMedicamento() {
  const router = useRouter();
  const [form, setForm] = useState({
    descripcionMed: "",
    fechaFabricacion: "",
    fechaVencimiento: "",
    Presentacion: "",
    stock: "",
    precioVentaUni: "",
    precioVentaPres: "",
    CodTipoMed: "",
    CodEspec: "",
    Marca: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createMedicamento({
      ...form,
      stock: parseInt(form.stock),
      precioVentaUni: parseFloat(form.precioVentaUni),
      precioVentaPres: parseFloat(form.precioVentaPres),
      CodTipoMed: parseInt(form.CodTipoMed),
      CodEspec: parseInt(form.CodEspec)
    });
    router.push('/medicamento');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center drop-shadow-lg">Registrar Medicamento</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Fecha de Fabricación</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                type="date"
                value={form.fechaFabricacion}
                onChange={e => setForm({ ...form, fechaFabricacion: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Fecha de Vencimiento</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                type="date"
                value={form.fechaVencimiento}
                onChange={e => setForm({ ...form, fechaVencimiento: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Presentación</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Presentación"
              value={form.Presentacion}
              onChange={e => setForm({ ...form, Presentacion: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Stock</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Precio Unitario</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="Precio Unitario"
                type="number"
                step="0.01"
                value={form.precioVentaUni}
                onChange={e => setForm({ ...form, precioVentaUni: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Precio Presentación</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="Precio Presentación"
                type="number"
                step="0.01"
                value={form.precioVentaPres}
                onChange={e => setForm({ ...form, precioVentaPres: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">CodTipoMed</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="CodTipoMed"
                type="number"
                value={form.CodTipoMed}
                onChange={e => setForm({ ...form, CodTipoMed: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">CodEspec</label>
              <input
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
                placeholder="CodEspec"
                type="number"
                value={form.CodEspec}
                onChange={e => setForm({ ...form, CodEspec: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Marca</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Marca"
              value={form.Marca}
              onChange={e => setForm({ ...form, Marca: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
            Crear
          </button>
          <button type="button" onClick={() => router.push('/medicamento')} className="w-full py-2 mt-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}