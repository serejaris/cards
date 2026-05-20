import { initialState, STORAGE_KEY } from '../data/seed.js';

export function loadState() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;
    return { ...initialState, ...JSON.parse(stored) };
  } catch {
    return initialState;
  }
}

export function saveState(state) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}
