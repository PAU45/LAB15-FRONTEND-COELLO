"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TipoMedicPage() {
  type TipoMedic = {
    CodTipoMed: number;
    descripcion: string;
  };
  const [tipos, setTipos] = useState<TipoMedic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchTipos = async () => {
    try {
      const res = await fetch("https://lab15-backend-coello.onrender.com/api/tipo-medic");
      if (!res.ok) throw new Error("Error al obtener tipos");
      const data = await res.json();
      setTipos(data);
    } catch {
      setError("No se pudieron cargar los tipos. Intenta nuevamente.");
    }
  };

  const eliminarTipo = async (CodTipoMed: number) => {
    if (!confirm("¿Estás seguro de eliminar este tipo?")) return;
    try {
      const res = await fetch(`https://lab15-backend-coello.onrender.com/api/tipo-medic/${CodTipoMed}`, { method: "DELETE" });
      if (res.status === 204) {
        alert("Tipo eliminado");
        fetchTipos();
      } else {
        const data = await res.json();
        alert("Error al eliminar: " + (data.message || "Error desconocido"));
      }
    } catch {
      alert("No se pudo eliminar el tipo.");
    }
  };

  useEffect(() => { fetchTipos(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Tipos de Medicamento</h1>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => router.push('/tipo-medic/new')}>+ Agregar Tipo</button>
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
          {tipos.map((tipo) => (
            <tr key={tipo.CodTipoMed}>
              <td className="p-2 border">{tipo.CodTipoMed}</td>
              <td className="p-2 border">{tipo.descripcion}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => router.push(`/tipo-medic/${tipo.CodTipoMed}/edit`)}
                  className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Editar</button>
                <button onClick={() => eliminarTipo(tipo.CodTipoMed)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
              </td>
            </tr>
          ))}
          {tipos.length === 0 && (
            <tr>
              <td colSpan={3} className="p-4 text-center">No hay tipos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}