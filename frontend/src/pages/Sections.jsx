import { useEffect, useState } from "react";
import { sectionsList, sectionsCreate, sectionsDelete } from "../api";

// Nota: por simplicidad pedimos el ID del curso (tu backend ya tiene Course).
const empty = { course: "", code: "", capacity: 30 };

export default function Sections() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);

  const fetchAll = async () => setItems(await sectionsList());
  useEffect(() => { fetchAll(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await sectionsCreate({
        course: Number(form.course),
        code: form.code,
        capacity: Number(form.capacity)
      });
      setForm(empty);
      fetchAll();
    } catch (e) {
      alert("Error al crear sección");
      console.error(e);
    }
  };

  const del = async (id) => {
    if (!confirm("¿Eliminar sección?")) return;
    await sectionsDelete(id);
    fetchAll();
  };

  return (
    <>
      <h1 style={{ marginTop: 0 }}>Secciones</h1>

      <form className="card" onSubmit={save} style={{ display: "grid", gap: 12 }}>
        <div className="grid-3">
          <div>
            <label>ID Curso</label>
            <input className="input" value={form.course} onChange={(e)=>setForm(s=>({...s, course: e.target.value}))} placeholder="p.ej. 1" required />
          </div>
          <div>
            <label>Código (A / 1A)</label>
            <input className="input" value={form.code} onChange={(e)=>setForm(s=>({...s, code: e.target.value}))} required />
          </div>
          <div>
            <label>Capacidad</label>
            <input className="input" type="number" value={form.capacity} onChange={(e)=>setForm(s=>({...s, capacity: e.target.value}))} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn">Guardar</button>
          <button type="button" className="btn secondary" onClick={()=>setForm(empty)}>Cancelar</button>
        </div>
      </form>

      <div className="card" style={{ marginTop: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Curso</th><th>Código</th><th>Capacidad</th><th>Matriculados</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map(s=>(
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.course}</td>
                <td>{s.code}</td>
                <td>{s.capacity}</td>
                <td>{s.enrolled}</td>
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
