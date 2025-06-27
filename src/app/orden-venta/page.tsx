"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdenVentaPage() {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchOrdenes = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/orden-venta");
      if (!res.ok) throw new Error("Error al obtener órdenes");
      const data = await res.json();
      setOrdenes(data);
    } catch {
      setError("No se pudieron cargar las órdenes. Intenta nuevamente.");
    }
  };

  const eliminarOrden = async (NroOrdenVta) => {
    if (!confirm("¿Estás seguro de eliminar esta orden?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/orden-venta/${NroOrdenVta}`, { method: "DELETE" });
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Órdenes de Venta</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/orden-venta/new')}>+ Agregar Orden</button>
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nro Orden</th>
            <th className="p-2 border">Fecha</th>
            <th className="p-2 border">Motivo</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((ord) => (
            <tr key={ord.NroOrdenVta}>
              <td className="p-2 border">{ord.NroOrdenVta}</td>
              <td className="p-2 border">{ord.fechaEmision?.slice(0, 10)}</td>
              <td className="p-2 border">{ord.Motivo}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => router.push(`/orden-venta/${ord.NroOrdenVta}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Editar</button>
                <button onClick={() => eliminarOrden(ord.NroOrdenVta)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
          {ordenes.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center">No hay órdenes disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}