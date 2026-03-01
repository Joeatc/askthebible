import React, { useState, useCallback } from 'react';
import './App.css';
import { Verse, Chapter, Book } from './types';
import TranslationSelector from './components/TranslationSelector';
import BookSelector from './components/BookSelector';
import ChapterVerseSelector from './components/ChapterVerseSelector';
import VerseDisplay from './components/VerseDisplay';
import PresentationMode from './components/PresentationMode';
import BackgroundUploader, { STORAGE_KEY } from './components/BackgroundUploader';

function App() {
  const [translation, setTranslation] = useState('schlachter');
  const [translationName, setTranslationName] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );

  const handleTranslationChange = (abbr: string) => {
    setTranslation(abbr);
    setSelectedBook(null);
    setSelectedVerse(null);
    setCurrentChapter(null);
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setSelectedVerse(null);
    setCurrentChapter(null);
  };

  const handleVerseSelect = (verse: Verse, chapter: Chapter, translationLabel: string) => {
    setSelectedVerse(verse);
    setCurrentChapter(chapter);
    setTranslationName(translationLabel);
  };

  const handleNavigate = useCallback((verseNr: number) => {
    if (!currentChapter) return;
    const verse = currentChapter.verses.find(v => v.verse === verseNr);
    if (verse) setSelectedVerse(verse);
  }, [currentChapter]);

  return (
    <div className="app-container">
      <div className="header">
        <img src="logo512.png" alt="a golden cross" className="header-image" />
        <h1 className="title">Ask the Bible</h1>
      </div>

      <TranslationSelector selected={translation} onSelect={handleTranslationChange} />

      {translation && (
        <BookSelector
          abbreviation={translation}
          selectedNr={selectedBook?.nr ?? null}
          onSelect={handleBookSelect}
        />
      )}

      {selectedBook && (
        <ChapterVerseSelector
          abbreviation={translation}
          bookNr={selectedBook.nr}
          bookName={selectedBook.name}
          onVerseSelect={handleVerseSelect}
        />
      )}

      <VerseDisplay
        verse={selectedVerse}
        translationName={translationName}
        onPresent={() => setPresenting(true)}
      />

      <BackgroundUploader
        backgroundImage={backgroundImage}
        onChange={setBackgroundImage}
      />

      {presenting && selectedVerse && currentChapter && (
        <PresentationMode
          verse={selectedVerse}
          chapter={currentChapter}
          translationName={translationName}
          backgroundImage={backgroundImage}
          onExit={() => setPresenting(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}

export default App;
