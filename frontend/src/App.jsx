import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function App() {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    nav("/login");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ padding: 20, borderRight: "1px solid rgba(255,255,255,.08)" }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Gestión de Matrícula</div>
        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink className="btn secondary" to="/">Dashboard</NavLink>
          <NavLink className="btn secondary" to="/students">Estudiantes</NavLink>
          <NavLink className="btn secondary" to="/sections">Secciones</NavLink>
        </nav>
        <button className="btn" style={{ marginTop: 24 }} onClick={logout}>Salir</button>
      </aside>

      {/* Content */}
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
