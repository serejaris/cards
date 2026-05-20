import { useState } from 'react';
import { PrimaryActionButton } from '../components/Buttons.jsx';
import { ScreenContainer, ScreenHeader } from '../components/Layout.jsx';
import { Modal } from '../components/Modal.jsx';

export function ErrorsScreen({ state, onAddError, onCreateCardFromError }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draft, setDraft] = useState({
    topicId: state.activeTopicId,
    context: '',
    correctAnswer: '',
  });

  function submitError(event) {
    event.preventDefault();
    if (!draft.context.trim() || !draft.correctAnswer.trim()) return;
    onAddError(draft);
    setDraft({ ...draft, context: '', correctAnswer: '' });
    setIsModalOpen(false);
  }

  return (
    <ScreenContainer id="errors">
      <ScreenHeader
        title="Журнал ошибок"
        subtitle="Анализ слабых мест для точечного повторения"
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-sm"
          >
            + Записать
          </button>
        }
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-widest font-black text-slate-400">
            <tr>
              <th className="px-6 py-4">Контекст ошибки</th>
              <th className="px-6 py-4">Верный ответ</th>
              <th className="px-6 py-4">Тема</th>
              <th className="px-6 py-4">Дата</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {state.errors.map((error) => {
              const topic = state.topics.find((item) => item.id === error.topicId);
              return (
                <tr key={error.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-5 font-medium text-slate-900">{error.context}</td>
                  <td className="px-6 py-5 text-slate-600 font-semibold">{error.correctAnswer}</td>
                  <td className="px-6 py-5 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                    {topic?.title || 'Тема'}
                  </td>
                  <td className="px-6 py-5 text-slate-400 font-medium">{error.date}</td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => onCreateCardFromError(error.id)}
                      className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      {error.cardId ? 'Карта создана' : 'Создать карту'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isModalOpen ? (
        <Modal title="Записать ошибку" onClose={() => setIsModalOpen(false)}>
          <form className="space-y-4" onSubmit={submitError}>
            <select
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              value={draft.topicId}
              onChange={(event) => setDraft({ ...draft, topicId: event.target.value })}
            >
              {state.topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title}
                </option>
              ))}
            </select>
            <input
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Что не вспомнила"
              value={draft.context}
              onChange={(event) => setDraft({ ...draft, context: event.target.value })}
            />
            <input
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Правильный ответ"
              value={draft.correctAnswer}
              onChange={(event) => setDraft({ ...draft, correctAnswer: event.target.value })}
            />
            <PrimaryActionButton className="w-full py-3.5">Сохранить</PrimaryActionButton>
          </form>
        </Modal>
      ) : null}
    </ScreenContainer>
  );
}
