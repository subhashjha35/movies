import { SearchResult } from './../model/movie-search';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDetails } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  searchMovies(): Observable<SearchResult[]> {
    return of([]);
    // return this.http.get('');
  }

}

