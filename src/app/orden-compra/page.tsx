"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdenCompraPage() {
  type OrdenCompra = {
    NroOrdenC: number;
    fechaEmision?: string;
    Situacion?: string;
    Total?: number;
  };
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchOrdenes = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/orden-compra");
      if (!res.ok) throw new Error("Error al obtener órdenes");
      const data = await res.json();
      setOrdenes(data);
    } catch {
      setError("No se pudieron cargar las órdenes. Intenta nuevamente.");
    }
  };

  const eliminarOrden = async (NroOrdenC: number) => {
    if (!confirm("¿Estás seguro de eliminar esta orden?")) return;
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/orden-compra/${NroOrdenC}`, { method: "DELETE" });
      if (res.status === 204) {
        alert("Orden eliminada");
        fetchOrdenes();
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo eliminar la orden.");
    }
  };

  useEffect(() => { fetchOrdenes(); }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-4xl border border-gray-200 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">Lista de Órdenes de Compra</h1>
          <button
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={() => router.push('/orden-compra/new')}
          >
            + Agregar Orden
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
                <th className="p-3 font-bold text-gray-700">Nro Orden</th>
                <th className="p-3 font-bold text-gray-700">Fecha</th>
                <th className="p-3 font-bold text-gray-700">Situación</th>
                <th className="p-3 font-bold text-gray-700">Total</th>
                <th className="p-3 font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map((ord) => (
                <tr key={ord.NroOrdenC} className="border-b hover:bg-blue-50 transition">
                  <td className="p-3">{ord.NroOrdenC}</td>
                  <td className="p-3">{ord.fechaEmision?.slice(0, 10)}</td>
                  <td className="p-3">{ord.Situacion}</td>
                  <td className="p-3">
                    {typeof ord.Total === 'number' ? `S/ ${ord.Total.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="p-3 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => router.push(`/orden-compra/${ord.NroOrdenC}/edit`)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 shadow"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarOrden(ord.NroOrdenC)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 shadow"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {ordenes.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    No hay órdenes disponibles.
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