import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../api";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await apiLogin(form.username, form.password);
      nav("/");
    } catch (e) {
      setErr("Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <form onSubmit={onSubmit} className="card" style={{ width: 420, display: "grid", gap: 10 }}>
        <h2 style={{ margin: "0 0 6px 0" }}>Gestión de Matrícula</h2>
        <p style={{ margin: 0, color: "#9ca3af" }}>Inicia sesión para continuar</p>

        <label>Usuario</label>
        <input
          className="input"
          value={form.username}
          onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
          placeholder="admin"
        />

        <label>Contraseña</label>
        <input
          className="input"
          type="password"
          value={form.password}
          onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
          placeholder="••••••••"
        />

        {err && <div style={{ color: "#fca5a5" }}>{err}</div>}

        <button className="btn" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
