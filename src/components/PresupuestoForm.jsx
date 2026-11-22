import { useState } from "react";

export default function PresupuestoForm({ onGuardar, onCancelar }) {
    const [diagnostico, setDiagnostico] = useState("");
    const [manoObra, setManoObra] = useState(0);
    const [piezas, setPiezas] = useState([]);

    function agregarPieza() { setPiezas([...piezas, { descripcion: "", cantidad: 1, precio: 0 }]); }
    function actualizarPieza(i, campo, valor) { const nuevas = [...piezas]; nuevas[i][campo] = valor; setPiezas(nuevas); }
    function eliminarPieza(i) { setPiezas(piezas.filter((_, index) => index !== i)); }
    function handleSubmit(e) { e.preventDefault(); onGuardar({ diagnostico: diagnostico.trim(), manoObra: Number(manoObra), piezas }); }

    return (
        <form onSubmit={handleSubmit} className="presupuesto-form">
            <h3>Registrar Presupuesto</h3>
            <label>Diagnóstico:<textarea value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} required /></label>
            <label>Mano de obra:<input type="number" value={manoObra} onChange={(e) => setManoObra(e.target.value)} min="0" required /></label>
            <h4>Piezas</h4>
            {piezas.map((p, i) => (
                <div key={i} className="pieza-row">
                    <input placeholder="Descripción" value={p.descripcion} onChange={(e) => actualizarPieza(i, "descripcion", e.target.value)} required />
                    <input type="number" placeholder="Cantidad" value={p.cantidad} min="1" onChange={(e) => actualizarPieza(i, "cantidad", Number(e.target.value))} required />
                    <input type="number" placeholder="Precio" value={p.precio} min="0" onChange={(e) => actualizarPieza(i, "precio", Number(e.target.value))} required />
                    <button type="button" onClick={() => eliminarPieza(i)}>Eliminar</button>
                </div>
            ))}
            <button type="button" onClick={agregarPieza}>Agregar Pieza</button>
            <div className="acciones-form">
                <button type="submit">Guardar Presupuesto</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}