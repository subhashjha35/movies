import { getSelectedMovie } from './../../reducers/index';
import { MovieDetails } from './../../model/movie';
import { Observable } from 'rxjs';
import { searchMovies, selectMovie } from './../../actions/movie.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie$: Observable<MovieDetails> = this.store.select(getSelectedMovie);
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      console.error(param);
      this.store.dispatch(selectMovie({ imdbId: param.imdbId }));
    });
  }
}
