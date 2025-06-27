"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LaboratorioPage() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchLaboratorios = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/laboratorio");
      if (!res.ok) throw new Error("Error al obtener laboratorios");
      const data = await res.json();
      setLaboratorios(data);
    } catch {
      setError("No se pudieron cargar los laboratorios. Intenta nuevamente.");
    }
  };

  const eliminarLaboratorio = async (CodLab) => {
    if (!confirm("¿Estás seguro de eliminar este laboratorio?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/laboratorio/${CodLab}`, { method: "DELETE" });
      if (res.status === 204) {
        alert("Laboratorio eliminado");
        fetchLaboratorios();
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo eliminar el laboratorio.");
    }
  };

  useEffect(() => { fetchLaboratorios(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Laboratorios</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/laboratorio/new')}>+ Agregar Laboratorio</button>
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Razón Social</th>
            <th className="p-2 border">Contacto</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {laboratorios.map((lab) => (
            <tr key={lab.CodLab}>
              <td className="p-2 border">{lab.CodLab}</td>
              <td className="p-2 border">{lab.razonSocial}</td>
              <td className="p-2 border">{lab.contacto}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => router.push(`/laboratorio/${lab.CodLab}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Editar</button>
                <button onClick={() => eliminarLaboratorio(lab.CodLab)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
          {laboratorios.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center">No hay laboratorios disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}