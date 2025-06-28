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
          cantidad: form.cantidad === "" ? 0 : parseInt(form.cantidad),
          precio: form.precio === "" ? 0 : parseFloat(form.precio),
          montouni: form.montouni === "" ? 0 : parseFloat(form.montouni),
          NroOrdenC: NroOrdenC === undefined || NroOrdenC === null || NroOrdenC === "" ? null : parseInt(NroOrdenC),
          CodMedicamento: CodMedicamento === undefined || CodMedicamento === null || CodMedicamento === "" ? null : parseInt(CodMedicamento)
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <span className="ml-4 text-lg text-blue-700 font-semibold">Cargando...</span>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 mt-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow mb-6 text-center">Editar Detalle Orden de Compra</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Descripción"
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Cantidad"
            type="number"
            value={form.cantidad}
            onChange={e => setForm({ ...form, cantidad: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Precio"
            type="number"
            step="0.01"
            value={form.precio}
            onChange={e => setForm({ ...form, precio: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Monto Unitario"
            type="number"
            step="0.01"
            value={form.montouni}
            onChange={e => setForm({ ...form, montouni: e.target.value })}
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