"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DetalleOrdenCompraPage() {
  type DetalleOrdenCompra = {
    NroOrdenC: number;
    CodMedicamento: number;
    descripcion?: string;
    cantidad: number;
    precio: number;
    montouni?: number;
  };
  const [detalles, setDetalles] = useState<DetalleOrdenCompra[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDetalles = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/detalle-orden-compra");
      if (!res.ok) throw new Error("Error al obtener detalles");
      const data = await res.json();
      setDetalles(data);
    } catch {
      setError("No se pudieron cargar los detalles. Intenta nuevamente.");
    }
  };

  const eliminarDetalle = async (NroOrdenC: number, CodMedicamento: number) => {
    if (!confirm("¿Estás seguro de eliminar este detalle?")) return;
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/detalle-orden-compra/${NroOrdenC}/${CodMedicamento}`, { method: "DELETE" });
      if (res.status === 204) {
        alert("Detalle eliminado");
        fetchDetalles();
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo eliminar el detalle.");
    }
  };

  useEffect(() => { fetchDetalles(); }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-4xl border border-gray-200 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">Lista de Detalles de Orden de Compra</h1>
          <button
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={() => router.push('/detalle-orden-compra/new')}
          >
            + Agregar Detalle
          </button>
        </div>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200 shadow">
            {error}
          </div>
        )}
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-sm text-gray-700 border border-gray-200 bg-white">
            <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
              <tr>
                <th className="p-3 font-bold text-left border-b border-gray-200">Nro Orden</th>
                <th className="p-3 font-bold text-left border-b border-gray-200">Cod Medicamento</th>
                <th className="p-3 font-bold text-left border-b border-gray-200">Cantidad</th>
                <th className="p-3 font-bold text-left border-b border-gray-200">Precio</th>
                <th className="p-3 font-bold text-left border-b border-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((det) => (
                <tr key={det.NroOrdenC + "-" + det.CodMedicamento} className="hover:bg-purple-50 transition-colors">
                  <td className="p-3 border-b border-gray-100">{det.NroOrdenC}</td>
                  <td className="p-3 border-b border-gray-100">{det.CodMedicamento}</td>
                  <td className="p-3 border-b border-gray-100">{det.cantidad}</td>
                  <td className="p-3 border-b border-gray-100">{(det.precio !== undefined && det.precio !== null && !isNaN(Number(det.precio))) ? `S/ ${Number(det.precio).toFixed(2)}` : ''}</td>
                  <td className="p-3 border-b border-gray-100 flex gap-2">
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                      onClick={() => router.push(`/detalle-orden-compra/${det.NroOrdenC}-${det.CodMedicamento}/edit`)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                      onClick={() => eliminarDetalle(det.NroOrdenC, det.CodMedicamento)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {detalles.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">No hay detalles disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}