import { Observable, of } from "rxjs";
import { Movie } from "../models/movie.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MovieService {
 private movies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    rating: 8.8,
    watched: true,
    posterUrl: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
    description: 'A mind-bending thriller'
  },
  {
    id: '2',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    year: 2014,
    rating: 8.6,
    watched: false,
    posterUrl: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg',
    description: 'Journey beyond the stars'
  },
  {
    id: '3',
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    watched: true,
    posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    description: 'Batman faces the Joker'
  },
  {
    id: '4',
    title: 'Forrest Gump',
    genre: 'Drama',
    year: 1994,
    rating: 8.8,
    watched: true,
    posterUrl: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
    description: 'Life is like a box of chocolates'
  },
  {
    id: '5',
    title: 'The Matrix',
    genre: 'Sci-Fi',
    year: 1999,
    rating: 8.7,
    watched: false,
    posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    description: 'Reality is an illusion'
  },
  {
    id: '6',
    title: 'Gladiator',
    genre: 'Action',
    year: 2000,
    rating: 8.5,
    watched: false,
    posterUrl: 'https://image.tmdb.org/t/p/w500/ehGpN04mLJIrSnxcZBMvHeG0eDc.jpg',
    description: 'A fallen general seeks revenge'
  }
];


  getMovies(): Observable<Movie[]> {
    return of(this.movies);
  }

  getMovie(id: string): Observable<Movie | null> {
    return of(this.movies.find(m => m.id === id) ?? null);
  }

  addMovie(movie: Movie) {
    if (!movie.id) {
      movie.id = Date.now().toString();
    }
    this.movies.push(movie);
  }

  updateMovie(id: string, movieData: Partial<Movie>) {
    const index = this.movies.findIndex(m => m.id === id);
    if (index > -1) {
      this.movies[index] = { ...this.movies[index], ...movieData };
    }
  }

  deleteMovie(id: string): Observable<{}> {
    this.movies = this.movies.filter(m => m.id !== id);
    return of({});
  }
}
