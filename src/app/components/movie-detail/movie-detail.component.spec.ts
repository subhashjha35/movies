import { marbles } from 'rxjs-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

describe('MovieDetailComponent', () => {
  const initialState = {
    movie: {
      selectedMovie: {
        i1: {
          Title: 'Marvel',
          Year: '1999'
        }
      }
    }
  };

  let router: Router;

  let component: MovieDetailComponent;
  let spectator: Spectator<MovieDetailComponent>;

  const createComponent = createComponentFactory({
    component: MovieDetailComponent,
    detectChanges: false,
    imports: [RouterTestingModule, StoreModule],
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    router = spectator.inject(Router);
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    spectator.fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should have correct movie$ value',
    marbles(m => {
      let expectedData$: any = m.cold('a', {
        a: {
          Title: 'Marvel',
          Year: '1999'
        }
      });
      m.expect(component.movie$).toBeObservable(expectedData$);
    })
  );
});
