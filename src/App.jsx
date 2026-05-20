import { useEffect, useMemo, useState } from 'react';
import { SidebarNavigation } from './components/Layout.jsx';
import { createId, loadState, saveState, todayIsoDate } from './lib/storage.js';
import { topicCards, topicFacts } from './lib/derive.js';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { TopicScreen } from './screens/TopicScreen.jsx';
import { ImportScreen } from './screens/ImportScreen.jsx';
import { GenerateScreen } from './screens/GenerateScreen.jsx';
import { TrainingScreen } from './screens/TrainingScreen.jsx';
import { ErrorsScreen } from './screens/ErrorsScreen.jsx';
import { StatsScreen } from './screens/StatsScreen.jsx';

function buildCardFromFact(fact) {
  const answer = fact.text.split(/[—-]/)[0].trim() || fact.text.slice(0, 48);
  return {
    id: createId('card'),
    topicId: fact.topicId,
    factId: fact.id,
    question: `Что нужно вспомнить по факту: ${fact.text}?`,
    answer,
    explanation: fact.explanation || 'Карточка создана из добавленного факта.',
    status: 'new',
    repetitions: 0,
    lastReviewedAt: null,
  };
}

function samplePendingFacts(topicId) {
  return [
    {
      id: createId('pending'),
      topicId,
      text: 'Quake (1996) использовал полигональную 3D-графику вместо спрайтов Doom.',
      explanation: 'id Software; важный шаг в эволюции шутеров.',
      selected: true,
    },
    {
      id: createId('pending'),
      topicId,
      text: 'StarCraft (1998) — Blizzard, три расы: терраны, протоссы, зерги.',
      explanation: 'Киберспорт в Корее начался с этой игры.',
      selected: true,
    },
  ];
}

export function App() {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const activeTopic = useMemo(
    () => state.topics.find((topic) => topic.id === state.activeTopicId) || state.topics[0],
    [state.activeTopicId, state.topics],
  );

  function updateState(updater) {
    setState((current) => {
      const next = typeof updater === 'function' ? updater(current) : updater;
      return next;
    });
  }

  function navigate(screen, topicId) {
    updateState((current) => ({
      ...current,
      currentScreen: screen,
      activeTopicId: topicId || current.activeTopicId,
      pendingFacts:
        screen === 'generate' && current.pendingFacts.length === 0
          ? samplePendingFacts(topicId || current.activeTopicId)
          : current.pendingFacts,
      training: screen === 'training' ? { ...current.training, side: 'front' } : current.training,
    }));
  }

  function createTopic(topicDraft) {
    const topic = {
      id: createId('topic'),
      title: topicDraft.title.trim(),
      description: topicDraft.description.trim() || 'Новая тема для повторения.',
      tags: topicDraft.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      deckStyle: 'Classic Study',
      status: 'новая',
      createdAt: todayIsoDate(),
    };
    updateState((current) => ({
      ...current,
      topics: [...current.topics, topic],
      activeTopicId: topic.id,
      currentScreen: 'topic',
    }));
  }

  function extractFacts({ topicId, material }) {
    const pendingFacts = material
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => ({
        id: createId('pending'),
        topicId,
        text: line,
        explanation: 'Факт извлечён из добавленного материала.',
        selected: true,
      }));

    updateState((current) => ({
      ...current,
      activeTopicId: topicId,
      pendingFacts,
      currentScreen: 'generate',
    }));
  }

  function updatePendingFact(id, changes) {
    updateState((current) => ({
      ...current,
      pendingFacts: current.pendingFacts.map((fact) => (fact.id === id ? { ...fact, ...changes } : fact)),
    }));
  }

  function savePendingFacts() {
    updateState((current) => {
      const facts = current.pendingFacts
        .filter((fact) => fact.selected)
        .map((fact) => ({
          id: createId('fact'),
          topicId: fact.topicId,
          text: fact.text,
          explanation: fact.explanation,
          importance: 'средняя',
          tags: [],
        }));
      const cards = facts.map(buildCardFromFact);

      return {
        ...current,
        facts: [...current.facts, ...facts],
        cards: [...current.cards, ...cards],
        pendingFacts: [],
        currentScreen: 'topic',
      };
    });
  }

  function setTrainingSide(side) {
    updateState((current) => ({
      ...current,
      training: { ...current.training, side },
    }));
  }

  function recordTrainingResult(status) {
    updateState((current) => {
      const activeCards = topicCards(current, current.activeTopicId);
      const currentCard = current.cards.find((card) => card.id === current.training.activeCardId) || activeCards[0];
      const currentIndex = activeCards.findIndex((card) => card.id === currentCard?.id);
      const nextCard = activeCards[(currentIndex + 1) % Math.max(activeCards.length, 1)];

      return {
        ...current,
        cards: current.cards.map((card) =>
          card.id === currentCard?.id
            ? {
                ...card,
                status,
                repetitions: card.repetitions + 1,
                lastReviewedAt: todayIsoDate(),
              }
            : card,
        ),
        training: {
          activeCardId: nextCard?.id || current.training.activeCardId,
          side: 'front',
        },
      };
    });
  }

  function skipTrainingCard() {
    updateState((current) => {
      const activeCards = topicCards(current, current.activeTopicId);
      const currentIndex = activeCards.findIndex((card) => card.id === current.training.activeCardId);
      const nextCard = activeCards[(currentIndex + 1) % Math.max(activeCards.length, 1)];
      return {
        ...current,
        training: {
          activeCardId: nextCard?.id || current.training.activeCardId,
          side: 'front',
        },
      };
    });
  }

  function addError(errorDraft) {
    const error = {
      id: createId('error'),
      topicId: errorDraft.topicId,
      context: errorDraft.context.trim(),
      correctAnswer: errorDraft.correctAnswer.trim(),
      date: todayIsoDate(),
      cardId: null,
    };
    updateState((current) => ({
      ...current,
      errors: [...current.errors, error],
    }));
  }

  function createCardFromError(errorId) {
    updateState((current) => {
      const error = current.errors.find((item) => item.id === errorId);
      if (!error) return current;

      const fact = {
        id: createId('fact'),
        topicId: error.topicId,
        text: error.context,
        explanation: `Правильный ответ: ${error.correctAnswer}`,
        importance: 'высокая',
        tags: ['ошибка'],
      };
      const card = {
        ...buildCardFromFact(fact),
        question: error.context,
        answer: error.correctAnswer,
        status: 'repeat',
      };

      return {
        ...current,
        facts: [...current.facts, fact],
        cards: [...current.cards, card],
        errors: current.errors.map((item) => (item.id === errorId ? { ...item, cardId: card.id } : item)),
      };
    });
  }

  const screenProps = {
    state,
    activeTopic,
    topicFacts: topicFacts(state, activeTopic?.id),
    topicCards: topicCards(state, activeTopic?.id),
    onNavigate: navigate,
  };

  return (
    <div className="flex min-h-screen">
      <SidebarNavigation currentScreen={state.currentScreen} onNavigate={navigate} />
      <main className="flex-1 p-10 overflow-auto bg-white">
        {state.currentScreen === 'home' && <HomeScreen {...screenProps} onCreateTopic={createTopic} />}
        {state.currentScreen === 'topic' && <TopicScreen {...screenProps} />}
        {state.currentScreen === 'import' && <ImportScreen {...screenProps} onExtractFacts={extractFacts} />}
        {state.currentScreen === 'generate' && (
          <GenerateScreen
            {...screenProps}
            onUpdatePendingFact={updatePendingFact}
            onSavePendingFacts={savePendingFacts}
          />
        )}
        {state.currentScreen === 'training' && (
          <TrainingScreen
            {...screenProps}
            onSetSide={setTrainingSide}
            onRecordResult={recordTrainingResult}
            onSkip={skipTrainingCard}
          />
        )}
        {state.currentScreen === 'errors' && (
          <ErrorsScreen {...screenProps} onAddError={addError} onCreateCardFromError={createCardFromError} />
        )}
        {state.currentScreen === 'stats' && <StatsScreen {...screenProps} />}
      </main>
    </div>
  );
}
