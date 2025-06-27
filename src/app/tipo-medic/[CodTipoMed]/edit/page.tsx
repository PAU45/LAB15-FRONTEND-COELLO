"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarTipoMedic() {
  const router = useRouter();
  const params = useParams();
  // Asegura que CodTipoMed sea string (puede venir como array)
  const CodTipoMed = Array.isArray(params.CodTipoMed) ? params.CodTipoMed[0] : params.CodTipoMed;

  const [form, setForm] = useState({
    descripcion: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("CodTipoMed:", CodTipoMed);
    if (!CodTipoMed) return;
    const fetchTipo = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/tipo-medic/${CodTipoMed}`);
        if (!res.ok) throw new Error("Error al obtener el tipo");
        const data = await res.json();
        setForm({
          descripcion: data.descripcion || ""
        });
        setLoading(false);
      } catch {
        setLoading(false);
        alert("No se pudo cargar el tipo.");
        router.push("/tipo-medic");
      }
    };
    fetchTipo();
  }, [CodTipoMed, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/api/tipo-medic/${CodTipoMed}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Tipo actualizado correctamente");
        router.push("/tipo-medic");
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo actualizar el tipo.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input
        className="border p-2 w-full"
        placeholder="Descripción"
        value={form.descripcion}
        onChange={e => setForm({ ...form, descripcion: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}