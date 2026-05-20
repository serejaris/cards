export function topicFacts(state, topicId) {
  return state.facts.filter((fact) => fact.topicId === topicId);
}

export function topicCards(state, topicId) {
  return state.cards.filter((card) => card.topicId === topicId);
}

export function topicProgress(state, topicId) {
  const cards = topicCards(state, topicId);
  if (!cards.length) return 0;
  const known = cards.filter((card) => card.status === 'known').length;
  return Math.round((known / cards.length) * 100);
}

export function repeatCards(state) {
  return state.cards.filter((card) => card.status === 'repeat' || card.status === 'unknown');
}

export function weakTopics(state) {
  return state.topics
    .map((topic) => {
      const cards = topicCards(state, topic.id);
      const weak = cards.filter((card) => card.status === 'unknown').length;
      const rate = cards.length ? Math.round((weak / cards.length) * 100) : 0;
      return { topic, rate };
    })
    .filter((item) => item.rate > 0)
    .sort((a, b) => b.rate - a.rate);
}

export function hardQuestions(state) {
  return state.cards
    .filter((card) => card.status === 'unknown' || card.status === 'repeat')
    .map((card) => ({
      ...card,
      errorCount: state.errors.filter((error) => error.cardId === card.id).length + (card.status === 'unknown' ? 1 : 0),
    }))
    .sort((a, b) => b.errorCount - a.errorCount);
}
