export function MetricCard({ value, label, accent = false }) {
  return (
    <div
      className={`rounded-2xl border p-6 text-center shadow-sm ${
        accent ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-slate-200'
      }`}
    >
      <div className={`text-3xl font-bold ${accent ? 'text-indigo-600' : 'text-slate-900'}`}>{value}</div>
      <div className={`text-[10px] uppercase tracking-widest font-bold mt-1 ${accent ? 'text-indigo-400' : 'text-slate-400'}`}>
        {label}
      </div>
    </div>
  );
}
