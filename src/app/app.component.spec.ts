import { provideMockStore } from '@ngrx/store/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const initialState = {};
  let component: AppComponent;
  let spectator: Spectator<AppComponent>;

  const createComponent = createComponentFactory({
    component: AppComponent,
    detectChanges: false,
    imports: [ ],
    providers: [provideMockStore({ initialState })]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  afterEach(() => {
    spectator.fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
