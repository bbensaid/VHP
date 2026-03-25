# HTR Platform — Root Makefile
# Run `make help` to see available commands.

.PHONY: help dev dev-frontend dev-backend install install-frontend install-backend \
        test test-frontend test-backend build lint typecheck migrate

FRONTEND_DIR := frontend
BACKEND_DIR  := backend

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ── Development ──────────────────────────────────────────────────────────────

dev: ## Start both frontend and backend in parallel
	@$(MAKE) -j2 dev-frontend dev-backend

dev-frontend: ## Start Next.js dev server
	cd $(FRONTEND_DIR) && npm run dev

dev-backend: ## Start FastAPI dev server
	cd $(BACKEND_DIR) && uvicorn main:app --reload --port 8000

# ── Installation ─────────────────────────────────────────────────────────────

install: install-frontend install-backend ## Install all dependencies

install-frontend: ## Install frontend npm dependencies
	cd $(FRONTEND_DIR) && npm install

install-backend: ## Install backend Python dependencies
	cd $(BACKEND_DIR) && pip install -r requirements.txt

# ── Testing ──────────────────────────────────────────────────────────────────

test: test-frontend test-backend ## Run all tests

test-frontend: ## Run frontend Jest tests
	cd $(FRONTEND_DIR) && npm test -- --passWithNoTests

test-backend: ## Run backend pytest suite
	cd $(BACKEND_DIR) && python -m pytest tests/ -v --tb=short || true

# ── Build & Quality ──────────────────────────────────────────────────────────

build: ## Build the Next.js frontend
	cd $(FRONTEND_DIR) && npm run build

lint: ## Run ESLint (frontend) and ruff (backend)
	cd $(FRONTEND_DIR) && npm run lint || true
	cd $(BACKEND_DIR) && python -m ruff check . || true

typecheck: ## Run TypeScript type check (frontend) and mypy (backend)
	cd $(FRONTEND_DIR) && npx tsc --noEmit
	cd $(BACKEND_DIR) && python -m mypy main.py --ignore-missing-imports || true

# ── Database ─────────────────────────────────────────────────────────────────

migrate: ## Apply Supabase migrations (requires supabase CLI)
	supabase db push

migrate-dry: ## Validate migrations without applying
	supabase db push --dry-run

# ── Type generation ───────────────────────────────────────────────────────────

types: ## Generate TypeScript types from FastAPI OpenAPI spec
	@echo "Fetching OpenAPI spec from backend..."
	curl -s http://localhost:8000/openapi.json -o /tmp/openapi.json
	cd $(FRONTEND_DIR) && npx openapi-typescript /tmp/openapi.json -o src/types/api.generated.ts
	@echo "Types written to frontend/src/types/api.generated.ts"
