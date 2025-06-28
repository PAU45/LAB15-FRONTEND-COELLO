"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTipoMedic } from "@//lib/api";

export default function CrearTipoMedic() {
  const router = useRouter();
  const [form, setForm] = useState({
    descripcion: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTipoMedic(form);
    router.push('/tipo-medic');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcion}
        onChange={e => setForm({ ...form, descripcion: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}