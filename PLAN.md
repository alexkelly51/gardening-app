# Gardening Tracker — Build Plan

## Overview

A two-view app for managing your garden:
1. **Plant Catalog** — browse, search and filter all your plants
2. **Weekly To-Do** — smart task list showing what needs doing this week, with completion tracking

---

## Stack

| Layer | Tech |
|---|---|
| Backend | Python 3.11+ · FastAPI · SQLite · SQLAlchemy |
| Frontend | TypeScript · React · Vite · Tailwind CSS · shadcn/ui |
| Icons | Lucide React |
| Testing | pytest (backend) · Vitest + React Testing Library (frontend) |

---

## Data Model

### Plant
| Field | Type | Notes |
|---|---|---|
| id | int | PK |
| name | str | e.g. "Lavender" |
| variety | str? | e.g. "Hidcote" |
| quantity | int | |
| position | enum | Full Sun / Partial Shade / Full Shade |
| date_purchased | date? | |
| price | float? | |
| notes | str? | |
| image_filename | str? | served from backend /images/ |

### CareTask
| Field | Type | Notes |
|---|---|---|
| id | int | PK |
| plant_id | int | FK → Plant |
| action | enum | Feed / Prune / Propagate / Other |
| detail | str? | e.g. "Use tomato feed at half strength" |
| month_start | int | 1–12 |
| month_end | int | 1–12 |
| frequency_days | int? | null = one-off per season |

### TaskLog
| Field | Type | Notes |
|---|---|---|
| id | int | PK |
| plant_id | int | FK → Plant |
| care_task_id | int | FK → CareTask |
| completed_at | datetime | |

---

## Scheduling Logic

A task is **due** when:
- Current month is within `month_start`–`month_end`
- AND either: never completed this season, OR `last_completed_at + frequency_days <= today`

When marked complete, the clock resets from **today** (not the window start).
One-off tasks (`frequency_days = null`) disappear once completed within the season.

---

## Phases & Commits

Each phase is a logical feature slice. Each commit is a single shippable step — we do one at a time together.

---

### Phase 1 — Foundation

**Goal:** Clean repo, both apps running and talking to each other.

| # | Commit | What |
|---|---|---|
| 1.1 | `chore: remove old CRA app, scaffold project structure` | Delete src/, public/, package.json etc. Create `/backend` and `/frontend` folders with READMEs |
| 1.2 | `feat(backend): FastAPI app skeleton with health check` | `main.py`, `requirements.txt`, CORS config, `GET /health` returns `{status: ok}` |
| 1.3 | `feat(frontend): Vite + React + TypeScript scaffold` | Fresh Vite app in `/frontend`, basic App.tsx |
| 1.4 | `feat(frontend): add Tailwind CSS and shadcn/ui` | Tailwind config, shadcn init, basic theme colours (greens) |
| 1.5 | `feat(frontend): connect to backend health check` | Frontend fetches `/health` on load, shows connected status |

**Tests:** backend health check test · frontend renders without crash

---

### Phase 2 — Data Layer

**Goal:** Database models defined, seeded with realistic dummy data.

| # | Commit | What |
|---|---|---|
| 2.1 | `feat(backend): SQLAlchemy models for Plant, CareTask, TaskLog` | Models, enums, relationships, DB init |
| 2.2 | `feat(backend): seed script with dummy data` | 6 plants across 3 positions, varied care tasks across months, realistic data |
| 2.3 | `feat(backend): Alembic migrations setup` | Init Alembic, first migration, `alembic upgrade head` in startup |

**Tests:** model creation · relationships · seed script runs cleanly

---

### Phase 3 — Plant API

**Goal:** Full CRUD-ish API for plants, images served statically.

| # | Commit | What |
|---|---|---|
| 3.1 | `feat(backend): GET /plants with filtering` | Returns plant list, supports `?position=` and `?search=` query params |
| 3.2 | `feat(backend): GET /plants/{id}` | Single plant with its care tasks |
| 3.3 | `feat(backend): static image serving + placeholder images` | `/images/` static route, placeholder images for dummy plants |
| 3.4 | `feat(backend): TypeScript API types` | Generate/write shared types in `/frontend/src/types/api.ts` matching backend responses |

**Tests:** filter by position · filter by search · 404 on missing plant · images served

---

### Phase 4 — Plant Catalog UI

**Goal:** Beautiful, browsable plant catalog.

| # | Commit | What |
|---|---|---|
| 4.1 | `feat(frontend): PlantCard component` | Card with image, name, variety, position badge, quantity |
| 4.2 | `feat(frontend): PlantGrid view with data fetching` | Grid of PlantCards, loading skeleton, empty state |
| 4.3 | `feat(frontend): search bar` | Filters cards by name/variety as you type |
| 4.4 | `feat(frontend): position filter dropdown` | Filter by Full Sun / Partial Shade / Full Shade |
| 4.5 | `feat(frontend): PlantDetail panel` | Click a card → slide-in panel with full plant info + care schedule by month |

**Tests:** PlantCard renders correctly · search filters results · empty state shows

---

### Phase 5 — Task Scheduling API

**Goal:** Backend returns what's due today, accepts completions.

| # | Commit | What |
|---|---|---|
| 5.1 | `feat(backend): scheduling engine` | Pure function: given plants + tasks + logs + today → list of due tasks |
| 5.2 | `feat(backend): GET /tasks/due` | Returns due tasks for today, includes plant name + task detail |
| 5.3 | `feat(backend): POST /tasks/{care_task_id}/complete` | Logs a completion, returns updated due status |

**Tests:** task due when in month range · task not due when completed today · one-off disappears after completion · repeating reappears after frequency_days

---

### Phase 6 — To-Do UI

**Goal:** Weekly to-do view with completion interactions.

| # | Commit | What |
|---|---|---|
| 6.1 | `feat(frontend): TaskList view with data fetching` | List of due tasks, grouped by plant |
| 6.2 | `feat(frontend): TaskItem component` | Shows action badge, detail, plant name, complete button |
| 6.3 | `feat(frontend): complete task interaction` | Tick off task → optimistic update → POST to backend → refresh |
| 6.4 | `feat(frontend): empty state + all-done celebration` | Nice empty state when nothing is due |

**Tests:** renders tasks · complete button fires correct request · empty state shows

---

### Phase 7 — Navigation & Polish

**Goal:** App feels finished and cohesive.

| # | Commit | What |
|---|---|---|
| 7.1 | `feat(frontend): navigation bar` | Switch between Catalog and To-Do views, active state |
| 7.2 | `feat(frontend): loading and error states` | Skeletons, error banners, retry buttons throughout |
| 7.3 | `feat(frontend): responsive layout` | Works well on mobile + tablet + desktop |
| 7.4 | `chore: final visual polish pass` | Spacing, typography, colour consistency, hover states |

---

## Running Locally

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

---

## What Comes Next (After QA)

- Import from your real spreadsheet (CSV upload endpoint)
- Add / edit / delete plants via UI
- Expand position options to your full 12
- Photo upload from your own images
- Push notifications or email reminders
