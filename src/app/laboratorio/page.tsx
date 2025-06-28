"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LaboratorioPage() {
  type Laboratorio = {
    CodLab: number;
    razonSocial: string;
    direccion: string;
    telefono: string;
    email: string;
    contacto: string;
  };
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchLaboratorios = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/laboratorio");
      if (!res.ok) throw new Error("Error al obtener laboratorios");
      const data = await res.json();
      setLaboratorios(data);
    } catch {
      setError("No se pudieron cargar los laboratorios. Intenta nuevamente.");
    }
  };

  const eliminarLaboratorio = async (CodLab: number) => {
    if (!confirm("¿Estás seguro de eliminar este laboratorio?")) return;
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/laboratorio/${CodLab}`, { method: "DELETE" });
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-4xl border border-gray-200 mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">Lista de Laboratorios</h1>
          <button
            className="px-5 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={() => router.push('/laboratorio/new')}
          >
            + Agregar Laboratorio
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
                <th className="p-3 font-bold text-left border-b border-gray-200">Código</th>
                <th className="p-3 font-bold text-left border-b border-gray-200">Razón Social</th>
                <th className="p-3 font-bold text-left border-b border-gray-200">Contacto</th>
                <th className="p-3 font-bold text-left border-b border-gray-200">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {laboratorios.map((lab) => (
                <tr key={lab.CodLab} className="hover:bg-purple-50 transition-colors">
                  <td className="p-3 border-b border-gray-100">{lab.CodLab}</td>
                  <td className="p-3 border-b border-gray-100">{lab.razonSocial}</td>
                  <td className="p-3 border-b border-gray-100">{lab.contacto}</td>
                  <td className="p-3 border-b border-gray-100 flex gap-2">
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                      onClick={() => router.push(`/laboratorio/${lab.CodLab}/edit`)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-3 py-1 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition-all"
                      onClick={() => eliminarLaboratorio(lab.CodLab)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {laboratorios.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">No hay laboratorios disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}