import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil, switchMap, of } from 'rxjs';
import { GENRES } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
  
})
export class MovieFormComponent implements OnInit, OnDestroy {
  movieForm!: FormGroup;
  genres = GENRES;
  isEditMode = false;
  movieId: string | null = null;
  posterPreview = 'https://via.placeholder.com/200x300?text=No+Poster';
  
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.movieId = params['id'];
          return this.movieService.getMovie(params['id']);
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe(movie => {
      if (movie) {
        this.movieForm.patchValue({
          title: movie.title,
          genre: movie.genre,
          year: movie.year,
          rating: movie.rating,
          posterUrl: movie.posterUrl,
          description: movie.description
        });
        this.updatePosterPreview(movie.posterUrl ?? '');
      }
    });

    this.movieForm.get('posterUrl')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(url => this.updatePosterPreview(url));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    const currentYear = new Date().getFullYear();
    
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      year: [currentYear, [Validators.required, Validators.min(1888), Validators.max(currentYear + 5)]],
      rating: [7.0, [Validators.required, Validators.min(0), Validators.max(10)]],
      posterUrl: [''],
      description: ['']
    });
  }

  private updatePosterPreview(url: string): void {
    if (url && url.trim()) {
      this.posterPreview = url;
    } else {
      this.posterPreview = 'https://via.placeholder.com/200x300?text=No+Poster';
    }
  }

  onPreviewError(event: Event): void {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/200x300?text=Invalid+URL';
  }

  goBack(): void {
    if (this.isEditMode && this.movieId) {
      this.router.navigate(['/movies', this.movieId]);
    } else {
      this.router.navigate(['/movies']);
    }
  }

  onSubmit(): void {
    if (this.movieForm.invalid) return;

    const formValue = this.movieForm.value;
    
    if (this.isEditMode && this.movieId) {
      this.movieService.updateMovie(this.movieId, formValue);
      this.router.navigate(['/movies', this.movieId]);
    } else {
      this.movieService.addMovie(formValue);
      this.router.navigate(['/movies']);
    }
  }
}
