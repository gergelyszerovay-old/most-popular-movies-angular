import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";

import dataPage1 from '../../../../../apps/app-e2e/src/fixtures/page1.json';
import dataPage2 from '../../../../../apps/app-e2e/src/fixtures/page2.json';
import dataGenres from '../../../../../apps/app-e2e/src/fixtures/genres.json';
import {delay} from "rxjs/operators";
import {MovieGenresRequestResult, MovieListRequestResult} from "./tmdb.resource.models";

@Injectable({
  providedIn: 'root'
})
export class TmdbResourceServiceMock {

  constructor() {
  }

  getMovieList(page: number): Observable<any> {
    const results: MovieListRequestResult = {
      page,
      total_results: 40,
      total_pages: 2,
      results: (page === 1) ? dataPage1.results : dataPage2.results
    };

    return of(results).pipe(delay(2000));
  }

  getMovieGenres(): Observable<any> {
    const results: MovieGenresRequestResult = dataGenres;

    return of(results).pipe(delay(2000))
  }
}
