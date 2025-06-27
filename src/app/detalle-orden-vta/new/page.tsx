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

  const handleSubmit = async (e) => {
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Nro Orden" type="number" value={form.NroOrdenVta}
        onChange={e => setForm({ ...form, NroOrdenVta: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Cod Medicamento" type="number" value={form.CodMedicamento}
        onChange={e => setForm({ ...form, CodMedicamento: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcionMed}
        onChange={e => setForm({ ...form, descripcionMed: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Cantidad Requerida" type="number" value={form.cantidadRequerida}
        onChange={e => setForm({ ...form, cantidadRequerida: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}