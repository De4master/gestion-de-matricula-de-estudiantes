import { Link, useLocation } from "react-router-dom";
import { Users, Layers, LayoutGrid } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/students",  label: "Estudiantes", icon: Users },
  { to: "/sections",  label: "Secciones",  icon: Layers }
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="w-56 p-3 space-y-2">
      {items.map(({ to, label, icon: Icon }) => (
        <Link key={to} to={to}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition
                      ${pathname === to ? "ring-2 ring-cyan-300/60" : ""}`}>
          <Icon size={18}/><span>{label}</span>
        </Link>
      ))}
    </aside>
  );
}
