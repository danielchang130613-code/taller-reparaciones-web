import { Outlet, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
    const [tema, setTema] = useState("light");

    useEffect(() => {
        const temaGuardado = localStorage.getItem("tema");
        if (temaGuardado) {
            setTema(temaGuardado);
            document.documentElement.setAttribute("data-theme", temaGuardado);
        }
    }, []);

    const toggleTema = () => {
        const nuevoTema = tema === "light" ? "dark" : "light";
        setTema(nuevoTema);
        document.documentElement.setAttribute("data-theme", nuevoTema);
        localStorage.setItem("tema", nuevoTema);
    };

    return (
        <div className="layout">
            <header>
                <h1>Taller de Reparaciones</h1>
                <nav>
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "activo" : "")}>Órdenes</NavLink>
                    <NavLink to="/ordenes/nueva" className={({ isActive }) => (isActive ? "activo" : "")}>Nueva Orden</NavLink>
                    <NavLink to="/clientes/nueva" className={({ isActive }) => (isActive ? "activo" : "")}>Nuevo Cliente</NavLink>
                    <button className="btn-tema" onClick={toggleTema}>
                        {tema === "light" ? "Modo Oscuro" : "Modo Claro"}
                    </button>
                </nav>
            </header>
            <main><Outlet /></main>
        </div>
    );
}