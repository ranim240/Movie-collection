import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MovieService } from '../../services/movie.service';
import { GENRES, Movie } from '../../models/movie.model';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  featuredMovie?: Movie;

  searchTerm: string = '';
  selectedGenre: string = '';
  sortBy: string = 'date';

  genres = GENRES;
  placeholder = 'https://via.placeholder.com/200x300?text=No+Poster';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;

      // 🎬 HERO MOVIE = best rated
      this.featuredMovie = [...movies].sort(
        (a, b) => b.rating - a.rating
      )[0];

      this.applyFilters();
    });
  }

  /* ================= SEARCH ================= */
  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  /* ================= GENRE FILTER ================= */
  filterByGenre(genre: string): void {
    this.selectedGenre = genre;
    this.applyFilters();
  }

  /* ================= SORT ================= */
  onSort(event: Event): void {
    this.sortBy = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  /* ================= FILTER CORE ================= */
  applyFilters(): void {
    let result = [...this.movies];

    // Search
    if (this.searchTerm) {
      result = result.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Genre
    if (this.selectedGenre) {
      result = result.filter(movie =>
        movie.genre === this.selectedGenre
      );
    }

    // Sort
    switch (this.sortBy) {
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;

      default:
        // date added (fallback using id)
        result.sort((a, b) => +(b.id || 0) - +(a.id || 0));
    }

    this.filteredMovies = result;
  }
}
