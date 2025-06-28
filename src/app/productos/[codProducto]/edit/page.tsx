"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditarProducto() {
  const router = useRouter();
  const { codProducto } = useParams(); // Obtiene el código del producto desde la URL
  const [form, setForm] = useState({ nomPro: "", precioProducto: "", stockProducto: "" });
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos

  // Función para obtener los datos del producto desde la API
  const fetchProducto = async () => {
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/productos/${codProducto}`);
      if (!res.ok) {
        throw new Error("Error al obtener el producto");
      }
      const data = await res.json();
      setForm({
        nomPro: data.nomPro,
        precioProducto: data.precioProducto.toString(),
        stockProducto: data.stockProducto.toString(),
      });
      setLoading(false); // Datos cargados
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      alert("No se pudo cargar el producto. Intenta nuevamente.");
      router.push("/productos"); // Redirige si hay un error
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchProducto(); // Carga los datos del producto al montar el componente
  }, [codProducto]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/productos/${codProducto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          precioProducto: parseFloat(form.precioProducto),
          stockProducto: parseInt(form.stockProducto),
        }),
      });

      if (res.ok) {
        alert("Producto actualizado correctamente");
        router.push("/productos"); // Redirige a la lista de productos
      } else {
        const data = await res.json();
        alert("Error al actualizar: " + (data.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("No se pudo actualizar el producto. Intenta nuevamente.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-lg text-blue-700 font-semibold">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 mt-8">
        <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow mb-6 text-center">Editar Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Nombre"
            value={form.nomPro}
            onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Precio"
            type="number"
            step="0.01"
            value={form.precioProducto}
            onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
          />
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Stock"
            type="number"
            value={form.stockProducto}
            onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
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