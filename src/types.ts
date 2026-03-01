export interface Translation {
  translation: string;
  abbreviation: string;
  lang: string;
  language: string;
  direction: string;
  encoding: string;
}

export interface Book {
  nr: number;
  name: string;
  url: string;
}

export interface Verse {
  chapter: number;
  verse: number;
  name: string;
  text: string;
}

export interface Chapter {
  chapter: number;
  name: string;
  verses: Verse[];
}

export interface BookData {
  translation: string;
  abbreviation: string;
  lang: string;
  language: string;
  direction: string;
  encoding: string;
  nr: number;
  name: string;
  chapters: Chapter[];
}
