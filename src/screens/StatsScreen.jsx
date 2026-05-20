import { ScreenContainer } from '../components/Layout.jsx';
import { MetricCard } from '../components/MetricCard.jsx';
import { hardQuestions, repeatCards } from '../lib/derive.js';

export function StatsScreen({ state }) {
  const hard = hardQuestions(state).slice(0, 6);

  return (
    <ScreenContainer id="stats">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-10">Аналитика прогресса</h2>

      <div className="grid grid-cols-4 gap-6 mb-12">
        <MetricCard value={state.topics.length} label="темы" />
        <MetricCard value={state.facts.length} label="факта" />
        <MetricCard value={state.cards.length} label="карт" />
        <MetricCard value={repeatCards(state).length} label="повторить" accent />
      </div>

      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Сложные вопросы</h3>
      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-sm overflow-hidden text-sm max-w-xl">
        {hard.map((card) => (
          <div key={card.id} className="p-5 flex justify-between items-center hover:bg-slate-50 transition-colors">
            <span className="font-medium text-slate-700">{card.question}</span>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{card.errorCount} ошибки</span>
          </div>
        ))}
      </div>
    </ScreenContainer>
  );
}
