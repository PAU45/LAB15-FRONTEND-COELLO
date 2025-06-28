"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEspecialidad } from "@//lib/api";

export default function CrearEspecialidad() {
  const router = useRouter();
  const [form, setForm] = useState({
    descripcionEsp: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createEspecialidad(form);
    router.push('/especialidad');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Descripción" value={form.descripcionEsp}
        onChange={e => setForm({ ...form, descripcionEsp: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}