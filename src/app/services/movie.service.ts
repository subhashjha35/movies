import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovies(): Observable<{}> {
    return this.http.get('');
  }

  getMovie(): Observable<{}> {
    return this.http.get('');
  }

}

