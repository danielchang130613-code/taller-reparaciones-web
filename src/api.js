const API_URL = "http://127.0.0.1:8090";

export async function getOrdenes() {
    const res = await fetch(`${API_URL}/api/collections/ordenes/records?expand=cliente`);
    if (!res.ok) throw new Error("Error al cargar órdenes");
    return (await res.json()).items;
}

export async function getOrden(id) {
    const res = await fetch(`${API_URL}/api/collections/ordenes/records/${id}?expand=cliente`);
    if (!res.ok) throw new Error("Orden no encontrada");
    return await res.json();
}

export async function getEventos(ordenId) {
    const url = `${API_URL}/api/collections/eventos/records?filter=` + encodeURIComponent(`(orden="${ordenId}")`) + `&sort=created`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al cargar eventos");
    return (await res.json()).items;
}

export async function crearOrden(data) {
    const res = await fetch(`${API_URL}/api/collections/ordenes/records`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear orden");
    return await res.json();
}

export async function actualizarOrden(id, data) {
    const res = await fetch(`${API_URL}/api/collections/ordenes/records/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Error al actualizar orden");
    }
    return await res.json();
}

export async function getClientes() {
    const res = await fetch(`${API_URL}/api/collections/clientes/records`);
    if (!res.ok) throw new Error("Error al cargar clientes");
    return (await res.json()).items;
}

export async function crearCliente(data) {
    const res = await fetch(`${API_URL}/api/collections/clientes/records`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear cliente");
    return await res.json();
}