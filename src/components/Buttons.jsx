export function PrimaryActionButton({ children, className = '', ...props }) {
  return (
    <button
      className={`px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-shadow shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryActionButton({ children, className = '', ...props }) {
  return (
    <button
      className={`px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
