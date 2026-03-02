import React, { useState, useCallback } from 'react';
import './App.css';
import { Verse, Chapter, Book } from './types';
import { getI18n } from './i18n';
import TranslationSelector from './components/TranslationSelector';
import BookSelector from './components/BookSelector';
import ChapterVerseSelector from './components/ChapterVerseSelector';
import VerseDisplay from './components/VerseDisplay';
import PresentationMode from './components/PresentationMode';
import BackgroundUploader, { STORAGE_KEY } from './components/BackgroundUploader';
import HamburgerMenu from './components/HamburgerMenu';

function App() {
  const [translation, setTranslation] = useState('schlachter');
  const [lang, setLang] = useState('de');
  const [translationName, setTranslationName] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<Verse | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEY)
  );

  const handleTranslationChange = (abbr: string, language: string) => {
    setTranslation(abbr);
    setLang(language);
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

  const t = getI18n(lang);

  return (
    <div className="app-container">
      <div className="header">
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="a golden cross" className="header-image" />
        <h1 className="title">{t.appTitle}</h1>
        <HamburgerMenu lang={lang} />
      </div>

      <TranslationSelector selected={translation} onSelect={handleTranslationChange} lang={lang} />

      {translation && (
        <BookSelector
          abbreviation={translation}
          selectedNr={selectedBook?.nr ?? null}
          onSelect={handleBookSelect}
          lang={lang}
        />
      )}

      {selectedBook && (
        <ChapterVerseSelector
          abbreviation={translation}
          bookNr={selectedBook.nr}
          bookName={selectedBook.name}
          onVerseSelect={handleVerseSelect}
          lang={lang}
        />
      )}

      <VerseDisplay
        verse={selectedVerse}
        translationName={translationName}
        onPresent={() => setPresenting(true)}
        lang={lang}
      />

      <BackgroundUploader
        backgroundImage={backgroundImage}
        onChange={setBackgroundImage}
        lang={lang}
      />

      {presenting && selectedVerse && currentChapter && (
        <PresentationMode
          verse={selectedVerse}
          chapter={currentChapter}
          translationName={translationName}
          backgroundImage={backgroundImage}
          onExit={() => setPresenting(false)}
          onNavigate={handleNavigate}
          lang={lang}
        />
      )}
    </div>
  );
}

export default App;
