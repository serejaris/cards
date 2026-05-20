export function EmptyState({ title, text }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
      <p className="font-semibold text-slate-900">{title}</p>
      {text ? <p className="text-sm text-slate-500 mt-2">{text}</p> : null}
    </div>
  );
}
