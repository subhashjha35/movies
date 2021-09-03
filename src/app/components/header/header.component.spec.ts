import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { byRole, byTestId, byText, createComponentFactory, Spectator, SpectatorElement } from '@ngneat/spectator';

import { HeaderComponent } from './header.component';



describe('HeaderComponent', () => {

  let component: HeaderComponent;
  let spectator: Spectator<HeaderComponent>;

  const createComponent = createComponentFactory({
    component: HeaderComponent,
    detectChanges: false,
    imports: [RouterTestingModule],
    providers: [ ]
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
