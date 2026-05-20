import { ScreenContainer } from '../components/Layout.jsx';

export function TrainingScreen({ activeTopic, topicCards, state, onSetSide, onRecordResult, onSkip, onNavigate }) {
  const activeCard = topicCards.find((card) => card.id === state.training.activeCardId) || topicCards[0];
  const activeIndex = topicCards.findIndex((card) => card.id === activeCard?.id);

  if (!activeCard) {
    return (
      <ScreenContainer id="training" width="max-w-2xl">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
          <p className="font-semibold text-slate-900">В этой теме пока нет карточек.</p>
          <button className="mt-6 text-indigo-600 font-bold" onClick={() => onNavigate('import')}>
            Добавить материал
          </button>
        </div>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer id="training" width="max-w-2xl">
      <div className="flex items-center justify-between mb-8 text-[10px] uppercase tracking-widest font-bold text-slate-400">
        <span>
          Тема: <strong className="text-slate-900">{activeTopic?.title || 'Тема'}</strong>
        </span>
        <span>
          Карточка {activeIndex + 1} / {topicCards.length}
        </span>
        <span className="text-indigo-500">{activeTopic?.deckStyle || 'Classic Study'}</span>
      </div>

      {state.training.side === 'front' ? (
        <div
          id="card-front"
          className="bg-white rounded-[2rem] border border-slate-200 shadow-xl p-16 min-h-[400px] flex flex-col items-center justify-center text-center transition-all hover:shadow-2xl"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-300 mb-10">Вопрос</span>
          <p className="text-2xl font-medium leading-relaxed text-slate-800">{activeCard.question}</p>
          <button
            onClick={() => onSetSide('back')}
            className="mt-12 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
          >
            Показать ответ
          </button>
        </div>
      ) : (
        <div id="card-back" className="bg-white rounded-[2rem] border border-indigo-100 shadow-xl p-16 min-h-[400px] transition-all">
          <div className="mb-8 pb-8 border-b border-slate-100">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-300">Вопрос</span>
            <p className="text-sm text-slate-500 mt-2 italic leading-relaxed">{activeCard.question}</p>
          </div>
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-500">Ответ</span>
            <p className="text-4xl font-bold text-slate-900 mt-2 tracking-tight">{activeCard.answer}</p>
          </div>
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-300">Пояснение</span>
            <p className="text-slate-600 mt-3 leading-relaxed text-sm">{activeCard.explanation}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => onRecordResult('known')}
              className="py-4 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all"
            >
              ✓ Знала
            </button>
            <button
              onClick={() => onRecordResult('unknown')}
              className="py-4 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all"
            >
              ✗ Не знала
            </button>
            <button
              onClick={() => onRecordResult('repeat')}
              className="py-4 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all"
            >
              ↻ Повторить
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-8 mt-10">
        <button
          onClick={onSkip}
          className="text-[10px] uppercase tracking-widest font-black text-slate-400 hover:text-slate-900 transition-colors"
        >
          Пропустить
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="text-[10px] uppercase tracking-widest font-black text-slate-400 hover:text-slate-900 transition-colors"
        >
          Завершить
        </button>
      </div>
    </ScreenContainer>
  );
}
