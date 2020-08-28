import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {readFirst} from '@nrwl/angular/testing';

import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';

import {NxModule} from '@nrwl/angular';

import {MovieGenresFacade} from './movie-genres.facade';

import * as MovieGenresActions from './movie-genres.actions';
import {loadMovieGenres} from './movie-genres.actions';
import {HttpClientModule} from "@angular/common/http";
import {AppLibModule} from "@most-popular-movies-angular/app-lib";
import {MovieGenresEntity} from "../../services/tmdb.resource.models";

describe('MovieGenresFacade', () => {
  let facade: MovieGenresFacade;
  let store: Store;

  const movieGenreList1: MovieGenresEntity[] = [
    {id: 1, name: 'Genre1'},
    {id: 2, name: 'Genre2'}
  ]
  const movieGenreListEntities1 = movieGenreList1.reduce((ret, item) => {
    ret[item.id] = item;
    return ret;
  }, {})
  const movieGenreListIds1 = movieGenreList1.map((item) => item.id);

  beforeEach(() => {
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          AppLibModule,
          HttpClientModule
        ],
      })
      class RootModule {
      }

      TestBed.configureTestingModule({imports: [RootModule]});

      store = TestBed.inject(Store);
      facade = TestBed.inject(MovieGenresFacade);
    });

    it('getMovieGenres() should dispatch an loadMovieGenres action', () => {
      spyOn(store, 'dispatch')

      facade.loadMovieGenres()

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(loadMovieGenres());
    });

    it('movieGenresList$ should return an empty object, when the genre list is not loaded', async (done) => {
      try {
        const list = await readFirst(facade.movieGenresEntities$);

        expect(Object.keys(list).length).toBe(0);
        done();
      } catch (err) {
        done.fail(err);
      }

    });

    it('after loadMovieGenresSuccess, movieGenresList$ should return the loaded list; loading$ == false, errorMessage$ == null', async (done) => {
      try {

        store.dispatch(
          MovieGenresActions.loadMovieGenresSuccess({movieGenres: movieGenreList1})
        );

        const entities = await readFirst(facade.movieGenresEntities$);
        expect(Object.keys(entities).length).toBe(2);
        expect(entities).toStrictEqual(movieGenreListEntities1);

        const errorMessage = await readFirst(facade.errorMessage$);
        expect(errorMessage).toBe(null);

        const loading = await readFirst(facade.loading$);
        expect(loading).toBe(false);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
    // it('after loadMovieGenresSuccess, getGenresByIds$ should return the selected genres', async (done) => {
    //   try {
    //
    //     store.dispatch(
    //       MovieGenresActions.loadMovieGenresSuccess({ movieGenres: movieGenreList1 })
    //     );
    //
    //     const entities = await readFirst(facade.getGenresByIds$([2]));
    //     expect(Object.keys(entities).length).toBe(1);
    //     expect(entities).toStrictEqual([{"id": 2, "name": "Genre2"}]);
    //
    //     done();
    //   } catch (err) {
    //     done.fail(err);
    //   }
    // });

  });
});
