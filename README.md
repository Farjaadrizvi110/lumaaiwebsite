# LUMA AI Website

LUMA is a cinematic Next.js landing page for a fictional motion design studio. The project uses the App Router, Tailwind CSS, shadcn/ui primitives, GSAP, and Framer Motion to deliver a dark, animated marketing site.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- GSAP
- Framer Motion
- Prisma with SQLite

## Features

- Animated hero, showcase, process, testimonials, and CTA sections
- Dark theme with polished typography and gradient treatments
- Responsive navigation and mobile menu
- Prisma schema and local SQLite database setup
- Standalone build output enabled in Next.js config

## Project Structure

```text
src/
  app/                  App Router entry points
  components/site/      Marketing page sections
  components/ui/        Reusable UI primitives
  components/providers/ Theme provider
  hooks/                Client hooks
  lib/                  Shared utilities and db helper
prisma/                 Prisma schema
public/                 Static assets
.zscripts/              Helper scripts used in this workspace
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install dependencies

```bash
npm install --legacy-peer-deps
```

### Start development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run db:push
npm run db:generate
npm run db:migrate
```

## Database

This project uses Prisma with SQLite. Make sure your `.env` contains a valid `DATABASE_URL`, for example:

```env
DATABASE_URL="file:./db/custom.db"
```

Then run:

```bash
npm run db:push
```

## Notes

- The root scripts are written to work cleanly on Windows.
- `.env`, build output, logs, and local runtime artifacts are ignored by Git.
