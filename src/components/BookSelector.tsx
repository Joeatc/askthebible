import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { fetchBooks } from '../api';

interface Props {
  abbreviation: string;
  selectedNr: number | null;
  onSelect: (book: Book) => void;
}

export default function BookSelector({ abbreviation, selectedNr, onSelect }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!abbreviation) return;
    setLoading(true);
    fetchBooks(abbreviation)
      .then(data => setBooks(data))
      .catch(err => console.error('Failed to fetch books:', err))
      .finally(() => setLoading(false));
  }, [abbreviation]);

  if (loading) return <p className="loading-text">Loading books...</p>;
  if (books.length === 0) return null;

  const ot = books.filter(b => b.nr <= 39);
  const nt = books.filter(b => b.nr >= 40);

  return (
    <div className="selector-section">
      <label className="selector-label">Book</label>

      <h3 className="testament-heading">Old Testament</h3>
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

      <h3 className="testament-heading">New Testament</h3>
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
