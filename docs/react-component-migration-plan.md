# План: миграция ЧГК Cards на React-компоненты

## Summary

- Перевести текущий single-file прототип на `React + Vite`, сохранив внешний вид Classic Study 1-в-1.
- Разбить приложение на экраны и компоненты внутри экранов.
- Добавить рабочее состояние через `localStorage`: темы, факты, карточки, тренировка, ошибки, статистика.
- Обновить `prd.md`, `README.md`, `AGENTS.md` под новую компонентную структуру и команды запуска.

## Key Changes

- Создать Vite-структуру:
  - `package.json`, `index.html`, `src/main.jsx`, `src/App.jsx`;
  - `src/data/seed.js` для стартовых данных;
  - `src/lib/storage.js` для чтения/записи `localStorage`;
  - `src/components/` для общих UI-компонентов;
  - `src/screens/` для экранов `Home`, `Topic`, `Import`, `Generate`, `Training`, `Errors`, `Stats`.
- Использовать ключ `chgk-cards-state-v1` в `localStorage`.
- Данные хранить в одном объекте:
  - `topics[]`, `facts[]`, `cards[]`, `errors[]`, `activeTopicId`, `currentScreen`, `training`.
- Реализовать MVP-действия:
  - создать тему через простой modal/form;
  - добавить материал: строки текста превращаются в кандидаты фактов;
  - сохранить выбранные факты и автоматически создать карточки;
  - тренировка меняет статус карточки: `known`, `unknown`, `repeat`;
  - журнал ошибок сохраняет ошибки и может создать карточку из ошибки;
  - статистика считается из текущих данных.
- Не делать полный CRUD:
  - редактирование и удаление тем/фактов/карточек оставить как будущие действия;
  - AI-генерацию не подключать, только локальная deterministic-логика.

## Component Split

- Общие компоненты:
  - `SidebarNavigation`, `ScreenContainer`, `ScreenHeader`;
  - `PrimaryActionButton`, `SecondaryActionButton`, `StatusBadge`;
  - `MetricCard`, `Modal`, `EmptyState`.
- Экраны:
  - `HomeScreen`: review card, weak topics card, topic table.
  - `TopicScreen`: topic header, metric cards, tabs, fact/card rows.
  - `ImportScreen`: topic select, textarea, extract action.
  - `GenerateScreen`: topic input, extracted fact checkbox list, save/cancel.
  - `TrainingScreen`: progress bar, card front/back, result buttons.
  - `ErrorsScreen`: add error form/modal, errors table, create-card action.
  - `StatsScreen`: metric grid, hard question list.
- `App.jsx` держит верхний state и передаёт handlers вниз; отдельный роутер не добавлять.

## Docs Updates

- `prd.md`: добавить, что компонентная версия теперь React + Vite, а разделы экранов соответствуют `src/screens`.
- `README.md`: заменить запуск на:

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 8765
```

- `AGENTS.md`: обновить границы системы:
  - React + Vite теперь разрешённая архитектура;
  - source of truth по UI: `prd.md` + `src/screens` + `src/components`;
  - после UI-изменений проверять `http://localhost:8765/`.

## Test Plan

- Установить зависимости: `npm install`.
- Запустить: `npm run dev -- --host 127.0.0.1 --port 8765`.
- Проверить в браузере:
  - sidebar открывает все 7 экранов;
  - создание темы сохраняется после reload;
  - импорт текста создаёт кандидаты фактов;
  - сохранение фактов создаёт факты и карточки;
  - тренировка переключает front/back и сохраняет статус;
  - ошибка сохраняется и создаёт карточку;
  - статистика меняется после действий.
- Проверить синхронизацию:
  - все экраны из PRD есть в `src/screens`;
  - ключевые компоненты из PRD есть в `src/components`;
  - `npm run build` проходит без ошибок.

## Assumptions

- Фреймворк: `React + Vite`.
- Визуальный стиль: сохранить текущий Classic Study UI 1-в-1.
- Данные: только локально в `localStorage`, без backend/API/AI.
- Полный CRUD, авторизация, deploy и настоящий AI-extraction не входят в этот шаг.
