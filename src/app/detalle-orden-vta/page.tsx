"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DetalleOrdenVtaPage() {
  type DetalleOrdenVta = {
    NroOrdenVta: number;
    CodMedicamento: number;
    cantidadRequerida: number;
    descripcionMed?: string;
  };
  const [detalles, setDetalles] = useState<DetalleOrdenVta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDetalles = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/detalle-orden-vta");
      if (!res.ok) throw new Error("Error al obtener detalles");
      const data = await res.json();
      setDetalles(data);
    } catch {
      setError("No se pudieron cargar los detalles. Intenta nuevamente.");
    }
  };

  const eliminarDetalle = async (NroOrdenVta: number, CodMedicamento: number) => {
    if (!confirm("¿Estás seguro de eliminar este detalle?")) return;
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/detalle-orden-vta/${NroOrdenVta}/${CodMedicamento}`, { method: "DELETE" });
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Detalles de Orden de Venta</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/detalle-orden-vta/new')}>+ Agregar Detalle</button>
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Nro Orden</th>
            <th className="p-2 border">Cod Medicamento</th>
            <th className="p-2 border">Cantidad</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detalles.map((det) => (
            <tr key={det.NroOrdenVta + "-" + det.CodMedicamento}>
              <td className="p-2 border">{det.NroOrdenVta}</td>
              <td className="p-2 border">{det.CodMedicamento}</td>
              <td className="p-2 border">{det.cantidadRequerida}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => router.push(`/detalle-orden-vta/${det.NroOrdenVta}-${det.CodMedicamento}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Editar</button>
                <button onClick={() => eliminarDetalle(det.NroOrdenVta, det.CodMedicamento)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
          {detalles.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center">No hay detalles disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}