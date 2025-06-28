"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarMedicamento() {
  const router = useRouter();
  const { CodMedicamento } = useParams();
  const [form, setForm] = useState({
    descripcionMed: "",
    fechaFabricacion: "",
    fechaVencimiento: "",
    Presentacion: "",
    stock: "",
    precioVentaUni: "",
    precioVentaPres: "",
    CodTipoMed: "",
    CodEspec: "",
    Marca: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicamento = async () => {
      try {
        const res = await fetch(`https://lab15-backend-coello.onrender.com/api/medicamentos/${CodMedicamento}`);
        if (!res.ok) throw new Error("Error al obtener el medicamento");
        const data = await res.json();
        setForm({
          descripcionMed: data.descripcionMed || "",
          fechaFabricacion: data.fechaFabricacion?.slice(0, 10) || "",
          fechaVencimiento: data.fechaVencimiento?.slice(0, 10) || "",
          Presentacion: data.Presentacion || "",
          stock: data.stock?.toString() || "",
          precioVentaUni: data.precioVentaUni?.toString() || "",
          precioVentaPres: data.precioVentaPres?.toString() || "",
          CodTipoMed: data.CodTipoMed?.toString() || "",
          CodEspec: data.CodEspec?.toString() || "",
          Marca: data.Marca || ""
        });
        setLoading(false);
      } catch {
        alert("No se pudo cargar el medicamento.");
        router.push("/medicamento");
      }
    };
    fetchMedicamento();
  }, [CodMedicamento, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/medicamentos/${CodMedicamento}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stock: parseInt(form.stock),
          precioVentaUni: parseFloat(form.precioVentaUni),
          precioVentaPres: parseFloat(form.precioVentaPres),
          CodTipoMed: parseInt(form.CodTipoMed),
          CodEspec: parseInt(form.CodEspec)
        }),
      });
      if (res.ok) {
        alert("Medicamento actualizado correctamente");
        router.push("/medicamento");
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo actualizar el medicamento.");
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
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow mb-6 text-center">Editar Medicamento</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Descripción"
            value={form.descripcionMed}
            onChange={e => setForm({ ...form, descripcionMed: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="date"
            placeholder="Fecha de Fabricación"
            value={form.fechaFabricacion}
            onChange={e => setForm({ ...form, fechaFabricacion: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            type="date"
            placeholder="Fecha de Vencimiento"
            value={form.fechaVencimiento}
            onChange={e => setForm({ ...form, fechaVencimiento: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Presentación"
            value={form.Presentacion}
            onChange={e => setForm({ ...form, Presentacion: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={e => setForm({ ...form, stock: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Precio Unitario"
            type="number"
            step="0.01"
            value={form.precioVentaUni}
            onChange={e => setForm({ ...form, precioVentaUni: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Precio Presentación"
            type="number"
            step="0.01"
            value={form.precioVentaPres}
            onChange={e => setForm({ ...form, precioVentaPres: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="CodTipoMed"
            type="number"
            value={form.CodTipoMed}
            onChange={e => setForm({ ...form, CodTipoMed: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="CodEspec"
            type="number"
            value={form.CodEspec}
            onChange={e => setForm({ ...form, CodEspec: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Marca"
            value={form.Marca}
            onChange={e => setForm({ ...form, Marca: e.target.value })}
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