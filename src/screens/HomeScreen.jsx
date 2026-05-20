import { useState } from 'react';
import { PrimaryActionButton, SecondaryActionButton } from '../components/Buttons.jsx';
import { ScreenContainer, ScreenHeader } from '../components/Layout.jsx';
import { Modal } from '../components/Modal.jsx';
import { StatusBadge } from '../components/StatusBadge.jsx';
import { repeatCards, topicCards, topicFacts, weakTopics } from '../lib/derive.js';

export function HomeScreen({ state, onNavigate, onCreateTopic }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draft, setDraft] = useState({ title: '', description: '', tags: '' });
  const repeatCount = repeatCards(state).length;
  const weak = weakTopics(state).slice(0, 3);

  function submitTopic(event) {
    event.preventDefault();
    if (!draft.title.trim()) return;
    onCreateTopic(draft);
    setDraft({ title: '', description: '', tags: '' });
    setIsModalOpen(false);
  }

  return (
    <ScreenContainer id="home">
      <ScreenHeader
        title="Мои темы"
        subtitle="Академическая база знаний для интеллектуальных игр"
        actions={
          <>
            <PrimaryActionButton onClick={() => setIsModalOpen(true)}>+ Создать тему</PrimaryActionButton>
            <SecondaryActionButton
              onClick={() => onNavigate('training')}
              className="border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100"
            >
              ▶ Быстрая тренировка
            </SecondaryActionButton>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Повторить сегодня</h3>
          <p className="text-4xl font-bold text-indigo-600 mt-3">{repeatCount}</p>
          <p className="text-sm text-slate-600 mt-1 font-medium">карточки требуют внимания</p>
          <button
            onClick={() => onNavigate('training')}
            className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Начать сессию <span className="ml-1">→</span>
          </button>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Слабые темы</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {weak.map(({ topic, rate }) => (
              <li key={topic.id} className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-700 font-medium">{topic.title}</span>
                <span className="text-indigo-600 font-bold">{rate}% ошибок</span>
              </li>
            ))}
            {!weak.length ? <li className="text-slate-500">Пока нет слабых тем.</li> : null}
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-widest font-black text-slate-400">
            <tr>
              <th className="px-6 py-4">Тема</th>
              <th className="px-6 py-4">Факты</th>
              <th className="px-6 py-4">Карты</th>
              <th className="px-6 py-4">Статус</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {state.topics.map((topic) => (
              <tr
                key={topic.id}
                className="hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => onNavigate('topic', topic.id)}
              >
                <td className="px-6 py-5">
                  <div className="font-semibold text-slate-900">{topic.title}</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    {topic.tags.map((tag) => `#${tag}`).join(' ')} · {topic.deckStyle}
                  </div>
                </td>
                <td className="px-6 py-5 text-slate-600 font-medium">{topicFacts(state, topic.id).length}</td>
                <td className="px-6 py-5 text-slate-600 font-medium">{topicCards(state, topic.id).length}</td>
                <td className="px-6 py-5">
                  <StatusBadge>{topic.status}</StatusBadge>
                </td>
                <td className="px-6 py-5 text-right text-indigo-600 font-semibold text-sm">Изучить →</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen ? (
        <Modal title="Создать тему" onClose={() => setIsModalOpen(false)}>
          <form className="space-y-4" onSubmit={submitTopic}>
            <input
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Название темы"
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            />
            <textarea
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              rows="3"
              placeholder="Описание"
              value={draft.description}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
            />
            <input
              className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Теги через запятую"
              value={draft.tags}
              onChange={(event) => setDraft({ ...draft, tags: event.target.value })}
            />
            <PrimaryActionButton className="w-full py-3.5">Создать</PrimaryActionButton>
          </form>
        </Modal>
      ) : null}
    </ScreenContainer>
  );
}
