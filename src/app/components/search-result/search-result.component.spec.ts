import { marbles } from 'rxjs-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { SearchResultComponent } from './search-result.component';
import { Router } from '@angular/router';

describe('SearchResultComponent', () => {
  const initialState = {
    movie: {
      moviesSearch: {
        isLoading: false,
        isLoaded: false,
        result: [
          {
            Title: 't1',
            Year: '2004',
            Poster: 'p1'
          },
          {
            Title: 't2',
            Year: '2008',
            Poster: 'p2'
          }
        ]
      }
    }
  };

  let router: Router;

  let component: SearchResultComponent;
  let spectator: Spectator<SearchResultComponent>;

  const createComponent = createComponentFactory({
    component: SearchResultComponent,
    detectChanges: false,
    imports: [RouterTestingModule, StoreModule],
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    router = spectator.inject(Router);
  });

  afterEach(() => {
    spectator.fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should have correct values in searchResult$',
    marbles(m => {
      let expectedData$: any = m.cold('a', {
        a: [
          {
            Title: 't1',
            Year: '2004',
            Poster: 'p1'
          },
          {
            Title: 't2',
            Year: '2008',
            Poster: 'p2'
          }
        ]
      });
      m.expect(component.searchResult$).toBeObservable(expectedData$);
    })
  );
});
