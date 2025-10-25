import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { listStudents } from "../api/students";
import { listSections } from "../api/sections";
import { Users, Layers, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, sections: 0 });

  useEffect(() => {
    Promise.all([listStudents(), listSections()]).then(([students, sections]) => {
      setStats({ students: students.length, sections: sections.length });
    });
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 flex items-center gap-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl">
              <Users size={32} className="text-cyan-300" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Estudiantes</p>
              <p className="text-3xl font-semibold">{stats.students}</p>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="p-3 bg-indigo-500/20 rounded-xl">
              <Layers size={32} className="text-indigo-300" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Secciones</p>
              <p className="text-3xl font-semibold">{stats.sections}</p>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <TrendingUp size={32} className="text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-300">Crecimiento</p>
              <p className="text-3xl font-semibold">+12%</p>
            </div>
          </Card>
        </div>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Bienvenido al Sistema</h2>
          <p className="text-gray-300">
            Gestiona estudiantes, secciones y matrículas desde el menú lateral.
          </p>
        </Card>
      </div>
    </Layout>
  );
}
