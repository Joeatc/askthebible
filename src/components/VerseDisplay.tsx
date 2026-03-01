import React from 'react';
import { Verse } from '../types';

interface Props {
  verse: Verse | null;
  translationName: string;
  onPresent: () => void;
}

function cleanText(text: string): string {
  return text.replace(/<FR>|<Fr>/g, '');
}

export default function VerseDisplay({ verse, translationName, onPresent }: Props) {
  if (!verse) return null;

  return (
    <div className="verse-display-panel">
      <div className="verse-reference">{verse.name} — {translationName}</div>
      <div className="verse-text">{cleanText(verse.text)}</div>
      <button className="present-button" onClick={onPresent}>
        Present
      </button>
    </div>
  );
}
