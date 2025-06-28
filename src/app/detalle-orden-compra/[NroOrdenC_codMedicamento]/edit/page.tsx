"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarDetalleOrdenCompra() {
  const router = useRouter();
  const { NroOrdenC, CodMedicamento } = useParams();
  const [form, setForm] = useState({
    descripcion: "",
    cantidad: "",
    precio: "",
    montouni: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await fetch(`https://lab15-backend-coello.onrender.com/api/detalle-orden-compra/${NroOrdenC}/${CodMedicamento}`);
        if (!res.ok) throw new Error("Error al obtener el detalle");
        const data = await res.json();
        setForm({
          descripcion: data.descripcion || "",
          cantidad: data.cantidad?.toString() || "",
          precio: data.precio?.toString() || "",
          montouni: data.montouni?.toString() || ""
        });
        setLoading(false);
      } catch {
        alert("No se pudo cargar el detalle.");
        router.push("/detalle-orden-compra");
      }
    };
    fetchDetalle();
  }, [NroOrdenC, CodMedicamento, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/detalle-orden-compra/${NroOrdenC}/${CodMedicamento}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cantidad: parseInt(form.cantidad),
          precio: parseFloat(form.precio),
          montouni: parseFloat(form.montouni)
        }),
      });
      if (res.ok) {
        alert("Detalle actualizado correctamente");
        router.push("/detalle-orden-compra");
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo actualizar el detalle.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcion}
        onChange={e => setForm({ ...form, descripcion: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Cantidad" type="number" value={form.cantidad}
        onChange={e => setForm({ ...form, cantidad: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Precio" type="number" step="0.01" value={form.precio}
        onChange={e => setForm({ ...form, precio: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Monto Unitario" type="number" step="0.01" value={form.montouni}
        onChange={e => setForm({ ...form, montouni: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}