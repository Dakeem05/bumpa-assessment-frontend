# Bumpa Assessment Frontend

Frontend for purchase tracking and achievements system.

## What it does

Users can make purchases and see their achievements based on spending. There's a badge system that tracks progress from Bronze to Platinum.

## Stack

- React + TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- Vite

## Setup

```bash
npm install
```

Create `.env`:
```
VITE_API_BASE_URL=https://bumpa-assessment.test/api
```

Run:
```bash
npm run dev
```

## Structure

```
src/
├── pages/
│   ├── Purchase.tsx
│   └── Achievements.tsx
└── store/
    └── slices/
        ├── purchaseSlice.ts
        └── achievementsSlice.ts
```

## Endpoints

- `POST /users/purchase` - make purchase
- `GET /users/:email/achievements` - get achievements

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # run linter
```
