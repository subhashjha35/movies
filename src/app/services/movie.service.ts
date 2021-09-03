import { SearchResult } from './../model/movie-search';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDetails } from '../model/movie';

export enum MovieTitleType {
  'movie',
  'series',
  'episode'
}
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) {}

  searchMovies(search_str: string): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(
      `https://www.omdbapi.com/?apikey=f79aeba3&s=${search_str}`
    );
  }

  selectMovie(imdbId: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(
      `https://www.omdbapi.com/?apikey=f79aeba3&i=${imdbId}`
    );
  }
}

