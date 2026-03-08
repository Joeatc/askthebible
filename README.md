# Ask the Bible

A single-page web app for looking up Bible verses in multiple languages. Select a translation, book, chapter, and verse — then present it in fullscreen mode with a custom background image.

**Live:** [https://askthebible.app](https://askthebible.app)

## Features

- Step-by-step verse selection: translation, book, chapter, verse
- Multiple Bible translations across four languages (German, English, French, Russian)
- Fullscreen presentation mode with verse navigation
- Custom background image upload (stored locally)
- Multilingual UI with language switcher
- Hamburger menu with donation link, help, and version info

## Tech Stack

- React 18 + TypeScript
- [getBible.net v2 API](https://query.getbible.net) for Bible data
- Create React App (react-scripts 5.0.1)
- No routing, no backend, no state management library

## Getting Started

```bash
npm install
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Dev server on localhost:3000 |
| `npm run build` | Production build to `/build` |
| `npm test` | Run tests in watch mode |

## Author

Joachim Walther

## License

ISC

## Acknowledgements

Built with data from [getBible.net](https://getbible.net). Created with respect and honor to the people who made the repository and the API.