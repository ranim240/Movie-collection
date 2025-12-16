export interface Movie {
  id?: string;           // Id du film
  title: string;
  genre: string;
  year: number;
  rating: number;
  posterUrl?: string;
  description?: string;
  watched?: boolean;
}

export const GENRES: string[] = [
  'Action',
  'Comédie',
  'Drame',
  'Science-Fiction',
  'Horreur',
  'Romance'
];
