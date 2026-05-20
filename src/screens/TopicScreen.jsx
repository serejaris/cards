import { SecondaryActionButton } from '../components/Buttons.jsx';
import { ScreenContainer } from '../components/Layout.jsx';
import { MetricCard } from '../components/MetricCard.jsx';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { topicProgress } from '../lib/derive.js';

export function TopicScreen({ state, activeTopic, topicFacts, topicCards, onNavigate }) {
  if (!activeTopic) return null;
  const progress = topicProgress(state, activeTopic.id);

  return (
    <ScreenContainer id="topic">
      <nav className="text-sm font-medium text-slate-400 mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-indigo-600 flex items-center transition-colors">
          ← Назад к списку тем
        </button>
      </nav>
      <header className="flex items-start justify-between mb-10">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">{activeTopic.title}</h2>
          <p className="text-slate-500 mt-3 leading-relaxed">{activeTopic.description}</p>
          <div className="flex gap-2 mt-5 flex-wrap">
            {activeTopic.tags.map((tag) => (
              <StatusBadge key={tag}>#{tag}</StatusBadge>
            ))}
            <StatusBadge accent>{activeTopic.deckStyle}</StatusBadge>
          </div>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <SecondaryActionButton onClick={() => onNavigate('import')}>+ Добавить факт</SecondaryActionButton>
          <SecondaryActionButton onClick={() => onNavigate('generate')}>✨ Сгенерировать</SecondaryActionButton>
          <button
            onClick={() => onNavigate('training')}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-indigo-700 transition-colors"
          >
            ▶ Начать тренировку
          </button>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <MetricCard value={topicFacts.length} label="фактов" />
        <MetricCard value={topicCards.length} label="карточек" />
        <MetricCard value={`${progress}%`} label="освоено" accent />
      </div>

      <div className="flex gap-8 border-b border-slate-200 mb-6">
        <button className="px-2 py-4 border-b-2 border-indigo-600 font-bold text-sm text-indigo-600 uppercase tracking-wider">
          Факты ({topicFacts.length})
        </button>
        <button className="px-2 py-4 text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-wider transition-colors">
          Карточки ({topicCards.length})
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        {topicFacts.map((fact) => (
          <div key={fact.id} className="p-6 flex gap-6 hover:bg-slate-50 transition-colors">
            <div className="flex-1">
              <p className="font-semibold text-slate-900">{fact.text}</p>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{fact.explanation}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                  важность: {fact.importance}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500">
                  {topicCards.some((card) => card.factId === fact.id) ? '✓ есть карточка' : 'нет карточки'}
                </span>
              </div>
            </div>
            <button className="text-xs font-bold text-indigo-600 uppercase tracking-wider hover:text-indigo-800 transition-colors self-start mt-1">
              Редактировать
            </button>
          </div>
        ))}
      </div>
    </ScreenContainer>
  );
}
