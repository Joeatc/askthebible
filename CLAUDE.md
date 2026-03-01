# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Ask the Bible" is a single-page React + TypeScript app that queries the public [getBible.net v2 API](https://query.getbible.net) to look up Bible verses in multiple languages (German, English, French, Russian). Deployed at `https://www.lukas-walther.de/AskTheBible`.

## Commands

- `npm start` — dev server on localhost:3000
- `npm run build` — production build (output to `/build`, uses `homepage` from package.json for asset paths)
- `npm test` — Jest in watch mode (note: the existing test in `App.test.tsx` is stale CRA boilerplate and will fail)

Linting is built into react-scripts; ESLint config is in `package.json` (`react-app` + `react-app/jest` presets).

## Architecture

This is a Create React App (react-scripts 5.0.1) project with TypeScript. The entire application lives in a single component:

- **`src/App.tsx`** — all application logic: language selector, verse input, API call via axios to `https://query.getbible.net/v2/{language}/{verse}`, response parsing (strips `<FR>`/`<Fr>` markup), and display. State is three `useState` hooks (`language`, `verse`, `verseText`).
- **`src/App.css`** — all component styling.
- **`src/index.tsx`** — React entry point.

No routing, no state management library, no backend. The `proxy` field in `package.json` points to `https://lukas-walther.de` for dev proxying.

## Key Config

- **TypeScript**: strict mode, ES5 target, `react-jsx` transform, `noEmit: true` (type-checking only; CRA handles compilation)
- **`package.json` `homepage`**: `https://www.lukas-walther.de/AskTheBible` — affects asset base path in production builds