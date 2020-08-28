import {TestBed} from '@angular/core/testing';

import {Observable} from 'rxjs';

import {provideMockActions} from '@ngrx/effects/testing';

import {NxModule} from '@nrwl/angular';
import {cold, hot} from '@nrwl/angular/testing';

import {MovieListEffects} from './movie-list.effects';
import * as MovieListActions from './movie-list.actions';
import {HttpClientModule} from "@angular/common/http";
import {TmdbResourceService} from "../../services/tmdb.resource.service";
import {mockProvider, SpyObject} from "@ngneat/spectator";
import {MovieListRequestResult} from "../../services/tmdb.resource.models";

describe('MovieListEffects', () => {
  let actions: Observable<any>;
  let effects: MovieListEffects;
  let movieListServiceStub: SpyObject<TmdbResourceService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientModule],
      providers: [
        MovieListEffects,
        provideMockActions(() => actions),
        mockProvider(TmdbResourceService),
      ],
    });

    effects = TestBed.inject(MovieListEffects);
    movieListServiceStub = TestBed.inject(
      TmdbResourceService,
    ) as SpyObject<TmdbResourceService>;
  });

  describe('loadMovieList$', () => {
    it('should work, when the request response is a valid MovieListRequestResult', () => {

      const o = {movieList: [{id: 1, title: 'Movie1'}], totalPages: 3, totalMovies: 24}
      const movieListRequestResult: MovieListRequestResult = {
        results: [{id: 1, title: 'Movie1'}],
        total_pages: 3,
        page: 1,
        total_results: 24
      }

      actions = hot('-a-|', {a: MovieListActions.loadMovieList({page: 8})});

      const response = cold('-a|', {a: movieListRequestResult});
      movieListServiceStub.getMovieList.and.returnValue(response)

      const expected = cold('--a|', {
        a: MovieListActions.loadMovieListSuccess(o),
      });

      expect(effects.loadMovieList$).toBeObservable(expected);
    });

    it('should work, when the request response is an error', () => {
      const error = new Error('Error1');

      actions = hot('-a', {a: MovieListActions.loadMovieList({page: 8})});

      const response = cold('-#|', {}, error);

      movieListServiceStub.getMovieList.and.returnValue(response)

      const expected = cold('--a', {
        a: MovieListActions.loadMovieListFailure({errorMessage: 'Error1'}),
      });
      expect(effects.loadMovieList$).toBeObservable(expected);
    });

  });
});
