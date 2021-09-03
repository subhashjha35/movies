import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp
} from '@ngneat/spectator';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovieService', () => {
  let spectator: SpectatorHttp<MovieService>;
  let service: MovieService;

  const createHttp = createHttpFactory<MovieService>({
    service: MovieService,
    imports: [HttpClientTestingModule]
  });

  beforeEach(() => {
    spectator = createHttp();

    service = spectator.service;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchMovies', () => {
    it('should call the right endpoint for movies search', () => {
      service.searchMovies('Marvel').subscribe();

      const req = spectator.expectOne(
        'https://www.omdbapi.com/?apikey=f79aeba3&s=Marvel',
        HttpMethod.GET
      );
    });
  });

  describe('selectMovie', () => {
    it('should call the right endpoint for movies search', () => {
      service.selectMovie('i1').subscribe();

      const req = spectator.expectOne(
        'https://www.omdbapi.com/?apikey=f79aeba3&i=i1',
        HttpMethod.GET
      );
    });
  });
});
