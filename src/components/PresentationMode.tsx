import React, { useEffect, useCallback } from 'react';
import { Verse, Chapter } from '../types';

interface Props {
  verse: Verse;
  chapter: Chapter;
  translationName: string;
  backgroundImage: string | null;
  onExit: () => void;
  onNavigate: (verseNr: number) => void;
}

function cleanText(text: string): string {
  return text.replace(/<FR>|<Fr>/g, '');
}

export default function PresentationMode({
  verse,
  chapter,
  translationName,
  backgroundImage,
  onExit,
  onNavigate,
}: Props) {
  const currentIndex = chapter.verses.findIndex(v => v.verse === verse.verse);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onExit();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (currentIndex < chapter.verses.length - 1) {
        onNavigate(chapter.verses[currentIndex + 1].verse);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (currentIndex > 0) {
        onNavigate(chapter.verses[currentIndex - 1].verse);
      }
    }
  }, [currentIndex, chapter.verses, onExit, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const bgStyle: React.CSSProperties = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundColor: '#1a1a2e' };

  return (
    <div className="presentation-overlay" style={bgStyle}>
      <div className="presentation-dimmer">
        <button className="presentation-close" onClick={onExit} title="Exit (ESC)">✕</button>

        <div className="presentation-content">
          <div className="presentation-verse-text">{cleanText(verse.text)}</div>
          <div className="presentation-reference">
            {verse.name} — {translationName}
          </div>
        </div>

        <div className="presentation-nav">
          <button
            className="nav-button"
            disabled={currentIndex <= 0}
            onClick={() => onNavigate(chapter.verses[currentIndex - 1].verse)}
          >
            ◀
          </button>
          <span className="nav-indicator">
            {verse.verse} / {chapter.verses.length}
          </span>
          <button
            className="nav-button"
            disabled={currentIndex >= chapter.verses.length - 1}
            onClick={() => onNavigate(chapter.verses[currentIndex + 1].verse)}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}
