import React, { useEffect, useState } from 'react';
import { Translation } from '../types';
import { fetchTranslations } from '../api';

const CURATED_TRANSLATIONS = [
  'schlachter',
  'luther1912',
  'elberfelder',
  'kjv',
  'web',
  'ls1910',
  'zhuromsky',
];

interface Props {
  selected: string;
  onSelect: (abbreviation: string, lang: string) => void;
}

export default function TranslationSelector({ selected, onSelect }: Props) {
  const [translations, setTranslations] = useState<Record<string, Translation>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTranslations()
      .then(data => setTranslations(data))
      .catch(err => console.error('Failed to fetch translations:', err))
      .finally(() => setLoading(false));
  }, []);

  const available = CURATED_TRANSLATIONS.filter(abbr => translations[abbr]);

  return (
    <div className="selector-section">
      <label className="selector-label">Translation</label>
      {loading ? (
        <p className="loading-text">Loading translations...</p>
      ) : (
        <select
          className="form-control"
          value={selected}
          onChange={e => {
            const abbr = e.target.value;
            const lang = translations[abbr]?.lang ?? 'de';
            onSelect(abbr, lang);
          }}
        >
          <option value="">— Select a translation —</option>
          {available.map(abbr => (
            <option key={abbr} value={abbr}>
              {translations[abbr].translation} ({translations[abbr].language})
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
