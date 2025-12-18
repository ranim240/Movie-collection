import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie?: Movie;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.movieService.getMovie(id).subscribe(movie => {
      this.movie = movie ?? undefined;
    });
  }

  deleteMovie(): void {
    if (!this.movie) {
      return;
    }

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { movieTitle: this.movie.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.movie && this.movie.id) {
        this.movieService.deleteMovie(this.movie.id).subscribe(() => {
          this.router.navigate(['/movies']);
        });
      }
    });
  }
}
