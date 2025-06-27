"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarOrdenVenta() {
  const router = useRouter();
  const { NroOrdenVta } = useParams();
  const [form, setForm] = useState({
    fechaEmision: "",
    Motivo: "",
    Situacion: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/orden-venta/${NroOrdenVta}`);
        if (!res.ok) throw new Error("Error al obtener la orden");
        const data = await res.json();
        setForm({
          fechaEmision: data.fechaEmision?.slice(0, 10) || "",
          Motivo: data.Motivo || "",
          Situacion: data.Situacion || ""
        });
        setLoading(false);
      } catch {
        alert("No se pudo cargar la orden.");
        router.push("/orden-venta");
      }
    };
    fetchOrden();
  }, [NroOrdenVta, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/orden-venta/${NroOrdenVta}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Orden actualizada correctamente");
        router.push("/orden-venta");
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
      <input className="border p-2 w-full" placeholder="Motivo" value={form.Motivo}
        onChange={e => setForm({ ...form, Motivo: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Situación" value={form.Situacion}
        onChange={e => setForm({ ...form, Situacion: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}