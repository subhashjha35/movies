import { SearchResult } from './../model/movie-search';
import { MovieDetails } from './../model/movie';
import { createAction, props } from '@ngrx/store';

export const selectMovie = createAction(
  '[Movie] Select Movie',
  props<{ movie: MovieDetails }>()
);

export const searchMovies = createAction('[Movie] Search Movies');

export const searchMoviesSuccess = createAction(
  '[Movie] Search Movies Success',
  props<{ searchResult: SearchResult[] }>()
);

export const searchMoviesFailure = createAction(
  '[Movie] Search Movies Failure',
  props<{ error: any }>()
);
