# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

- `artifacts/miswak-dental` — Miswak Dental Hospital marketing site (React + Vite + Tailwind v3 + react-router-dom). Ported from a Lovable project.
- `artifacts/api-server` — Express 5 backend serving `/api/*`. Hosts the chatbot booking endpoint at `/api/chat-booking`, which uses Replit's Gemini AI integration and persists submissions to the `appointment_requests` table.

## Database

- `appointment_requests` — chatbot-collected booking requests (name, phone, email, preferred_date, treatment, notes, transcript).
