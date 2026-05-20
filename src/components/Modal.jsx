export function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-slate-900/30 z-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button className="text-slate-400 hover:text-slate-900 text-2xl leading-none" onClick={onClose}>
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
