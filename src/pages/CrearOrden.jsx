import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClientes, crearOrden } from "../api";

export default function CrearOrden() {
    const [clientes, setClientes] = useState([]);
    const [form, setForm] = useState({ cliente: "", equipo: "", problema: "" });
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => { getClientes().then(setClientes).catch((e) => setError(e.message)).finally(() => setCargando(false)); }, []);

    function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try { const nueva = await crearOrden({ ...form, estado: "solicitada" }); navigate(`/ordenes/${nueva.id}`); }
        catch (err) { setError(err.message); }
    }

    if (cargando) return <p>Cargando clientes...</p>;

    return (
        <div>
            <h2>Nueva Orden</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form-orden">
                <label>Cliente:<select name="cliente" value={form.cliente} onChange={handleChange} required>
                    <option value="">Seleccione un cliente...</option>
                    {clientes.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select></label>
                <label>Equipo:<input name="equipo" value={form.equipo} onChange={handleChange} required /></label>
                <label>Problema:<textarea name="problema" value={form.problema} onChange={handleChange} required /></label>
                <button type="submit">Registrar Orden</button>
            </form>
        </div>
    );
}