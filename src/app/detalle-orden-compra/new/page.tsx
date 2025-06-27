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

  const handleSubmit = async (e) => {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Nro Orden" type="number" value={form.NroOrdenC}
        onChange={e => setForm({ ...form, NroOrdenC: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Cod Medicamento" type="number" value={form.CodMedicamento}
        onChange={e => setForm({ ...form, CodMedicamento: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcion}
        onChange={e => setForm({ ...form, descripcion: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Cantidad" type="number" value={form.cantidad}
        onChange={e => setForm({ ...form, cantidad: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Precio" type="number" step="0.01" value={form.precio}
        onChange={e => setForm({ ...form, precio: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Monto Unitario" type="number" step="0.01" value={form.montouni}
        onChange={e => setForm({ ...form, montouni: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}