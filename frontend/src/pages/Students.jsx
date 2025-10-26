import { useEffect, useState } from "react";
import { studentsList, studentsCreate, studentsDelete } from "../api";

const empty = {
  doc_id: "",
  first_name: "",
  last_name: "",
  email: "",
  birth_date: "",
  address: "",
  phone: "",
  previous_school: ""
};

export default function Students() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  const fetchAll = async () => setItems(await studentsList());
  useEffect(() => { fetchAll(); }, []);

  const save = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await studentsCreate(form);
      setForm(empty);
      fetchAll();
    } catch (e) {
      alert("Error al crear estudiante");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    if (!confirm("¿Eliminar estudiante?")) return;
    await studentsDelete(id);
    fetchAll();
  };

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Estudiantes</h1>

      <form className="card" onSubmit={save} style={{ display: "grid", gap: 12 }}>
        <div className="grid-2">
          <div>
            <label>DNI / Partida</label>
            <input className="input" value={form.doc_id} onChange={(e)=>setForm(s=>({...s, doc_id: e.target.value}))} required/>
          </div>
          <div>
            <label>Correo</label>
            <input className="input" value={form.email} onChange={(e)=>setForm(s=>({...s, email: e.target.value}))}/>
          </div>
          <div>
            <label>Nombres</label>
            <input className="input" value={form.first_name} onChange={(e)=>setForm(s=>({...s, first_name: e.target.value}))} required/>
          </div>
          <div>
            <label>Apellidos</label>
            <input className="input" value={form.last_name} onChange={(e)=>setForm(s=>({...s, last_name: e.target.value}))} required/>
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input className="input" type="date" value={form.birth_date||""} onChange={(e)=>setForm(s=>({...s, birth_date: e.target.value}))}/>
          </div>
          <div>
            <label>Teléfono</label>
            <input className="input" value={form.phone} onChange={(e)=>setForm(s=>({...s, phone: e.target.value}))}/>
          </div>
          <div>
            <label>Dirección</label>
            <input className="input" value={form.address} onChange={(e)=>setForm(s=>({...s, address: e.target.value}))}/>
          </div>
          <div>
            <label>Colegio anterior</label>
            <input className="input" value={form.previous_school} onChange={(e)=>setForm(s=>({...s, previous_school: e.target.value}))}/>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
          <button type="button" className="btn secondary" onClick={()=>setForm(empty)}>Cancelar</button>
        </div>
      </form>

      <div className="card" style={{ marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>DNI</th><th>Nombres</th><th>Apellidos</th><th>Correo</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(s=>(
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.doc_id}</td>
                <td>{s.first_name}</td>
                <td>{s.last_name}</td>
                <td>{s.email || "-"}</td>
                <td><button className="btn secondary" onClick={()=>del(s.id)}>Eliminar</button></td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan={6} style={{color:"#9ca3af"}}>Sin registros</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
