import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {readFirst} from '@nrwl/angular/testing';

import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';

import {NxModule} from '@nrwl/angular';
import {MovieListFacade} from './movie-list.facade';

import * as MovieListActions from './movie-list.actions';
import {loadMovieList} from './movie-list.actions';
import {HttpClientModule} from "@angular/common/http";
import {AppLibModule} from "@most-popular-movies-angular/app-lib";
import {MovieListEntity} from "../../services/tmdb.resource.models";

describe('MovieListFacade', () => {
  let facade: MovieListFacade;
  let store: Store;

  const movieList1: MovieListEntity[] = [
    {id: 1, title: 'Movie1'},
    {id: 2, title: 'Movie2'}
  ]
  const movieListEntities1 = movieList1.reduce((ret, item) => {
    ret[item.id] = item;
    return ret;
  }, {})
  // const movieListIds1 = movieList1.map((item) => item.id);

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
      facade = TestBed.inject(MovieListFacade);
    });

    it('getMovieList() should dispatch an loadMovieList action', () => {
      spyOn(store, 'dispatch')

      facade.loadMovieList(24)

      expect(store.dispatch).toHaveBeenCalledTimes(1);
      expect(store.dispatch).toHaveBeenCalledWith(loadMovieList({page: 24}));
    });

    it('allMovieList$ should return an empty list, when the movie list is not loaded', async (done) => {
      try {
        const list = await readFirst(facade.allMovieList$);

        expect(list.length).toBe(0);
        done();
      } catch (err) {
        done.fail(err);
      }

    });

    it('after loadMovieListSuccess, allMovieList$ should return the loaded list; loading$ == false; totalMovies$, totalMovies$, totalPages$, page$, errorMessage$ should match', async (done) => {
      try {

        store.dispatch(
          MovieListActions.loadMovieListSuccess({totalMovies: 142, movieList: movieList1, totalPages: 6})
        );

        const list = await readFirst(facade.allMovieList$);
        expect(list.length).toBe(2);
        expect(list).toStrictEqual(movieList1);

        const totalMovies = await readFirst(facade.totalMovies$);
        expect(totalMovies).toBe(142);

        const totalPages = await readFirst(facade.totalPages$);
        expect(totalPages).toBe(6);

        const page = await readFirst(facade.page$);
        expect(page).toBe(1);

        const errorMessage = await readFirst(facade.errorMessage$);
        expect(errorMessage).toBe(null);

        const loading = await readFirst(facade.loading$);
        expect(loading).toBe(false);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('after loadMovieListSuccess action & facade.selectMovie, selectedMovie$ should match', async (done) => {
      try {
        store.dispatch(
          MovieListActions.loadMovieListSuccess({totalMovies: 142, movieList: movieList1, totalPages: 6})
        );

        facade.selectMovie(2)

        const selectedMovie = await readFirst(facade.selectedMovie$);
        expect(selectedMovie).toStrictEqual(movieListEntities1[2]);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
