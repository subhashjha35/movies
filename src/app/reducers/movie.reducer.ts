import { selectMovie } from './../actions/movie.actions';
import { SearchResult } from './../model/movie-search';
import { Action, createReducer, on } from '@ngrx/store';
import * as movieAction from '../actions/movie.actions';
export const movieFeatureKey = 'movie';

export interface MovieState {
  moviesSearch: {
    isLoading: boolean;
    isLoaded: boolean;
    result: SearchResult[];
  },
  selectedMovie: string | null;
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
        list: action.searchResult
      }
    });
  }),

  on(movieAction.searchMoviesFailure, state => {
    return Object.assign({}, state, {
      moviesSearch: { isLoading: false, isLoaded: false }
    });
  }),

  on(movieAction.selectMovie, (state, action) => {
    return Object.assign({}, state, { selectedMovie: action.movie });
  })
);

export function reducer(state: MovieState | undefined, action: Action) {
  return movieReducer(state, action);
}
