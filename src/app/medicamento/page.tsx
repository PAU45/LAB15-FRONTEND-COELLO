"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MedicamentoPage() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchMedicamentos = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/medicamentos");
      if (!res.ok) throw new Error("Error al obtener medicamentos");
      const data = await res.json();
      setMedicamentos(data);
    } catch (error) {
      setError("No se pudieron cargar los medicamentos. Intenta nuevamente.");
    }
  };

  const eliminarMedicamento = async (CodMedicamento) => {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Medicamentos</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/medicamento/new')}>+ Agregar Medicamento</button>
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Código</th>
              <th className="p-2 border">Descripción</th>
              <th className="p-2 border">F. Fabricación</th>
              <th className="p-2 border">F. Vencimiento</th>
              <th className="p-2 border">Presentación</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Precio Unitario</th>
              <th className="p-2 border">Precio Presentación</th>
              <th className="p-2 border">CodTipoMed</th>
              <th className="p-2 border">CodEspec</th>
              <th className="p-2 border">Marca</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((med) => (
              <tr key={med.CodMedicamento}>
                <td className="p-2 border text-center">{med.CodMedicamento}</td>
                <td className="p-2 border">{med.descripcionMed}</td>
                <td className="p-2 border">{med.fechaFabricacion?.slice(0, 10)}</td>
                <td className="p-2 border">{med.fechaVencimiento?.slice(0, 10)}</td>
                <td className="p-2 border">{med.Presentacion}</td>
                <td className="p-2 border">{med.stock}</td>
                <td className="p-2 border">{med.precioVentaUni}</td>
                <td className="p-2 border">{med.precioVentaPres}</td>
                <td className="p-2 border">{med.CodTipoMed}</td>
                <td className="p-2 border">{med.CodEspec}</td>
                <td className="p-2 border">{med.Marca}</td>
                <td className="p-2 border space-x-2">
                  <button onClick={() => router.push(`/medicamento/${med.CodMedicamento}/edit`)}
                    className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Editar</button>
                  <button onClick={() => eliminarMedicamento(med.CodMedicamento)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
                </td>
              </tr>
            ))}
            {medicamentos.length === 0 && (
              <tr>
                <td colSpan={12} className="p-4 text-center">No hay medicamentos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}