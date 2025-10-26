import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Students from "./pages/Students.jsx";
import Sections from "./pages/Sections.jsx";

function PrivateRoute() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function PlaceholderDashboard() {
  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Dashboard</h2>
      <p style={{ color: "#9ca3af" }}>
        Bienvenido. Usa el menú para gestionar Estudiantes y Secciones.
      </p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<App />}>
            <Route path="/" element={<PlaceholderDashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/sections" element={<Sections />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
