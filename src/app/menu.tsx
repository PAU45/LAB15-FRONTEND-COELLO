"use client";

import { useRouter } from "next/navigation";

const menuItems = [
  
  { label: "Medicamentos", color: "from-green-400 to-green-600", path: "/medicamento", icon: "💊" },
  { label: "Laboratorios", color: "from-yellow-400 to-yellow-600", path: "/laboratorio", icon: "🏭" },
  { label: "Especialidades", color: "from-pink-400 to-pink-600", path: "/especialidad", icon: "🩺" },
  { label: "Tipo de Medicamento", color: "from-purple-400 to-purple-600", path: "/tipo-medic", icon: "🔬" },
  { label: "Órdenes de Compra", color: "from-indigo-400 to-indigo-600", path: "/orden-compra", icon: "📝" },
  { label: "Órdenes de Venta", color: "from-red-400 to-red-600", path: "/orden-venta", icon: "🛒" },
  { label: "Detalle Orden de Compra", color: "from-gray-400 to-gray-600", path: "/detalle-orden-compra", icon: "📄" },
  { label: "Detalle Orden de Venta", color: "from-gray-700 to-gray-900", path: "/detalle-orden-vta", icon: "📃" },
];

export default function MenuPrincipal() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="bg-white/80 shadow-xl rounded-2xl p-10 w-full max-w-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-lg">Menú Principal</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-6 py-5 rounded-xl text-lg font-semibold shadow-md transition-all duration-200 bg-gradient-to-r ${item.color} text-white hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${item.color.split(" ")[1].split("-")[1]}`}
              onClick={() => router.push(item.path)}
            >
              <span className="text-2xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <footer className="mt-10 text-gray-500 text-sm opacity-80">Farmacia CRUD &copy; {new Date().getFullYear()}</footer>
    </div>
  );
}
