import { searchMovies, searchMoviesSuccess, searchMoviesFailure, selectMovie, selectMovieSuccess } from './../actions/movie.actions';
import { reducer, initialState } from './movie.reducer';

describe('Movie Reducer', () => {
  describe('searchMovies', () => {
    it('should change the isLoading and isLoaded Status', () => {
      expect(
        reducer({ ...initialState }, searchMovies({ params: 'Marvel' }))
      ).toEqual({
        ...initialState,
        moviesSearch: {
          isLoading: true,
          isLoaded: false
        } as any
      });
    });
  });

  describe('searchMoviesSuccess', () => {
    it('should return the result', () => {
      expect(
        reducer(
          { ...initialState },
          searchMoviesSuccess({
            searchResult: [{ Title: 't1', Year: 'y1' } as any]
          })
        )
      ).toEqual({
        ...initialState,
        moviesSearch: {
          isLoading: false,
          isLoaded: true,
          result: [{ Title: 't1', Year: 'y1' }]
        } as any
      });
    });
  });

  describe('searchMoviesFailure', () => {
    it('should return the isLoading and isLoaded false', () => {
      expect(
        reducer(
          { ...initialState },
          searchMoviesFailure({
            error: 'error'
          })
        )
      ).toEqual({
        ...initialState,
        moviesSearch: {
          isLoading: false,
          isLoaded: false,
        } as any
      });
    });
  });

  describe('selectMovie', () => {
    it('should assign to the selectedMovie the imdbId', () => {
      expect(
        reducer(
          { ...initialState },
          selectMovie({
            imdbId: 'i1'
          })
        )
      ).toEqual({
        ...initialState,
        selectedMovie: 'i1'
      });
    });
  });

  describe('selectMovieSuccess', () => {
    it('should assign to the selectedMovie the imdbId', () => {
      expect(
        reducer(
          { ...initialState },
          selectMovieSuccess({
            movie: { Title: 't1', imdbID: 'i1', Year: 'y1' } as any
          })
        )
      ).toEqual({
        ...initialState,
        selectedMovie:  { i1: { Title: 't1', imdbID: 'i1', Year: 'y1' } } as any
      });
    });
  });
});
