"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductosPage() {
  type Producto = {
    codProducto: number;
    nomPro: string;
    precioProducto: number;
    stockProducto: number;
  };
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const router = useRouter();

  const fetchProductos = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/productos");
      if (!res.ok) {
        throw new Error("Error al obtener productos");
      }
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("No se pudieron cargar los productos. Intenta nuevamente.");
    }
  };

  const eliminarProducto = async (codProducto: number) => {
    const confirmar = confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmar) return;

    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/productos/${codProducto}`, {
        method: "DELETE",
      });

      if (res.status === 204) {
        alert("Producto eliminado");
        fetchProductos(); // Recargar lista
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>

      <button
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/productos/new')}
      >
        + Agregar Producto
      </button>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.codProducto}>
              <td className="p-2 border text-center">{prod.codProducto}</td>
              <td className="p-2 border">{prod.nomPro}</td>
              <td className="p-2 border">{prod.precioProducto}</td>
              <td className="p-2 border">{prod.stockProducto}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => router.push(`/productos/${prod.codProducto}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(prod.codProducto)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center">
                No hay productos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}