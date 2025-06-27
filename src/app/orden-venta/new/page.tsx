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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrdenVenta(form);
    router.push('/orden-venta');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" type="date" placeholder="Fecha Emisión" value={form.fechaEmision}
        onChange={e => setForm({ ...form, fechaEmision: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Motivo" value={form.Motivo}
        onChange={e => setForm({ ...form, Motivo: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Situación" value={form.Situacion}
        onChange={e => setForm({ ...form, Situacion: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}