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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-3xl border border-gray-200 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">Lista de Productos</h1>
          <button
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={() => router.push('/productos/new')}
          >
            + Agregar Producto
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 shadow">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-center bg-white rounded-xl">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="p-3 font-bold text-gray-700">Código</th>
                <th className="p-3 font-bold text-gray-700">Nombre</th>
                <th className="p-3 font-bold text-gray-700">Precio</th>
                <th className="p-3 font-bold text-gray-700">Stock</th>
                <th className="p-3 font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.codProducto} className="border-b hover:bg-blue-50 transition">
                  <td className="p-3">{prod.codProducto}</td>
                  <td className="p-3">{prod.nomPro}</td>
                  <td className="p-3">S/ {prod.precioProducto.toFixed(2)}</td>
                  <td className="p-3">{prod.stockProducto}</td>
                  <td className="p-3 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => router.push(`/productos/${prod.codProducto}/edit`)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 shadow"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarProducto(prod.codProducto)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 shadow"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {productos.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No hay productos disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}