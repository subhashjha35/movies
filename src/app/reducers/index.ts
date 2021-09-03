import { MovieDetails } from './../model/movie';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMovie from './movie.reducer';

export interface AppState {
  movie: fromMovie.MovieState;
}

export const reducers: ActionReducerMap<AppState> = {
  movie: fromMovie.reducer
};

export const movieState = createFeatureSelector<fromMovie.MovieState>('movie');

export const selectedMovieState = createSelector(
  movieState,
  (state: fromMovie.MovieState) => state.selectedMovie
);

export const getSelectedMovie = createSelector(
  selectedMovieState,
  (state: any) => state[Object.keys(state)[0]]
);

export const getMovieSearchResult = createSelector(
  movieState,
  (state: fromMovie.MovieState) => state.moviesSearch.result
)

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
