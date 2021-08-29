import { Action } from '@ngrx/store';
import { MovieService } from './../services/movie.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movieActions from '../actions/movie.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchResult } from '../model/movie-search';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()
export class MovieEffects {
  constructor(private actions$: Actions, private movieService: MovieService) {}

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(movieActions.searchMovies),
      switchMap(() =>
        this.movieService.searchMovies().pipe(
          map((movies: SearchResult[]) => movieActions.searchMoviesSuccess({ searchResult: movies })),
          catchError((error: HttpErrorResponse) =>
            of<Action>(movieActions.searchMoviesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
