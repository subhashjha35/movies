import { SearchResult } from './../model/movie-search';
import { Action, createReducer, on } from '@ngrx/store';
import * as movieAction from '../actions/movie.actions';
import { MovieDetails } from '../model/movie';
export const movieFeatureKey = 'movie';

export interface MovieState {
  moviesSearch: {
    isLoading: boolean;
    isLoaded: boolean;
    result: SearchResult[];
  },
  selectedMovie: {
    [key: string]: MovieDetails
  } | string | null;
}

export const initialState: MovieState = {
  moviesSearch: {
    isLoading: false,
    isLoaded: false,
    result: []
  },
  selectedMovie: null
};

const movieReducer = createReducer(
  initialState,
  on(movieAction.searchMovies, state => {
    return Object.assign({}, state, {
      moviesSearch: { isLoading: true, isLoaded: false }
    });
  }),

  on(movieAction.searchMoviesSuccess, (state, action) => {
    return Object.assign({}, state, {
      moviesSearch: {
        isLoading: false,
        isLoaded: true,
        result: action.searchResult
      }
    });
  }),

  on(movieAction.searchMoviesFailure, state => {
    return Object.assign({}, state, {
      moviesSearch: { isLoading: false, isLoaded: false }
    });
  }),

  on(movieAction.selectMovie, (state, action) => {
    return Object.assign({}, state, { selectedMovie: action.imdbId });
  }),

  on(movieAction.selectMovieSuccess, (state, action) => {
    return Object.assign({}, state, { selectedMovie: { [action.movie.imdbID]: action.movie } });
  })

);

export function reducer(state: MovieState | undefined, action: Action) {
  return movieReducer(state, action);
}
