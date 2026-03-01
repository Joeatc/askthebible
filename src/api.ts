import axios from 'axios';
import { Translation, Book, BookData } from './types';

const BASE_URL = 'https://api.getbible.net/v2';

export async function fetchTranslations(): Promise<Record<string, Translation>> {
  const response = await axios.get(`${BASE_URL}/translations.json`);
  return response.data;
}

export async function fetchBooks(abbreviation: string): Promise<Book[]> {
  const response = await axios.get(`${BASE_URL}/${abbreviation}/books.json`);
  // Response is an object keyed by book number strings
  const booksObj: Record<string, Book> = response.data;
  return Object.values(booksObj).sort((a, b) => a.nr - b.nr);
}

export async function fetchBook(abbreviation: string, bookNr: number): Promise<BookData> {
  const response = await axios.get(`${BASE_URL}/${abbreviation}/${bookNr}.json`);
  return response.data;
}
