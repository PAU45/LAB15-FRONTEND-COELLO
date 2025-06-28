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

  if (loading) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcionMed}
        onChange={e => setForm({ ...form, descripcionMed: e.target.value })} />
      <input className="border p-2 w-full" type="date" placeholder="Fecha de Fabricación" value={form.fechaFabricacion}
        onChange={e => setForm({ ...form, fechaFabricacion: e.target.value })} />
      <input className="border p-2 w-full" type="date" placeholder="Fecha de Vencimiento" value={form.fechaVencimiento}
        onChange={e => setForm({ ...form, fechaVencimiento: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Presentación" value={form.Presentacion}
        onChange={e => setForm({ ...form, Presentacion: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Stock" type="number" value={form.stock}
        onChange={e => setForm({ ...form, stock: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Precio Unitario" type="number" step="0.01" value={form.precioVentaUni}
        onChange={e => setForm({ ...form, precioVentaUni: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Precio Presentación" type="number" step="0.01" value={form.precioVentaPres}
        onChange={e => setForm({ ...form, precioVentaPres: e.target.value })} />
      <input className="border p-2 w-full" placeholder="CodTipoMed" type="number" value={form.CodTipoMed}
        onChange={e => setForm({ ...form, CodTipoMed: e.target.value })} />
      <input className="border p-2 w-full" placeholder="CodEspec" type="number" value={form.CodEspec}
        onChange={e => setForm({ ...form, CodEspec: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Marca" value={form.Marca}
        onChange={e => setForm({ ...form, Marca: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Actualizar
      </button>
    </form>
  );
}