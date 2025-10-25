import { LogOut } from "lucide-react";
import { logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const nav = useNavigate();
  const doLogout = () => { logout(); nav("/login"); };

  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-white/10 bg-black/30 backdrop-blur rounded-b-xl">
      <span className="font-semibold tracking-wide">Gestión de Matrícula</span>
      <button onClick={doLogout} className="flex items-center gap-2 text-sm hover:text-cyan-200">
        <LogOut size={18}/> Salir
      </button>
    </div>
  );
}
