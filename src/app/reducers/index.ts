import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMovie from './movie.reducer';

export interface AppState {
  movie: fromMovie.MovieState
}

export const reducers: ActionReducerMap<AppState> = {
  movie: fromMovie.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
