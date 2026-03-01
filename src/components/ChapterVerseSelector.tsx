import React, { useEffect, useState } from 'react';
import { BookData, Chapter, Verse } from '../types';
import { fetchBook } from '../api';

interface Props {
  abbreviation: string;
  bookNr: number;
  bookName: string;
  onVerseSelect: (verse: Verse, chapter: Chapter, translationName: string) => void;
}

export default function ChapterVerseSelector({ abbreviation, bookNr, bookName, onVerseSelect }: Props) {
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setSelectedChapter(null);
    setSelectedVerse(null);
    fetchBook(abbreviation, bookNr)
      .then(data => setBookData(data))
      .catch(err => console.error('Failed to fetch book data:', err))
      .finally(() => setLoading(false));
  }, [abbreviation, bookNr]);

  if (loading) return <p className="loading-text">Loading {bookName}...</p>;
  if (!bookData) return null;

  const chapters = bookData.chapters;
  const currentChapter = selectedChapter !== null
    ? chapters.find(c => c.chapter === selectedChapter)
    : null;

  const handleVerseClick = (verseNr: number) => {
    setSelectedVerse(verseNr);
    if (currentChapter) {
      const verse = currentChapter.verses.find(v => v.verse === verseNr);
      if (verse) {
        onVerseSelect(verse, currentChapter, bookData.translation);
      }
    }
  };

  return (
    <div className="selector-section">
      <label className="selector-label">Chapter</label>
      <div className="chapter-grid">
        {chapters.map(ch => (
          <button
            key={ch.chapter}
            className={`chapter-button ${selectedChapter === ch.chapter ? 'selected' : ''}`}
            onClick={() => { setSelectedChapter(ch.chapter); setSelectedVerse(null); }}
          >
            {ch.chapter}
          </button>
        ))}
      </div>

      {currentChapter && (
        <>
          <label className="selector-label">
            Verse <span className="verse-hint">(1–{currentChapter.verses.length} available)</span>
          </label>
          <div className="verse-grid">
            {currentChapter.verses.map(v => (
              <button
                key={v.verse}
                className={`verse-button ${selectedVerse === v.verse ? 'selected' : ''}`}
                onClick={() => handleVerseClick(v.verse)}
              >
                {v.verse}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
