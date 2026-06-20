# Best Content Planner — CLAUDE.md

## Project Purpose
An internal async content ops tool for Arjun + content creator.
Replaces WhatsApp back-and-forth for task briefing, tracking, and publishing across all digital projects.

## Team
- **Arjun** — creates tasks, writes briefs/scripts, reviews dashboard
- **Staff** — executes tasks, marks done, adds published URLs, comments

## Projects Covered
- EduNepal (FB page, YouTube longform, Instagram)
- EnglishGyan (TikTok)
- NepalDainik / Lamkhutte (approve n8n/Claude drafts, Instagram)
- Isotope (Instagram)

## Tech Stack
- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui
- **Database:** Supabase (cloud, not local)
- **State:** Zustand
- **Notifications:** Telegram bot via n8n + Supabase webhooks
- **Deploy:** PM2 + Nginx on Hostinger VPS

## Supabase Tables
- `projects` — id, name, color, created_at
- `tasks` — id, project_id, title, channel, content_type, status, assigned_to, due_date, brief, script, instructions, reference_links, published_url, completion_notes, completed_at, created_at, updated_at
- `comments` — id, task_id, author_name, body, created_at

## Task Status Flow
Pending → In Progress → Review → Done

## App Routes
- `/` — Dashboard (all projects, status summary)
- `/tasks` — All tasks with filters
- `/tasks/new` — Create task
- `/tasks/[id]` — Task detail (context + completion + comments)

## Conventions
- No `any` in TypeScript
- Server components by default, `use client` only when needed
- All Supabase calls in `/lib/supabase.ts`
- Environment variables in `.env.local` — never commit this file
- shadcn/ui for all UI components

## Environment Variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

## What NOT to do
- Do not use pages/ router — App Router only
- Do not install unnecessary packages
- Do not add auth yet (phase 2)
- Do not use localStorage