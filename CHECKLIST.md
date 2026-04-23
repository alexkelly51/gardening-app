# Gardening Tracker — Build Checklist

Each commit follows **Red → Green → Refactor** TDD:

- 🔴 **Red** — write the failing test first
- 🟢 **Green** — write the minimum code to make it pass
- 🔵 **Refactor** — clean up without breaking tests

---

## Phase 1 — Foundation

### 1.1 `chore: remove old CRA app, scaffold project structure`

- [x] 🔴 N/A (no logic to test — structural only)
- [x] 🟢 Delete src/, public/, package.json, package-lock.json. Create /backend and /frontend folders with placeholder READMEs
- [x] 🔵 Confirm folder structure matches plan

### 1.2 `feat(backend): FastAPI app skeleton with health check`

#### 1.2.1 `chore(backend): add pyproject.toml`

> **Decisions made:**
>
> - ~~`requirements.txt`~~ — switched to `uv` + `pyproject.toml` as the modern standard
> - Python **3.13.11** chosen (latest stable as of Apr 2026); installed via **pyenv** to keep versions isolated per project; set via `.python-version` file in `/backend`
> - `uv` manages the venv and lockfile (`uv.lock`)

- [x] 🔴 N/A — no logic to test
- [x] 🟢 Run `uv init` + `uv add fastapi uvicorn pytest httpx`; set Python 3.13.11 via `pyenv local`; update `requires-python = ">=3.13"` in pyproject.toml; remove placeholder `main.py` from uv init
- [x] 🔵 Confirm `requires-python` is set correctly and `.python-version` is committed

#### 1.2.2 `feat(backend): FastAPI app entry point`

- [x] 🔴 `test_app_exists` — import `app` from `main`, assert it's a FastAPI instance
- [x] 🟢 Create `main.py` with bare FastAPI app instantiation
- [x] 🔵 Confirm app is importable with no side effects

#### 1.2.3 `feat(backend): CORS config`

- [x] 🔴 `test_cors_allows_frontend_origin` — OPTIONS to `/health` with `Origin: http://localhost:5173`, assert `Access-Control-Allow-Origin` in response
- [x] 🔴 `test_cors_rejects_unknown_origin` — same with unknown origin, assert it's not echoed back
- [x] 🟢 Add CORS middleware, load allowed origins from env var
- [x] 🔵 Ensure origins are config-driven, never hardcoded

#### 1.2.4 `feat(backend): GET /health endpoint`

- [x] 🔴 `test_health_returns_200` — GET `/health`, assert status 200
- [x] 🔴 `test_health_returns_ok_body` — GET `/health`, assert body is `{"status": "ok"}`
- [x] 🟢 Add `/health` endpoint returning `{"status": "ok"}`
- [x] 🔵 Confirm response model is typed (not a bare dict)

### 1.3 `feat(frontend): Vite + React + TypeScript scaffold`

#### 1.3.1 `chore(frontend): scaffold Vite + React + TypeScript app`
- [x] 🔴 N/A — structural only
- [x] 🟢 Run `npm create vite@latest` in `/frontend` with React + TypeScript template
- [x] 🔵 Confirm it builds and dev server starts

#### 1.3.2 `feat(frontend): App component renders without crash`
- [x] 🔴 `test_app_renders` — render `<App />`, assert it mounts without error
- [x] 🟢 Minimal `App.tsx` — remove all Vite boilerplate
- [x] 🔵 Remove default Vite CSS, counter component, assets

### 1.4 `feat(frontend): add Tailwind CSS and shadcn/ui`

#### 1.4.1 `chore(frontend): install and configure Tailwind CSS`
- [x] 🔴 N/A — config only
- [x] 🟢 Install Tailwind, add `@tailwind` directives, wire into `main.tsx`
- [x] 🔵 Confirm build passes with Tailwind classes

#### 1.4.2 `feat(frontend): verify Tailwind renders correctly`
- [x] 🔴 `test_tailwind_class_applied` — render a component with a Tailwind class, assert the element is in the document
- [x] 🟢 Add a simple styled element to `App.tsx`
- [x] 🔵 Confirm unused classes are stripped in prod (check `content` paths in config)

#### 1.4.3 `chore(frontend): init shadcn/ui with green theme`
- [x] 🔴 N/A — config only
- [x] 🟢 Run `shadcn init`, set green-based theme colours
- [x] 🔵 Confirm a shadcn component imports and renders correctly

### 1.5 `feat(frontend): connect to backend health check`

#### 1.5.1 `chore(frontend): add API client helper`
- [x] 🔴 N/A — structural only
- [x] 🟢 Create `src/lib/api.ts` with base URL from `VITE_API_URL` env var
- [x] 🔵 Ensure all future fetches go through one place

#### 1.5.2 `feat(frontend): health check status component`
- [ ] 🔴 `test_shows_connected` — mock fetch returning ok, assert "connected" shown
- [ ] 🔴 `test_shows_disconnected` — mock fetch failing, assert "disconnected" shown
- [ ] 🟢 Create `HealthStatus` component that fetches `/health` and shows status
- [ ] 🔵 Extract `useHealthCheck()` hook so fetching is separate from rendering

---

## Phase 2 — Google Sheets Integration

### 2.1 `feat(backend): Google Sheets client setup`

- [ ] 🔴 Write test: sheets client initialises correctly with valid credentials (mock the auth)
- [ ] 🟢 Add `gspread`, service account auth helper, sheet connection function, `.env` for sheet ID + key path
- [ ] 🔵 Ensure credentials never hardcoded — always from env

### 2.2 `feat(backend): Python data models (Pydantic)`

- [ ] 🔴 Write test: valid dicts parse into Plant / CareTask / TaskLog models; invalid ones raise errors
- [ ] 🟢 Define Pydantic models for all three entities with correct types and optional fields
- [ ] 🔵 Centralise enums (Position, Action) so frontend types can mirror them

### 2.3 `feat(backend): Sheets read layer`

- [ ] 🔴 Write test: given mock sheet rows, parse functions return correctly typed objects
- [ ] 🟢 Write `get_plants()`, `get_care_tasks()`, `get_task_log()` — fetch rows, map to models
- [ ] 🔵 Handle empty rows, missing optional fields, type coercions (strings → dates/ints)

### 2.4 `feat(backend): dummy data in Google Sheet`

- [ ] 🔴 N/A (data entry — verify by running read layer against real sheet)
- [ ] 🟢 Populate Google Sheet: 6 plants (2 per position), care tasks across multiple months, empty TaskLog
- [ ] 🔵 Confirm all rows parse cleanly via a smoke test script

### 2.5 `feat(backend): Sheets write layer`

- [ ] 🔴 Write test: `log_completion()` appends the correct row to TaskLog (mock the sheet)
- [ ] 🟢 Write `log_completion(plant_id, care_task_id)` — generates id + timestamp, appends row
- [ ] 🔵 Make append idempotent-safe (no duplicate logs if called twice quickly)

---

## Phase 3 — Plant API

### 3.1 `feat(backend): GET /plants with filtering`

- [ ] 🔴 Write test: returns all plants; filters by `?position=`; filters by `?search=` (name/variety)
- [ ] 🟢 Implement endpoint — fetch from Sheets, apply filters, return list
- [ ] 🔵 Extract filter logic to pure function so it can be tested without HTTP

### 3.2 `feat(backend): GET /plants/{id}`

- [ ] 🔴 Write test: returns plant + its care tasks; returns 404 for unknown id
- [ ] 🟢 Implement endpoint — fetch plant by id, attach matching care tasks
- [ ] 🔵 Confirm care tasks are sorted by month_start

### 3.3 `feat(backend): static image serving + placeholder images`

- [ ] 🔴 Write test: image file is served at `/images/{filename}`; 404 for missing file
- [ ] 🟢 Mount `/images/` static route, add placeholder images for each dummy plant
- [ ] 🔵 Confirm image filenames in sheet match actual files

### 3.4 `feat(backend): TypeScript API types`

- [ ] 🔴 Write test: TypeScript compiles without errors using the defined types
- [ ] 🟢 Write `/frontend/src/types/api.ts` — `Plant`, `CareTask`, `TaskLog`, position/action enums
- [ ] 🔵 Ensure enums match backend Python enums exactly

---

## Phase 4 — Plant Catalog UI

### 4.1 `feat(frontend): PlantCard component`

- [ ] 🔴 Write test: renders name, variety, position badge, quantity; shows placeholder if no image
- [ ] 🟢 Build PlantCard with image, name, variety, badge, quantity — using Tailwind + shadcn
- [ ] 🔵 Extract badge colour logic (position → colour) to a utility function

### 4.2 `feat(frontend): PlantGrid view with data fetching`

- [ ] 🔴 Write test: shows loading skeleton; renders cards when data loads; shows empty state
- [ ] 🟢 Fetch `/plants`, render grid of PlantCards, add loading + empty states
- [ ] 🔵 Extract `usePlants()` hook so data fetching is separate from rendering

### 4.3 `feat(frontend): search bar`

- [ ] 🔴 Write test: typing in search bar filters visible cards by name and variety
- [ ] 🟢 Add controlled search input, pass `?search=` param to API (or filter client-side)
- [ ] 🔵 Debounce input so we're not firing on every keystroke

### 4.4 `feat(frontend): position filter dropdown`

- [ ] 🔴 Write test: selecting a position shows only matching plants; clearing shows all
- [ ] 🟢 Add position filter dropdown using shadcn Select, pass `?position=` to API
- [ ] 🔵 Sync search + position filter params cleanly without race conditions

### 4.5 `feat(frontend): PlantDetail panel`

- [ ] 🔴 Write test: clicking a card opens panel with full details and care schedule
- [ ] 🟢 Fetch `/plants/{id}`, render slide-in panel (shadcn Sheet) with all fields + monthly care table
- [ ] 🔵 Group care tasks by month in the panel view

---

## Phase 5 — Task Scheduling API

### 5.1 `feat(backend): scheduling engine`

- [ ] 🔴 Write tests: task due when in month range + not recently done; not due outside month range; not due if completed today; one-off disappears after completion; repeating reappears after frequency_days
- [ ] 🟢 Write pure `get_due_tasks(plants, care_tasks, task_log, today)` function
- [ ] 🔵 Ensure function has no side effects — takes data in, returns due list out

### 5.2 `feat(backend): GET /tasks/due`

- [ ] 🔴 Write test: returns correct due tasks for today's date (mock sheets data)
- [ ] 🟢 Wire scheduling engine to endpoint — fetch all sheets data, run engine, return results
- [ ] 🔵 Include plant name + care task detail in response so frontend doesn't need extra calls

### 5.3 `feat(backend): POST /tasks/{care_task_id}/complete`

- [ ] 🔴 Write test: logs completion + task no longer appears in due list immediately after
- [ ] 🟢 Accept completion, call `log_completion()`, return updated due status for that task
- [ ] 🔵 Validate care_task_id exists before writing

---

## Phase 6 — To-Do UI

### 6.1 `feat(frontend): TaskList view with data fetching`

- [ ] 🔴 Write test: renders due tasks grouped by plant; shows loading state
- [ ] 🟢 Fetch `/tasks/due`, render grouped list, loading skeleton
- [ ] 🔵 Extract `useDueTasks()` hook

### 6.2 `feat(frontend): TaskItem component`

- [ ] 🔴 Write test: renders action badge, detail text, plant name, complete button
- [ ] 🟢 Build TaskItem — action badge (colour per action type), detail, complete button
- [ ] 🔵 Extract action → colour/label mapping to shared utility

### 6.3 `feat(frontend): complete task interaction`

- [ ] 🔴 Write test: clicking complete fires POST request; task removed from list optimistically
- [ ] 🟢 Wire complete button → POST → optimistic UI update → refresh
- [ ] 🔵 Handle error case — restore task if POST fails

### 6.4 `feat(frontend): empty state + all-done state`

- [ ] 🔴 Write test: shows all-done message when no tasks due
- [ ] 🟢 Design a nice empty state for "nothing due today" and "all done!"
- [ ] 🔵 Confirm empty state doesn't flash before data loads

---

## Phase 7 — Navigation & Polish

### 7.1 `feat(frontend): navigation bar`

- [ ] 🔴 Write test: nav renders both links; active link is highlighted
- [ ] 🟢 Add top nav bar with Catalog + To-Do links, active state, app name/logo
- [ ] 🔵 Make nav accessible (aria-current on active link)

### 7.2 `feat(frontend): loading and error states`

- [ ] 🔴 Write test: error banner shows on API failure; retry button re-fetches
- [ ] 🟢 Add consistent error banners + retry across Catalog and To-Do views
- [ ] 🔵 Centralise error handling in API client helper

### 7.3 `feat(frontend): responsive layout`

- [ ] 🔴 Write test: grid shows 1 col on mobile, 2 on tablet, 3+ on desktop
- [ ] 🟢 Audit all views at 375px, 768px, 1280px — fix breakpoints
- [ ] 🔵 Test on actual mobile if possible

### 7.4 `chore: final visual polish pass`

- [ ] 🔴 N/A
- [ ] 🟢 Consistent spacing, typography scale, hover/focus states, colour pass
- [ ] 🔵 Lighthouse accessibility score > 90
