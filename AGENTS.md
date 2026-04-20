# Agents Guide

Context and conventions for AI agents working in this repo.

---

## Project Overview

A two-view gardening tracker app:
1. **Plant Catalog** — browse, search and filter plants
2. **To-Do** — smart task list showing what needs doing, with completion tracking

See [PLAN.md](PLAN.md) for full architecture and phase breakdown.
See [CHECKLIST.md](CHECKLIST.md) for granular step-by-step progress.

---

## Repo Structure

```
/backend     Python FastAPI app (Google Sheets as data store)
/frontend    TypeScript + React + Vite app
```

---

## Stack

| Layer | Tech |
|---|---|
| Backend | Python 3.13.11 · FastAPI · gspread (Google Sheets) |
| Frontend | TypeScript · React · Vite · Tailwind CSS · shadcn/ui |
| Testing | pytest (backend) · Vitest + React Testing Library (frontend) |

---

## Python / Backend

- Python version: **3.13.11**, managed via **pyenv** (`.python-version` in `/backend`)
- Package manager: **uv** — use `uv add` to add deps, never edit `pyproject.toml` deps manually
- Virtual env is at `backend/.venv` — activate with `source backend/.venv/bin/activate`
- Run backend: `cd backend && uvicorn main:app --reload`
- Run tests: `cd backend && pytest`

---

## Frontend

- Scaffold: Vite + React + TypeScript
- Run frontend: `cd frontend && npm run dev`
- Run tests: `cd frontend && npm test`

---

## Branching & Commit Conventions

- Each checklist item gets its own branch: `feat/<number>-<short-description>` (e.g. `feat/1.2-backend-fastapi-skeleton`)
- Each branch is a single PR, merged into `main` when complete
- Before starting a checklist item, break it into atomic sub-steps with explicit test names
- Each commit follows **Red → Green → Refactor** TDD
- **Never commit without explicit confirmation from the user**

---

## Working Agreements

- Always wait for the user to say "commit" before running any git commit command
- Present changes for review after each unit of work
- Update CHECKLIST.md to tick off completed steps
- Document any significant decisions (tool choices, version choices etc.) in CHECKLIST.md as notes alongside the relevant step
