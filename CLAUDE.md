# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server (HMR)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Tech Stack

- **React 19** with Vite 7
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **lucide-react** for icons
- **Space Grotesk** font (Google Fonts)

## Architecture

Single-page portfolio application with all content in `src/App.jsx`:
- One main component with inline data (projects, skills arrays)
- CSS animations in `src/index.css`
- Tailwind configured via Vite plugin in `vite.config.js`

## Design System

- **Colors**: Dark theme with `#0f172a` (hero) and `#0B1120` (sections), blue accent `#3b82f6`
- **Typography**: `font-light` throughout, tracking varies (`0.05em` titles, `0.2em`-`0.3em` labels)
- **Animations**: Custom CSS using `cubic-bezier(0.16, 1, 0.3, 1)` easing for reveals
- **Style**: Minimalist Awwwards aesthetic - no unnecessary effects

## Key Patterns

- Intersection Observer for scroll-triggered animations (`.reveal-hidden` → `.animate-reveal`)
- Sticky positioning for section layouts
- Button animations: text slides up on hover using translate transforms
- Header hides when scrolling into projects section
