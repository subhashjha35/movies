import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { AppComponent } from './app.component';
import { MoviesSearchComponent } from './components/movies-search/movies-search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'movie/:id', component: MovieDetailComponent },
      { path: 'search/:string', component: MoviesSearchComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
