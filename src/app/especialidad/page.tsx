"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EspecialidadPage() {
  type Especialidad = {
    CodEspec: number;
    descripcionEsp: string;
  };
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchEspecialidades = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/especialidad");
      if (!res.ok) throw new Error("Error al obtener especialidades");
      const data = await res.json();
      setEspecialidades(data);
    } catch {
      setError("No se pudieron cargar las especialidades. Intenta nuevamente.");
    }
  };

  const eliminarEspecialidad = async (CodEspec: number) => {
    if (!confirm("¿Estás seguro de eliminar esta especialidad?")) return;
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/especialidad/${CodEspec}`, { method: "DELETE" });
      if (res.status === 204) {
        alert("Especialidad eliminada");
        fetchEspecialidades();
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo eliminar la especialidad.");
    }
  };

  useEffect(() => { fetchEspecialidades(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Especialidades</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/especialidad/new')}>+ Agregar Especialidad</button>
      {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Código</th>
            <th className="p-2 border">Descripción</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {especialidades.map((esp) => (
            <tr key={esp.CodEspec}>
              <td className="p-2 border">{esp.CodEspec}</td>
              <td className="p-2 border">{esp.descripcionEsp}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => router.push(`/especialidad/${esp.CodEspec}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Editar</button>
                <button onClick={() => eliminarEspecialidad(esp.CodEspec)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
          {especialidades.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center">No hay especialidades disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}