const navItems = [
  ['home', 'Главная'],
  ['topic', 'Тема'],
  ['import', 'Добавить материал'],
  ['generate', 'Генерация фактов'],
  ['training', 'Тренировка'],
  ['errors', 'Ошибки'],
  ['stats', 'Статистика'],
];

export function SidebarNavigation({ currentScreen, onNavigate }) {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-2 shrink-0">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-semibold tracking-tight text-indigo-700">ЧГК Cards</h1>
        <p className="text-xs uppercase tracking-widest text-slate-400 mt-1 font-medium">Classic Study Edition</p>
      </div>
      <nav className="flex flex-col gap-1 text-sm">
        {navItems.map(([id, label]) => (
          <button
            key={id}
            data-nav={id}
            onClick={() => onNavigate(id)}
            className={`text-left px-4 py-2.5 rounded-xl font-medium transition-colors ${
              currentScreen === id ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            {label}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-6 px-2 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
        Design: Classic Study
      </div>
    </aside>
  );
}

export function ScreenContainer({ id, width = 'max-w-5xl', children }) {
  return (
    <section id={id} data-screen className={`${width} mx-auto`}>
      {children}
    </section>
  );
}

export function ScreenHeader({ title, subtitle, actions }) {
  return (
    <header className="flex items-center justify-between mb-10 gap-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
        {subtitle ? <p className="text-slate-500 mt-1">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex gap-4 shrink-0">{actions}</div> : null}
    </header>
  );
}
