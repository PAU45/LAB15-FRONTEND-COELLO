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
        const res = await fetch(`https://lab15-backend-coello.onrender.com/api/orden-venta/${NroOrdenVta}`);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/orden-venta/${NroOrdenVta}`, {
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-4 text-lg text-blue-700 font-semibold">Cargando...</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 mt-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow mb-6 text-center">Editar Orden de Venta</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="date"
            placeholder="Fecha Emisión"
            value={form.fechaEmision}
            onChange={e => setForm({ ...form, fechaEmision: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Motivo"
            value={form.Motivo}
            onChange={e => setForm({ ...form, Motivo: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Situación"
            value={form.Situacion}
            onChange={e => setForm({ ...form, Situacion: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
}