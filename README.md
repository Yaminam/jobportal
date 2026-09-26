# Job Portal

A full-stack job portal where candidates search, save and apply for jobs and employers post openings — built with the Next.js 15 App Router and TypeScript.

**Live demo:** https://v0-mern-job-portal-one.vercel.app
**Case study:** https://shreyashtripathi.in/projects/mern-job-portal
**Built by:** [Shreyash Tripathi](https://shreyashtripathi.in) — Frontend Developer & UI/UX Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-shreyashtripathi.in-26D0CE?style=for-the-badge&logo=googlechrome&logoColor=white)](https://shreyashtripathi.in)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://v0-mern-job-portal-one.vercel.app)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/jOM4M9ifyki)

## Features

- **Accounts for job seekers and employers** — register and login API routes with bcrypt password hashing and JSON Web Tokens
- **Job search** — filter openings by keyword, location and job type
- **Applications and saved jobs** — apply to jobs, save them for later and track every application
- **Dashboard** — application and saved-job stats plus recent activity
- **Post a job** — employers publish new openings from a dedicated form
- **Dark / light theme** — follows the system setting, with loading skeletons on every main route

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript · REST API routes · JWT · bcrypt · PostgreSQL schema · Tailwind CSS · shadcn/ui

## Project structure

```
app/            pages (jobs, companies, dashboard, post-job, profile, resume, …) and API routes
app/api/        auth (login, register), jobs, applications, profile, resume
components/     theme provider/toggle and shadcn/ui components
scripts/        create-database.sql (8 tables) and seed-data.sql
docs/           API, setup and deployment docs
```

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

> The live demo is a prototype: API routes serve in-memory sample data and the dashboard keeps state in the browser. `scripts/create-database.sql` defines the PostgreSQL schema for a real database.

## Development workflow

This repository stays in sync with the project on [v0.dev](https://v0.dev/chat/projects/jOM4M9ifyki): changes deployed from v0 are pushed here, and Vercel deploys the latest version.
