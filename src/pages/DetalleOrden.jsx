import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getOrden, getEventos, actualizarOrden } from "../api";
import EstadoBadge from "../components/EstadoBadge";
import PresupuestoForm from "../components/PresupuestoForm";

const TRANSICIONES = {
    solicitada: ["en_diagnostico", "cancelada"],
    en_diagnostico: ["presupuestada"],
    presupuestada: ["aprobada", "rechazada"],
    aprobada: ["en_reparacion"],
    en_reparacion: ["lista"],
    lista: ["entregada"],
};
const ETIQUETAS = {
    en_diagnostico: "Iniciar diagnóstico", presupuestada: "Registrar presupuesto",
    aprobada: "Cliente aprobó", rechazada: "Cliente rechazó",
    en_reparacion: "Iniciar reparación", lista: "Reparación terminada",
    entregada: "Entregar al cliente", cancelada: "Cancelar orden",
};

export default function DetalleOrden() {
    const { id } = useParams();
    const [orden, setOrden] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [error, setError] = useState("");
    const [mostrarForm, setMostrarForm] = useState(false);

    const cargar = useCallback(async () => {
        try {
            setError("");
            const dataOrden = await getOrden(id);
            setOrden(dataOrden);
            try {
                const dataEventos = await getEventos(id);
                setEventos(dataEventos);
            } catch (evtErr) {
                console.error("Error al cargar eventos:", evtErr);
                setEventos([]);
            }
        } catch (err) {
            setError(err.message || "Error al cargar la orden");
        }
    }, [id]);

    useEffect(() => { cargar(); }, [cargar]);

    const total = useMemo(() => {
        if (!orden || orden.manoObra == null) return 0;
        const piezas = Array.isArray(orden.piezas) ? orden.piezas : [];
        return orden.manoObra + piezas.reduce((sum, p) => sum + (p.cantidad * p.precio), 0);
    }, [orden]);

    async function cambiarEstado(nuevoEstado, extra = {}) {
        try {
            await actualizarOrden(id, { estado: nuevoEstado, ...extra });
            cargar();
        } catch (e) {
            setError(e.message);
        }
    }

    if (error) return <p className="error">{error}</p>;
    if (!orden) return <p>Cargando orden...</p>;

    const siguientes = TRANSICIONES[orden.estado] || [];
    const esTerminal = ["rechazada", "cancelada", "entregada"].includes(orden.estado);

    return (
        <div className="detalle-orden">
            <h2>{orden.equipo}</h2>
            <p><strong>Cliente:</strong> {orden.expand?.cliente?.nombre || "—"}</p>
            <p><strong>Teléfono:</strong> {orden.expand?.cliente?.telefono || "—"}</p>
            <p><strong>Problema:</strong> {orden.problema}</p>
            <p><strong>Estado:</strong> <EstadoBadge estado={orden.estado} /></p>

            {orden.diagnostico && (
                <section className="presupuesto">
                    <h3>Presupuesto</h3>
                    <p><strong>Diagnóstico:</strong> {orden.diagnostico}</p>
                    <p><strong>Mano de obra:</strong> ${orden.manoObra}</p>
                    <ul>{(orden.piezas || []).map((p, i) => <li key={i}>{p.descripcion} — {p.cantidad} × ${p.precio}</li>)}</ul>
                    <p><strong>Total:</strong> ${total}</p>
                </section>
            )}

            {siguientes.length > 0 && (
                <section className="acciones">
                    <h3>Acciones</h3>
                    {siguientes.map((s) => (
                        <button key={s} onClick={() => (s === "presupuestada" ? setMostrarForm(true) : cambiarEstado(s))}>{ETIQUETAS[s] || s}</button>
                    ))}
                </section>
            )}

            {mostrarForm && (
                <PresupuestoForm onGuardar={(data) => { cambiarEstado("presupuestada", data); setMostrarForm(false); }} onCancelar={() => setMostrarForm(false)} />
            )}

            {esTerminal && <p className="cerrada">Esta orden está cerrada y no puede cambiar.</p>}

            <section className="historial">
                <h3>Historial</h3>
                {eventos.length === 0 ? <p>Sin eventos registrados.</p> : (
                    <ul>{eventos.map((ev) => <li key={ev.id}>{ev.de} → {ev.a} ({new Date(ev.created).toLocaleString()})</li>)}</ul>
                )}
            </section>
        </div>
    );
}