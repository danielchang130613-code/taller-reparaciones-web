import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ListaOrdenes from "./pages/ListaOrdenes";
import DetalleOrden from "./pages/DetalleOrden";
import CrearOrden from "./pages/CrearOrden";
import CrearCliente from "./pages/CrearCliente";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<ListaOrdenes />} />
                <Route path="ordenes/nueva" element={<CrearOrden />} />
                <Route path="ordenes/:id" element={<DetalleOrden />} />
                <Route path="clientes/nueva" element={<CrearCliente />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}