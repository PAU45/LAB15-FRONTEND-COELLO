"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarDetalleOrdenVta() {
  const router = useRouter();
  const { NroOrdenVta, CodMedicamento } = useParams();
  const [form, setForm] = useState({
    descripcionMed: "",
    cantidadRequerida: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/detalle-orden-vta/${NroOrdenVta}/${CodMedicamento}`);
        if (!res.ok) throw new Error("Error al obtener el detalle");
        const data = await res.json();
        setForm({
          descripcionMed: data.descripcionMed || "",
          cantidadRequerida: data.cantidadRequerida?.toString() || ""
        });
        setLoading(false);
      } catch {
        alert("No se pudo cargar el detalle.");
        router.push("/detalle-orden-vta");
      }
    };
    fetchDetalle();
  }, [NroOrdenVta, CodMedicamento, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/detalle-orden-vta/${NroOrdenVta}/${CodMedicamento}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          cantidadRequerida: parseInt(form.cantidadRequerida)
        }),
      });
      if (res.ok) {
        alert("Detalle actualizado correctamente");
        router.push("/detalle-orden-vta");
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
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcionMed}
        onChange={e => setForm({ ...form, descripcionMed: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Cantidad Requerida" type="number" value={form.cantidadRequerida}
        onChange={e => setForm({ ...form, cantidadRequerida: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}