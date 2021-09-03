import {
  searchMovies,
  searchMoviesSuccess,
  searchMoviesFailure,
  selectMovie,
  selectMovieSuccess,
  selectMovieFailure
} from './../actions/movie.actions';
import { Action, Store, StoreModule } from '@ngrx/store';
import { MovieService } from './../services/movie.service';
import { Spectator, SpyObject, mockProvider } from '@ngneat/spectator';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles';

import { MovieEffects } from './movie.effects';
import { EffectsModule } from '@ngrx/effects';

describe('AppEffects', () => {
  let movieServiceSpy: SpyObject<MovieService>;
  let effect: MovieEffects;
  let store: Store<any>;
  let actions$ = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([MovieEffects])],
      providers: [
        mockProvider(MovieService),
        provideMockActions(() => actions$)
      ]
    });

    movieServiceSpy = TestBed.inject(MovieService) as SpyObject<MovieService>;

    effect = TestBed.inject(MovieEffects);
    store = TestBed.inject(Store);
  });

  describe('searchMovies$', () => {
    it(
      'should return the list of movies',
      marbles(async m => {
        actions$ = m.cold('a', {
          a: searchMovies({ params: 'Marvel' })
        });

        movieServiceSpy.searchMovies.and.returnValue(
          m.cold('a', {
            a:
              {
                Search: [
                  { Title: 't1', Poster: 'p1', Year: '', Type: '', Imdb: '' }
                ]
              }
          })
        );
        const expected = m.cold('(a)', {
          a: searchMoviesSuccess({
            searchResult: [
              { Title: 't1', Poster: 'p1', Year: '', Type: '', Imdb: '' }
            ] as any
          })
        });

        await m.expect(effect.searchMovies$).toBeObservable(expected);

        expect(movieServiceSpy.searchMovies).toHaveBeenCalledWith('Marvel');
      })
    );

    it(
      'should return the error message',
      marbles(async m => {
        actions$ = m.cold('a', {
          a: searchMovies({ params: 'Marvel' })
        });

        movieServiceSpy.searchMovies.and.returnValue(
          m.cold('#', { a: new Error('error') })
        );
        const expected = m.cold('(a)', {
          a: searchMoviesFailure({ error: 'error' })
        });

        await m.expect(effect.searchMovies$).toBeObservable(expected);

        expect(movieServiceSpy.searchMovies).toHaveBeenCalledWith('Marvel');
      })
    );
  });

  describe('selectMovie$', () => {
    it(
      'should select the movie',
      marbles(async m => {
        actions$ = m.cold('a', {
          a: selectMovie({ imdbId: 'id1' })
        });

        movieServiceSpy.selectMovie.and.returnValue(
          m.cold('a', {
            a: { Title: 't1', Poster: 'p1', Year: '', Type: '' }
          })
        );
        const expected = m.cold('(a)', {
          a: selectMovieSuccess({ movie: { Title: 't1', Poster: 'p1', Year: '', Type: '' } as any })
        });

        await m.expect(effect.selectMovie$).toBeObservable(expected);

        expect(movieServiceSpy.selectMovie).toHaveBeenCalledWith('id1');
      })
    );

    it(
      'should return the error',
      marbles(async m => {
        actions$ = m.cold('a', {
          a: selectMovie({ imdbId: 'id1' })
        });

        movieServiceSpy.selectMovie.and.returnValue(
          m.cold('#', { a: new Error('error') })
        );
        const expected = m.cold('(a)', {
          a: selectMovieFailure({ error: 'error' })
        });

        await m.expect(effect.selectMovie$).toBeObservable(expected);

        expect(movieServiceSpy.selectMovie).toHaveBeenCalledWith('id1');
      })
    );
  });
});
