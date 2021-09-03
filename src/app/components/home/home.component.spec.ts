import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { marbles } from 'rxjs-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  const initialState = { };

  let router: Router;

  let component: HomeComponent;
  let spectator: Spectator<HomeComponent>;

  const createComponent = createComponentFactory({
    component: HomeComponent,
    detectChanges: false,
    imports: [
      RouterTestingModule,
      StoreModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [ provideMockStore({ initialState }) ]
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

  describe('searchMovies', () => {
    it('should navigate to the search result', () => {
      component.form.get('movieName')?.setValue('testMovie');
      component.searchMovie();
      expect(router.navigate).toHaveBeenCalledWith(['/search/testMovie']);
    });
  })
});
