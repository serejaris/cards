# AGENTS.md

## Purpose and Scope

This repo is a React + Vite prototype for "ЧГК Cards": a personal fact base and flash-card trainer for intellectual games.

These rules apply to the whole repository.

## Canonical Paths

- `prd.md` — product source of truth: goals, entities, screens, components, MVP criteria.
- `src/screens/` — current screen source of truth: real screen composition and interactions.
- `src/components/` — reusable UI component source of truth.
- `src/App.jsx` — app state, navigation, and localStorage-backed actions.
- `index.html` — Vite entrypoint.
- `README.md` — human-facing project summary and launch instructions.

## System Boundaries

- Keep the prototype on React + Vite with Tailwind CSS from CDN unless the user explicitly asks for a different stack.
- Do not introduce backends, databases, routing libraries, authentication, or external APIs without explicit approval.
- Store MVP data locally with `localStorage` key `chgk-cards-state-v1`.
- Treat current screens as the app contract: `home`, `topic`, `import`, `generate`, `training`, `errors`, `stats`.

## Safe Defaults

- Start every UI/product change by reading `prd.md`, `src/App.jsx`, `src/screens/`, and `src/components/`.
- Keep `prd.md`, `src/screens/`, and `src/components/` synchronized.
- If a new screen is added, add it to `prd.md` section "Основные экраны MVP" and to `src/screens/`.
- If a new reusable UI block is added, add it to `prd.md` section "Компонентная структура".
- Prefer small, local edits over architecture changes.
- Keep interface text in Russian unless the user asks otherwise.

## Allowed Actions

- Edit `prd.md`, `README.md`, this `AGENTS.md`, `src/screens/`, `src/components/`, `src/lib/`, and `src/data/`.
- Run local preview with:

```bash
npm run dev -- --host 127.0.0.1 --port 8765
```

- Verify the app at:

```text
http://localhost:8765/
```

- Use another free local port only if `8765` is busy.

## Confirmation-Required Actions

- Replacing React + Vite with another framework.
- Adding external APIs, AI calls, authentication, deploy config, or backend services.
- Renaming existing screen ids or navigation labels.

## Forbidden Actions

- Do not remove an existing screen from `src/screens/` without explicit user approval.
- Do not invent product scope beyond the MVP in `prd.md`.
- Do not add fake commands, fake services, or future architecture to docs.
- Do not make destructive git or filesystem changes unless explicitly requested.

## Validation Commands

Check that screen files exist:

```bash
rg --files src/screens
```

Check sidebar navigation:

```bash
rg -n 'data-nav=|navItems' src
```

Check PRD references for current screens:

```bash
rg -n '`(home|topic|import|generate|training|errors|stats)`' prd.md
```

Preview locally:

```bash
npm run dev -- --host 127.0.0.1 --port 8765
```

Build:

```bash
npm run build
```

## Execution Contract

- Before declaring UI work complete, open or verify `http://localhost:8765/`.
- For screen changes, confirm the sidebar path and at least one main transition still works.
- In final responses, say what files changed and what validation was run.

## References

- Product and component structure: `prd.md`
- Current UI implementation: `src/App.jsx`, `src/screens/`, `src/components/`
- Launch instructions: `README.md`
