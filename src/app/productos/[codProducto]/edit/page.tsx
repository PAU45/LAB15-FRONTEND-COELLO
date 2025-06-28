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
    return <p>Cargando...</p>; // Muestra un mensaje mientras se cargan los datos
  }

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
        Actualizar
      </button>
    </form>
  );
}