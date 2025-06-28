// Función auxiliar robusta para parsear JSON solo si hay contenido y es JSON
async function safeJson(res) {
  if (res.status === 204) return null;
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text; // Si no es JSON, devuelve el texto plano
  }
}

// PRODUCTOS
const BASE_URL_PRODUCTOS = 'https://lab15-backend-coello.onrender.com/api/productos';

export async function getProductos() {
  const res = await fetch(BASE_URL_PRODUCTOS);
  return safeJson(res);
}
export async function getProducto(id) {
  const res = await fetch(`${BASE_URL_PRODUCTOS}/${id}`);
  return safeJson(res);
}
export async function createProducto(producto) {
  const res = await fetch(BASE_URL_PRODUCTOS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return safeJson(res);
}
export async function updateProducto(id, producto) {
  const res = await fetch(`${BASE_URL_PRODUCTOS}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return safeJson(res);
}
export async function deleteProducto(id) {
  const res = await fetch(`${BASE_URL_PRODUCTOS}/${id}`, { method: 'DELETE' });
  return safeJson(res);
}

// MEDICAMENTO
const BASE_URL_MEDICAMENTO = 'https://lab15-backend-coello.onrender.com/api/medicamentos';

export async function getMedicamentos() {
  const res = await fetch(BASE_URL_MEDICAMENTO);
  return safeJson(res);
}
export async function getMedicamento(id) {
  const res = await fetch(`${BASE_URL_MEDICAMENTO}/${id}`);
  return safeJson(res);
}
export async function createMedicamento(medicamento) {
  const res = await fetch(BASE_URL_MEDICAMENTO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento)
  });
  return safeJson(res);
}
export async function updateMedicamento(id, medicamento) {
  const res = await fetch(`${BASE_URL_MEDICAMENTO}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(medicamento)
  });
  return safeJson(res);
}
export async function deleteMedicamento(id) {
  const res = await fetch(`${BASE_URL_MEDICAMENTO}/${id}`, { method: 'DELETE' });
  return safeJson(res);
}

// DETALLE ORDEN COMPRA
const BASE_URL_DETALLE_OC = 'https://lab15-backend-coello.onrender.com/api/detalle-orden-compra';

export async function getDetalleOrdenCompra() {
  const res = await fetch(BASE_URL_DETALLE_OC);
  return safeJson(res);
}
export async function getDetalleOrdenCompraById(nro, cod) {
  const res = await fetch(`${BASE_URL_DETALLE_OC}/${nro}/${cod}`);
  return safeJson(res);
}
export async function createDetalleOrdenCompra(detalle) {
  const res = await fetch(BASE_URL_DETALLE_OC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(detalle)
  });
  return safeJson(res);
}
export async function updateDetalleOrdenCompra(nro, cod, detalle) {
  const res = await fetch(`${BASE_URL_DETALLE_OC}/${nro}/${cod}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(detalle)
  });
  return safeJson(res);
}
export async function deleteDetalleOrdenCompra(nro, cod) {
  const res = await fetch(`${BASE_URL_DETALLE_OC}/${nro}/${cod}`, { method: 'DELETE' });
  return safeJson(res);
}

// ORDEN COMPRA
const BASE_URL_ORDEN_COMPRA = 'https://lab15-backend-coello.onrender.com/api/orden-compra';

export async function getOrdenesCompra() {
  const res = await fetch(BASE_URL_ORDEN_COMPRA);
  return safeJson(res);
}
export async function getOrdenCompra(id) {
  const res = await fetch(`${BASE_URL_ORDEN_COMPRA}/${id}`);
  return safeJson(res);
}
export async function createOrdenCompra(orden) {
  const res = await fetch(BASE_URL_ORDEN_COMPRA, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  });
  return safeJson(res);
}
export async function updateOrdenCompra(id, orden) {
  const res = await fetch(`${BASE_URL_ORDEN_COMPRA}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  });
  return safeJson(res);
}
export async function deleteOrdenCompra(id) {
  const res = await fetch(`${BASE_URL_ORDEN_COMPRA}/${id}`, { method: 'DELETE' });
  return safeJson(res);
}

// LABORATORIO
const BASE_URL_LABORATORIO = 'https://lab15-backend-coello.onrender.com/api/laboratorio';

export async function getLaboratorios() {
  const res = await fetch(BASE_URL_LABORATORIO);
  return safeJson(res);
}
export async function getLaboratorio(id) {
  const res = await fetch(`${BASE_URL_LABORATORIO}/${id}`);
  return safeJson(res);
}
export async function createLaboratorio(lab) {
  const res = await fetch(BASE_URL_LABORATORIO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lab)
  });
  return safeJson(res);
}
export async function updateLaboratorio(id, lab) {
  const res = await fetch(`${BASE_URL_LABORATORIO}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lab)
  });
  return safeJson(res);
}
export async function deleteLaboratorio(id) {
  const res = await fetch(`${BASE_URL_LABORATORIO}/${id}`, { method: 'DELETE' });
  return safeJson(res);
}

// DETALLE ORDEN VENTA
const BASE_URL_DETALLE_OV = 'https://lab15-backend-coello.onrender.com/api/detalle-orden-vta';

export async function getDetalleOrdenVta() {
  const res = await fetch(BASE_URL_DETALLE_OV);
  return safeJson(res);
}
export async function getDetalleOrdenVtaById(nro, cod) {
  const res = await fetch(`${BASE_URL_DETALLE_OV}/${nro}/${cod}`);
  return safeJson(res);
}
export async function createDetalleOrdenVta(detalle) {
  const res = await fetch(BASE_URL_DETALLE_OV, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(detalle)
  });
  return safeJson(res);
}
export async function updateDetalleOrdenVta(nro, cod, detalle) {
  const res = await fetch(`${BASE_URL_DETALLE_OV}/${nro}/${cod}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(detalle)
  });
  return safeJson(res);
}
export async function deleteDetalleOrdenVta(nro, cod) {
  const res = await fetch(`${BASE_URL_DETALLE_OV}/${nro}/${cod}`, { method: 'DELETE' });
  return safeJson(res);
}

// ORDEN VENTA
const BASE_URL_ORDEN_VENTA = 'https://lab15-backend-coello.onrender.com/api/orden-venta';

export async function getOrdenesVenta() {
  const res = await fetch(BASE_URL_ORDEN_VENTA);
  return safeJson(res);
}
export async function getOrdenVenta(id) {
  const res = await fetch(`${BASE_URL_ORDEN_VENTA}/${id}`);
  return safeJson(res);
}
export async function createOrdenVenta(orden) {
  const res = await fetch(BASE_URL_ORDEN_VENTA, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  });
  return safeJson(res);
}
export async function updateOrdenVenta(id, orden) {
  const res = await fetch(`${BASE_URL_ORDEN_VENTA}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  });
  return safeJson(res);
}
export async function deleteOrdenVenta(id) {
  const res = await fetch(`${BASE_URL_ORDEN_VENTA}/${id}`, { method: 'DELETE' });
  return safeJson(res);
}

// ESPECIALIDAD
const BASE_URL_ESPECIALIDAD = 'https://lab15-backend-coello.onrender.com/api/especialidad';

export async function getEspecialidades() {
  const res = await fetch(BASE_URL_ESPECIALIDAD);
  return safeJson(res);
}
export async function getEspecialidad(id) {
  const res = await fetch(`${BASE_URL_ESPECIALIDAD}/${id}`);
  return safeJson(res);
}
export async function createEspecialidad(especialidad) {
  const res = await fetch(BASE_URL_ESPECIALIDAD, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(especialidad)
  });
  return safeJson(res);
}
export async function updateEspecialidad(id, especialidad) {
  const res = await fetch(`${BASE_URL_ESPECIALIDAD}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(especialidad)
  });
  return safeJson(res);
}
export async function deleteEspecialidad(id) {
  const res = await fetch(`${BASE_URL_ESPECIALIDAD}/${id}`, { method: 'DELETE' });
  return safeJson(res);
}

// TIPO MEDIC
const BASE_URL_TIPO_MEDIC = 'https://lab15-backend-coello.onrender.com/api/tipo-medic';

export async function getTiposMedic() {
  const res = await fetch(BASE_URL_TIPO_MEDIC);
  return safeJson(res);
}
export async function getTipoMedic(id) {
  const res = await fetch(`${BASE_URL_TIPO_MEDIC}/${id}`);
  return safeJson(res);
}
export async function createTipoMedic(tipo) {
  const res = await fetch(BASE_URL_TIPO_MEDIC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tipo)
  });
  return safeJson(res);
}
export async function updateTipoMedic(id, tipo) {
  const res = await fetch(`${BASE_URL_TIPO_MEDIC}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tipo)
  });
  return safeJson(res);
}
export async function deleteTipoMedic(id) {
  const res = await fetch(`${BASE_URL_TIPO_MEDIC}/${id}`, { method: 'DELETE' });
  return safeJson(res);
}