export default function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/10 backdrop-blur shadow-glass ${className}`}>
      {children}
    </div>
  );
}
