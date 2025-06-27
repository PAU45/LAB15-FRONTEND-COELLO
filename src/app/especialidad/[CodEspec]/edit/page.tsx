"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarEspecialidad() {
  const router = useRouter();
  const { CodEspec } = useParams();
  const [form, setForm] = useState({
    descripcionEsp: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEsp = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/especialidad/${CodEspec}`);
        if (!res.ok) throw new Error("Error al obtener la especialidad");
        const data = await res.json();
        setForm({
          descripcionEsp: data.descripcionEsp || ""
        });
        setLoading(false);
      } catch {
        alert("No se pudo cargar la especialidad.");
        router.push("/especialidad");
      }
    };
    fetchEsp();
  }, [CodEspec, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/especialidad/${CodEspec}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Especialidad actualizada correctamente");
        router.push("/especialidad");
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo actualizar la especialidad.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcionEsp}
        onChange={e => setForm({ ...form, descripcionEsp: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}