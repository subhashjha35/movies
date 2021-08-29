import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppState, reducers } from './reducers/index';
import { MovieEffects } from './effects/movie.effects';
import { CommonModule } from '@angular/common';
import { storeLogger } from 'ngrx-store-logger';
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';

export function logger(reducer: ActionReducer<AppState>): any {
  // default, no options
  return environment.production || environment.test
    ? reducer
    : storeLogger()(reducer);
}
export const metaReducers: MetaReducer<AppState>[] = [logger];

@NgModule({
  declarations: [AppComponent, MoviesSearchComponent, MovieDetailComponent],
  imports: [
    // CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionTypeUniqueness: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
