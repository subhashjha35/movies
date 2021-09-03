import { SearchResult } from './../model/movie-search';
import { MovieDetails } from './../model/movie';
import { createAction, props } from '@ngrx/store';

export const selectMovie = createAction(
  '[Movie] Select Movie',
  props<{ imdbId: string }>()
);

export const selectMovieSuccess = createAction(
  '[Movie] Select Movie Success',
  props<{ movie: MovieDetails }>()
);

export const selectMovieFailure = createAction(
  '[Movie] Select Movie Failure',
  props<{ error: any }>()
);

export const searchMovies = createAction(
  '[Movie] Search Movies',
  props<{ params: string }>()
);

export const searchMoviesSuccess = createAction(
  '[Movie] Search Movies Success',
  props<{ searchResult: SearchResult[] }>()
);

export const searchMoviesFailure = createAction(
  '[Movie] Search Movies Failure',
  props<{ error: any }>()
);
