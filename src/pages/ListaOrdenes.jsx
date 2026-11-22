import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrdenes } from "../api";
import EstadoBadge from "../components/EstadoBadge";

export default function ListaOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getOrdenes().then(setOrdenes).catch((e) => setError(e.message)).finally(() => setCargando(false));
    }, []);

    if (cargando) return <p>Cargando órdenes...</p>;
    if (error) return <p className="error">{error}</p>;
    if (ordenes.length === 0) return <p>No hay órdenes registradas.</p>;

    return (
        <div>
            <h2>Órdenes</h2>
            <ul className="lista-ordenes">
                {ordenes.map((o) => (
                    <li key={o.id} className="orden-item">
                        <Link to={`/ordenes/${o.id}`}><strong>{o.equipo}</strong> — {o.expand?.cliente?.nombre || "Sin cliente"}</Link>
                        <EstadoBadge estado={o.estado} />
                    </li>
                ))}
            </ul>
        </div>
    );
}