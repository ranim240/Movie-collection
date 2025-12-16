import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie.model';

@Pipe({
  name: 'filterMovies',
  standalone: true
})
export class FilterMoviesPipe implements PipeTransform {

  transform(movies: Movie[], searchTerm: string, selectedGenre: string): Movie[] {
    if (!movies) return [];
    
    let filtered = movies;

    // Filtrer par titre
    if (searchTerm?.trim()) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(movie => movie.title.toLowerCase().includes(lowerTerm));
    }

    // Filtrer par genre
    if (selectedGenre) {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    return filtered;
  }
}
