import { getMovieSearchResult } from './../../reducers/index';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { searchMovies } from './../../actions/movie.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SearchResult } from 'src/app/model/movie-search';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchResult$: Observable<SearchResult[]> = this.store.select(getMovieSearchResult);
  constructor(private store: Store, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.store.dispatch(searchMovies({ params: data.search_str }));
    })
  }
}
