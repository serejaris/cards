export function StatusBadge({ children, accent = false }) {
  return (
    <span
      className={`px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-md border ${
        accent ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-100 text-slate-600 border-slate-200'
      }`}
    >
      {children}
    </span>
  );
}
