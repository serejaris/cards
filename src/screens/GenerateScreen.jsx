import { ScreenContainer } from '../components/Layout.jsx';

export function GenerateScreen({ state, activeTopic, onUpdatePendingFact, onSavePendingFacts, onNavigate }) {
  const pendingFacts = state.pendingFacts;

  return (
    <ScreenContainer id="generate" width="max-w-4xl">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">Подготовка фактов</h2>
      <p className="text-slate-500 mb-8">Проверьте извлечённые данные перед сохранением в базу.</p>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          readOnly
          value={activeTopic?.title || ''}
          className="flex-1 border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium"
        />
        <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-colors">
          Обновить
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 mb-8">
        {pendingFacts.map((fact) => (
          <label key={fact.id} className="flex gap-4 p-6 cursor-pointer hover:bg-slate-50 transition-colors group">
            <input
              type="checkbox"
              checked={fact.selected}
              onChange={(event) => onUpdatePendingFact(fact.id, { selected: event.target.checked })}
              className="w-5 h-5 mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div>
              <p className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">{fact.text}</p>
              <p className="text-sm text-slate-500 mt-1">{fact.explanation}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onSavePendingFacts}
          className="px-8 py-3.5 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-sm hover:bg-indigo-700 transition-all"
        >
          Сохранить факты
        </button>
        <button
          onClick={() => onNavigate('topic')}
          className="px-8 py-3.5 border border-slate-200 text-slate-400 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
        >
          Отмена
        </button>
      </div>
    </ScreenContainer>
  );
}
