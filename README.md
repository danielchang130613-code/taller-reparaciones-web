# 🛠️ Taller de Reparaciones (React + PocketBase)

Sistema de gestión para un taller de reparaciones de equipos electrónicos. Permite registrar clientes, dar de alta órdenes de servicio, gestionar presupuestos, hacer seguimiento del estado de cada equipo y consultar un historial detallado de los cambios.

Este proyecto fue desarrollado como evaluación de la asignatura **Programación Web**.

## 🚀 Tecnologías Utilizadas

*   **Frontend:** React (con Vite) y React Router.
*   **Backend:** PocketBase (Base de datos, autenticación y API REST).
*   **Estilos:** CSS puro con diseño personalizado (Glassmorphism / Dark Mode).
*   **Lenguaje:** JavaScript (ES6+).

## 📂 Estructura del Proyecto

```text
taller-reparaciones/
├── backend/
│   ├── pb_data/          # (No incluido en el repo) Base de datos local
│   ├── pb_hooks/         # Lógica de validación (Reglas del taller)
│   │   └── main.pb.js
│   └── pocketbase(.exe)  # Ejecutable del servidor
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes reutilizables (Layout, Badges, Forms)
│   │   ├── pages/        # Vistas principales (Rutas)
│   │   ├── api.js        # Funciones de conexión con PocketBase
│   │   └── App.jsx       # Enrutador principal
│   ├── package.json
│   └── vite.config.js
└── README.md