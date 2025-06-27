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

  const handleSubmit = async (e) => {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcionMed}
        onChange={e => setForm({ ...form, descripcionMed: e.target.value })} />
      <input className="border p-2 w-full" type="date" placeholder="Fecha de Fabricación" value={form.fechaFabricacion}
        onChange={e => setForm({ ...form, fechaFabricacion: e.target.value })} />
      <input className="border p-2 w-full" type="date" placeholder="Fecha de Vencimiento" value={form.fechaVencimiento}
        onChange={e => setForm({ ...form, fechaVencimiento: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Presentación" value={form.Presentacion}
        onChange={e => setForm({ ...form, Presentacion: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Stock" type="number" value={form.stock}
        onChange={e => setForm({ ...form, stock: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Precio Unitario" type="number" step="0.01" value={form.precioVentaUni}
        onChange={e => setForm({ ...form, precioVentaUni: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Precio Presentación" type="number" step="0.01" value={form.precioVentaPres}
        onChange={e => setForm({ ...form, precioVentaPres: e.target.value })} />
      <input className="border p-2 w-full" placeholder="CodTipoMed" type="number" value={form.CodTipoMed}
        onChange={e => setForm({ ...form, CodTipoMed: e.target.value })} />
      <input className="border p-2 w-full" placeholder="CodEspec" type="number" value={form.CodEspec}
        onChange={e => setForm({ ...form, CodEspec: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Marca" value={form.Marca}
        onChange={e => setForm({ ...form, Marca: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}