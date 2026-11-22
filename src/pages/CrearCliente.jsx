import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearCliente } from "../api";

export default function CrearCliente() {
    const [form, setForm] = useState({ nombre: "", telefono: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

    async function handleSubmit(e) {
        e.preventDefault(); setError("");
        try { await crearCliente(form); navigate("/"); }
        catch (err) { setError(err.message); }
    }

    return (
        <div>
            <h2>Nuevo Cliente</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form-orden">
                <label>Nombre:<input name="nombre" value={form.nombre} onChange={handleChange} required /></label>
                <label>Teléfono:<input name="telefono" value={form.telefono} onChange={handleChange} required /></label>
                <button type="submit">Registrar Cliente</button>
            </form>
        </div>
    );
}