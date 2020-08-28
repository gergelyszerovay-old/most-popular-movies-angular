import {TestBed} from '@angular/core/testing';

import {TmdbResourceService} from './tmdb.resource.service';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
// tslint:disable-next-line:nx-enforce-module-boundaries
import {environment} from "@env/environment";
import {MovieGenresRequestResult, MovieListRequestResult} from "./tmdb.resource.models";

describe('MovieListService', () => {
  let service: TmdbResourceService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TmdbResourceService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('TmdbResourceService.getMovieList returns valid data', () => {
    const page = 3;
    const movieListRequestResult: MovieListRequestResult = {
      results: [{id: 1, title: 'Movie1'}],
      total_pages: 3,
      page: 1,
      total_results: 24
    }

    service.getMovieList(page).subscribe(data =>
      expect(data).toEqual(movieListRequestResult)
    );

    const req = httpTestingController.expectOne(`${environment.tmdbBaseUrlApi}discover/movie?page=${page}&api_key=${environment.tmdbApiKey}&language=en-US&sort_by=popularity.desc`);
    expect(req.request.method).toEqual('GET');
    req.flush(movieListRequestResult);

    httpTestingController.verify();
  });

  it('TmdbResourceService.getMovieList returns HTTP error', () => {
    const page = 3;
    const errorMessage = '404 Error';

    service.getMovieList(page).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(`${environment.tmdbBaseUrlApi}discover/movie?page=${page}&api_key=${environment.tmdbApiKey}&language=en-US&sort_by=popularity.desc`);
    expect(req.request.method).toEqual('GET');
    req.flush(errorMessage, {status: 404, statusText: 'Not Found'});

    httpTestingController.verify();
  });

  it('TmdbResourceService.getMovieGenres returns valid data', () => {
    const genresRequestResult: MovieGenresRequestResult = {genres: [{id: 1, name: 'Genre1'}, {id: 2, name: 'Genre2'}]}

    service.getMovieGenres().subscribe(data =>
      expect(data).toEqual(genresRequestResult)
    );

    const req = httpTestingController.expectOne(`${environment.tmdbBaseUrlApi}genre/movie/list?api_key=${environment.tmdbApiKey}&language=en-US`);
    expect(req.request.method).toEqual('GET');
    req.flush(genresRequestResult);

    httpTestingController.verify();
  });

  it('TmdbResourceService.getMovieGenres returns HTTP error', () => {
    const errorMessage = '404 Error';

    service.getMovieGenres().subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(errorMessage);
      }
    );

    const req = httpTestingController.expectOne(`${environment.tmdbBaseUrlApi}genre/movie/list?api_key=${environment.tmdbApiKey}&language=en-US`);
    expect(req.request.method).toEqual('GET');
    req.flush(errorMessage, {status: 404, statusText: 'Not Found'});

    httpTestingController.verify();
  });
});
