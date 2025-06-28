"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createLaboratorio } from "@//lib/api";

export default function CrearLaboratorio() {
  const router = useRouter();
  const [form, setForm] = useState({
    razonSocial: "",
    direccion: "",
    telefono: "",
    email: "",
    contacto: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createLaboratorio(form);
    router.push('/laboratorio');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
      <input className="border p-2 w-full" placeholder="Razón Social" value={form.razonSocial}
        onChange={e => setForm({ ...form, razonSocial: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Dirección" value={form.direccion}
        onChange={e => setForm({ ...form, direccion: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Teléfono" value={form.telefono}
        onChange={e => setForm({ ...form, telefono: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Contacto" value={form.contacto}
        onChange={e => setForm({ ...form, contacto: e.target.value })} />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear
      </button>
    </form>
  );
}