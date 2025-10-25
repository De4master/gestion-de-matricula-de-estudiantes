export default function GradientBg() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-sky-500 to-cyan-400 opacity-30" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-400 blur-3xl opacity-20" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-500 blur-3xl opacity-20" />
    </div>
  );
}
