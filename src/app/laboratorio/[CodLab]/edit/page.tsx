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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
        <div className="bg-white/90 shadow-xl rounded-2xl p-8 border border-gray-200">
          <span className="text-lg font-semibold text-gray-700 animate-pulse">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center drop-shadow-lg">Editar Laboratorio</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Razón Social</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Razón Social"
              value={form.razonSocial}
              onChange={e => setForm({ ...form, razonSocial: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Dirección</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Dirección"
              value={form.direccion}
              onChange={e => setForm({ ...form, direccion: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Teléfono</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={e => setForm({ ...form, telefono: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Contacto</label>
            <input
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all shadow-sm bg-white"
              placeholder="Contacto"
              value={form.contacto}
              onChange={e => setForm({ ...form, contacto: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200">
            Actualizar
          </button>
          <button type="button" onClick={() => router.push('/laboratorio')} className="w-full py-2 mt-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}