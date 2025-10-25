import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { listSections } from "../api/sections";
import { listStudents } from "../api/students";
import { enroll } from "../api/enrollments";
import toast, { Toaster } from "react-hot-toast";
import { BookOpen } from "lucide-react";

export default function Sections() {
  const [sections, setSections] = useState([]);
  const [students, setStudents] = useState([]);
  const [showEnroll, setShowEnroll] = useState(false);
  const [enrollData, setEnrollData] = useState({ student_id: "", section_id: "" });

  useEffect(() => {
    listSections().then(setSections);
    listStudents().then(setStudents);
  }, []);

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      await enroll(enrollData);
      toast.success("Matrícula realizada exitosamente");
      setEnrollData({ student_id: "", section_id: "" });
      setShowEnroll(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Error al matricular");
    }
  };

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Secciones</h1>
          <button
            onClick={() => setShowEnroll(!showEnroll)}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition"
          >
            <BookOpen size={18} /> Matricular Estudiante
          </button>
        </div>

        {showEnroll && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Matricular Estudiante</h2>
            <form onSubmit={handleEnroll} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Estudiante</label>
                <select
                  value={enrollData.student_id}
                  onChange={(e) => setEnrollData({ ...enrollData, student_id: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
                  required
                >
                  <option value="">Seleccionar...</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.first_name} {s.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Sección</label>
                <select
                  value={enrollData.section_id}
                  onChange={(e) => setEnrollData({ ...enrollData, section_id: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
                  required
                >
                  <option value="">Seleccionar...</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name} - {sec.subject}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowEnroll(false)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition"
                >
                  Matricular
                </button>
              </div>
            </form>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Card key={section.id} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
              <p className="text-gray-300 text-sm mb-1">Materia: {section.subject}</p>
              <p className="text-gray-400 text-xs">Profesor: {section.teacher}</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm">
                  Capacidad: <span className="font-semibold">{section.enrolled_students}/{section.capacity}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
