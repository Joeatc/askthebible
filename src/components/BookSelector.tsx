import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { fetchBooks } from '../api';
import { getI18n } from '../i18n';

interface Props {
  abbreviation: string;
  selectedNr: number | null;
  onSelect: (book: Book) => void;
  lang: string;
}

export default function BookSelector({ abbreviation, selectedNr, onSelect, lang }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const t = getI18n(lang);

  useEffect(() => {
    if (!abbreviation) return;
    setLoading(true);
    fetchBooks(abbreviation)
      .then(data => setBooks(data))
      .catch(err => console.error('Failed to fetch books:', err))
      .finally(() => setLoading(false));
  }, [abbreviation]);

  if (loading) return <p className="loading-text">{t.loadingBooks}</p>;
  if (books.length === 0) return null;

  const ot = books.filter(b => b.nr <= 39);
  const nt = books.filter(b => b.nr >= 40);

  return (
    <div className="selector-section">
      <label className="selector-label">{t.book}</label>

      <h3 className="testament-heading">{t.oldTestament}</h3>
      <div className="book-grid">
        {ot.map(book => (
          <button
            key={book.nr}
            className={`book-button ${selectedNr === book.nr ? 'selected' : ''}`}
            onClick={() => onSelect(book)}
          >
            {book.name}
          </button>
        ))}
      </div>

      <h3 className="testament-heading">{t.newTestament}</h3>
      <div className="book-grid">
        {nt.map(book => (
          <button
            key={book.nr}
            className={`book-button ${selectedNr === book.nr ? 'selected' : ''}`}
            onClick={() => onSelect(book)}
          >
            {book.name}
          </button>
        ))}
      </div>
    </div>
  );
}
