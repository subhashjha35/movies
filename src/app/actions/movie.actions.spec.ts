import * as fromMovie from './movie.actions';

describe('searchMovies', () => {
  it('should return an action', () => {
    expect(fromMovie.searchMovies().type).toBe('[Movie] Load Movies');
  });
});
