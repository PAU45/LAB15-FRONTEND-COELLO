"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarOrdenCompra() {
  const router = useRouter();
  const { NroOrdenC } = useParams();
  const [form, setForm] = useState({
    fechaEmision: "",
    Situacion: "",
    Total: "",
    CodLab: "",
    NrofacturaProv: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const res = await fetch(`https://lab15-backend-coello.onrender.com/api/orden-compra/${NroOrdenC}`);
        if (!res.ok) throw new Error("Error al obtener la orden");
        const data = await res.json();
        setForm({
          fechaEmision: data.fechaEmision?.slice(0, 10) || "",
          Situacion: data.Situacion || "",
          Total: data.Total?.toString() || "",
          CodLab: data.CodLab?.toString() || "",
          NrofacturaProv: data.NrofacturaProv || ""
        });
        setLoading(false);
      } catch {
        alert("No se pudo cargar la orden.");
        router.push("/orden-compra");
      }
    };
    fetchOrden();
  }, [NroOrdenC, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/orden-compra/${NroOrdenC}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          Total: parseFloat(form.Total),
          CodLab: parseInt(form.CodLab)
        }),
      });
      if (res.ok) {
        alert("Orden actualizada correctamente");
        router.push("/orden-compra");
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo actualizar la orden.");
    }
  };

  if (loading) return <p>Cargando...</p>;

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
        Actualizar
      </button>
    </form>
  );
}