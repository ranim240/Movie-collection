import { Routes } from '@angular/router';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component:MovieListComponent
  },
  {
    path: 'movies/new',
    component: MovieFormComponent
  },
  {
    path: 'movies/:id/edit',
    component: MovieFormComponent
  },
  {
    path: 'movies/:id',
    component:MovieDetailComponent
  }
];
