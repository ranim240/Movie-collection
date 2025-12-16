import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie.service.js';
import { RouterModule } from '@angular/router';
import { GENRES, Movie } from '../../models/movie.model.js';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, AfterViewInit {
  movies: Movie[] = [];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource();
  searchTerm: string = '';
  selectedGenre: string = '';
  genres = GENRES;
  placeholder = 'https://via.placeholder.com/200x300?text=No+Poster';
  sortBy: string = 'date';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(movies => {
      this.movies = movies;
      this.dataSource.data = this.movies;
      this.applyFilters();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilters(): void {
    let filtered = this.movies;

    if (this.searchTerm) {
      filtered = filtered.filter(m =>
        m.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedGenre) {
      filtered = filtered.filter(m => m.genre === this.selectedGenre);
    }

    if (this.sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => +(b.id || 0) - +(a.id || 0));
    }

    this.dataSource.data = filtered;
  }
}
