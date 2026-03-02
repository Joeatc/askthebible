import React from 'react';
import { Verse } from '../types';
import { getI18n } from '../i18n';

interface Props {
  verse: Verse | null;
  translationName: string;
  onPresent: () => void;
  lang: string;
}

function cleanText(text: string): string {
  return text.replace(/<FR>|<Fr>/g, '');
}

export default function VerseDisplay({ verse, translationName, onPresent, lang }: Props) {
  if (!verse) return null;
  const t = getI18n(lang);

  return (
    <div className="verse-display-panel">
      <div className="verse-reference">{verse.name} — {translationName}</div>
      <div className="verse-text">{cleanText(verse.text)}</div>
      <button className="present-button" onClick={onPresent}>
        {t.present}
      </button>
    </div>
  );
}
