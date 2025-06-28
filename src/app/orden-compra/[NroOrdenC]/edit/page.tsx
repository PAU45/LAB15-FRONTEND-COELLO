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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-4 text-lg text-blue-700 font-semibold">Cargando...</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 mt-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow mb-6 text-center">Editar Orden de Compra</h2>
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
            placeholder="Situación"
            value={form.Situacion}
            onChange={e => setForm({ ...form, Situacion: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Total"
            type="number"
            step="0.01"
            value={form.Total}
            onChange={e => setForm({ ...form, Total: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="CodLab"
            type="number"
            value={form.CodLab}
            onChange={e => setForm({ ...form, CodLab: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Nro Factura Proveedor"
            value={form.NrofacturaProv}
            onChange={e => setForm({ ...form, NrofacturaProv: e.target.value })}
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