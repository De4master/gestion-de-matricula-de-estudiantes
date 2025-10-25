import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import GradientBg from "./GradientBg";

export default function Layout({ children }) {
  return (
    <>
      <GradientBg />
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        <Topbar />
        <div className="flex gap-4">
          <Sidebar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
