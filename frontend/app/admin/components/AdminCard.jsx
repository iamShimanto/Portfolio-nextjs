export default function AdminCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl bg-[#1a1d21] border border-white/5 ${className}`}>
      {children}
    </div>
  );
}
