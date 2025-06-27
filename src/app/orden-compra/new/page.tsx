"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createOrdenCompra } from "@//lib/api";

export default function CrearOrdenCompra() {
  const router = useRouter();
  const [form, setForm] = useState({
    fechaEmision: "",
    Situacion: "",
    Total: "",
    CodLab: "",
    NrofacturaProv: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrdenCompra({
      ...form,
      Total: parseFloat(form.Total),
      CodLab: parseInt(form.CodLab)
    });
    router.push('/orden-compra');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" type="date" placeholder="Fecha Emisión" value={form.fechaEmision}
        onChange={e => setForm({ ...form, fechaEmision: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Situación" value={form.Situacion}
        onChange={e => setForm({ ...form, Situacion: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Total" type="number" step="0.01" value={form.Total}
        onChange={e => setForm({ ...form, Total: e.target.value })} />
      <input className="border p-2 w-full" placeholder="CodLab" type="number" value={form.CodLab}
        onChange={e => setForm({ ...form, CodLab: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Nro Factura Proveedor" value={form.NrofacturaProv}
        onChange={e => setForm({ ...form, NrofacturaProv: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}