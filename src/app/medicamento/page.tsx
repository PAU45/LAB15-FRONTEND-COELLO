"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MedicamentoPage() {
  type Medicamento = {
    CodMedicamento: number;
    descripcionMed: string;
    fechaFabricacion?: string;
    fechaVencimiento?: string;
    Presentacion?: string;
    stock?: number;
    precioVentaUni?: number;
    precioVentaPres?: number;
    CodTipoMed?: number;
    CodEspec?: number;
    Marca?: string;
  };
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchMedicamentos = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/medicamentos");
      if (!res.ok) throw new Error("Error al obtener medicamentos");
      const data = await res.json();
      setMedicamentos(data);
    } catch {
      setError("No se pudieron cargar los medicamentos. Intenta nuevamente.");
    }
  };

  const eliminarMedicamento = async (CodMedicamento: number) => {
    if (!confirm("¿Estás seguro de eliminar este medicamento?")) return;
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/medicamentos/${CodMedicamento}`, { method: "DELETE" });
      if (res.status === 204) {
        alert("Medicamento eliminado");
        fetchMedicamentos();
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo eliminar el medicamento.");
    }
  };

  useEffect(() => { fetchMedicamentos(); }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-6xl border border-gray-200 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">Lista de Medicamentos</h1>
          <button
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={() => router.push('/medicamento/new')}
          >
            + Agregar Medicamento
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
                <th className="p-3 font-bold text-gray-700">Descripción</th>
                <th className="p-3 font-bold text-gray-700">F. Fabricación</th>
                <th className="p-3 font-bold text-gray-700">F. Vencimiento</th>
                <th className="p-3 font-bold text-gray-700">Presentación</th>
                <th className="p-3 font-bold text-gray-700">Stock</th>
                <th className="p-3 font-bold text-gray-700">Precio Unitario</th>
                <th className="p-3 font-bold text-gray-700">Precio Presentación</th>
                <th className="p-3 font-bold text-gray-700">CodTipoMed</th>
                <th className="p-3 font-bold text-gray-700">CodEspec</th>
                <th className="p-3 font-bold text-gray-700">Marca</th>
                <th className="p-3 font-bold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {medicamentos.map((med) => (
                <tr key={med.CodMedicamento} className="border-b hover:bg-blue-50 transition">
                  <td className="p-3">{med.CodMedicamento}</td>
                  <td className="p-3">{med.descripcionMed}</td>
                  <td className="p-3">{med.fechaFabricacion?.slice(0, 10)}</td>
                  <td className="p-3">{med.fechaVencimiento?.slice(0, 10)}</td>
                  <td className="p-3">{med.Presentacion}</td>
                  <td className="p-3">{med.stock}</td>
                  <td className="p-3">S/ {typeof med.precioVentaUni === 'number' && !isNaN(med.precioVentaUni) ? med.precioVentaUni.toFixed(2) : '0.00'}</td>
                  <td className="p-3">S/ {typeof med.precioVentaPres === 'number' && !isNaN(med.precioVentaPres) ? med.precioVentaPres.toFixed(2) : '0.00'}</td>
                  <td className="p-3">{med.CodTipoMed}</td>
                  <td className="p-3">{med.CodEspec}</td>
                  <td className="p-3">{med.Marca}</td>
                  <td className="p-3 flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => router.push(`/medicamento/${med.CodMedicamento}/edit`)}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-lg font-semibold hover:bg-yellow-500 shadow"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarMedicamento(med.CodMedicamento)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 shadow"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {medicamentos.length === 0 && (
                <tr>
                  <td colSpan={12} className="p-6 text-center text-gray-500">
                    No hay medicamentos disponibles.
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