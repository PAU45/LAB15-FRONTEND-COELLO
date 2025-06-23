"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProducto } from "@//lib/api"; // Assuming this path is correct for your project structure

export default function CrearProducto() {
  const router = useRouter();
  const [form, setForm] = useState({ nomPro: "", precioProducto: "", stockProducto: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProducto({
      ...form,
      precioProducto: parseFloat(form.precioProducto),
      stockProducto: parseInt(form.stockProducto),
    });
    router.push('/productos');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input
        className="border p-2 w-full"
        placeholder="Nombre"
        value={form.nomPro}
        onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Precio"
        type="number"
        step="0.01"
        value={form.precioProducto}
        onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Stock"
        type="number"
        value={form.stockProducto}
        onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}