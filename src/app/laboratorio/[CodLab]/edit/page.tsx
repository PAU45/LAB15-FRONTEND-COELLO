"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarLaboratorio() {
  const router = useRouter();
  const { CodLab } = useParams();
  const [form, setForm] = useState({
    razonSocial: "",
    direccion: "",
    telefono: "",
    email: "",
    contacto: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const res = await fetch(`https://lab15-backend-coello.onrender.com/api/laboratorio/${CodLab}`);
        if (!res.ok) throw new Error("Error al obtener el laboratorio");
        const data = await res.json();
        setForm({
          razonSocial: data.razonSocial || "",
          direccion: data.direccion || "",
          telefono: data.telefono || "",
          email: data.email || "",
          contacto: data.contacto || ""
        });
        setLoading(false);
      } catch {
        alert("No se pudo cargar el laboratorio.");
        router.push("/laboratorio");
      }
    };
    fetchLab();
  }, [CodLab, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/laboratorio/${CodLab}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Laboratorio actualizado correctamente");
        router.push("/laboratorio");
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo actualizar el laboratorio.");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Razón Social" value={form.razonSocial}
        onChange={e => setForm({ ...form, razonSocial: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Dirección" value={form.direccion}
        onChange={e => setForm({ ...form, direccion: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Teléfono" value={form.telefono}
        onChange={e => setForm({ ...form, telefono: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Contacto" value={form.contacto}
        onChange={e => setForm({ ...form, contacto: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}