import {TestBed} from '@angular/core/testing';

import {Observable} from 'rxjs';

import {provideMockActions} from '@ngrx/effects/testing';

import {NxModule} from '@nrwl/angular';
import {cold, hot} from '@nrwl/angular/testing';

import {MovieGenresEffects} from './movie-genres.effects';
import * as MovieGenresActions from './movie-genres.actions';
import {HttpClientModule} from "@angular/common/http";
import {TmdbResourceService} from "../../services/tmdb.resource.service";
import {mockProvider, SpyObject} from "@ngneat/spectator";
import {MovieGenresRequestResult} from "../../services/tmdb.resource.models";

describe('MovieGenresEffects', () => {
  let actions: Observable<any>;
  let effects: MovieGenresEffects;
  let movieGenresServiceStub: SpyObject<TmdbResourceService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot(), HttpClientModule],
      providers: [
        MovieGenresEffects,
        provideMockActions(() => actions),
        mockProvider(TmdbResourceService),
      ],
    });

    effects = TestBed.inject(MovieGenresEffects);
    movieGenresServiceStub = TestBed.inject(
      TmdbResourceService,
    ) as SpyObject<TmdbResourceService>;
  });

  describe('loadMovieGenres$', () => {
    it('should work, when the request response is a valid MovieGenresRequestResult', () => {

      const o = {movieGenres: [{id: 1, name: 'Genre1'}, {id: 2, name: 'Genre2'}]}
      const movieGenresRequestResult: MovieGenresRequestResult = {
        genres: [{id: 1, name: 'Genre1'}, {
          id: 2,
          name: 'Genre2'
        }]
      }

      actions = hot('-a-|', {a: MovieGenresActions.loadMovieGenres()});

      const response = cold('-a|', {a: movieGenresRequestResult});
      movieGenresServiceStub.getMovieGenres.and.returnValue(response)

      const expected = cold('--a|', {
        a: MovieGenresActions.loadMovieGenresSuccess(o),
      });

      expect(effects.loadMovieGenres$).toBeObservable(expected);
    });

    it('should work, when the request response is an error', () => {
      const error = new Error('Error1');

      actions = hot('-a', {a: MovieGenresActions.loadMovieGenres()});

      const response = cold('-#|', {}, error);

      movieGenresServiceStub.getMovieGenres.and.returnValue(response)

      const expected = cold('--a', {
        a: MovieGenresActions.loadMovieGenresFailure({errorMessage: 'Error1'}),
      });
      expect(effects.loadMovieGenres$).toBeObservable(expected);
    });

  });
});
