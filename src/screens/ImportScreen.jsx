import { useState } from 'react';
import { ScreenContainer } from '../components/Layout.jsx';

const defaultMaterial = `Doom — 1993, id Software, FPS.
Diablo — 1996, Blizzard, action RPG, Тристрад.
Fallout — 1998, Interplay, постапокалипсис, SPECIAL.
Half-Life — Valve, 1998, GoldSrc, Гордон Фримен.`;

export function ImportScreen({ state, activeTopic, onExtractFacts }) {
  const [topicId, setTopicId] = useState(activeTopic?.id || state.topics[0]?.id);
  const [material, setMaterial] = useState(defaultMaterial);

  function submit(event) {
    event.preventDefault();
    onExtractFacts({ topicId, material });
  }

  return (
    <ScreenContainer id="import" width="max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-2">Добавить материал</h2>
      <p className="text-slate-500 mb-8">Система проанализирует текст и выделит ключевые факты для карточек.</p>

      <form className="space-y-6" onSubmit={submit}>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Тема</label>
          <select
            className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-medium"
            value={topicId}
            onChange={(event) => setTopicId(event.target.value)}
          >
            {state.topics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Текст / заметка / список</label>
          <textarea
            rows="10"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all font-mono text-sm leading-relaxed"
            placeholder="Вставьте материал сюда…"
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-sm hover:bg-indigo-700 transition-all"
        >
          Извлечь факты
        </button>
      </form>
    </ScreenContainer>
  );
}
