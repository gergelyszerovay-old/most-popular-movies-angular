import {Injectable} from '@angular/core';
import * as MovieGenresActions from './movie-genres.actions';
import {loadMovieGenres} from './movie-genres.actions';

import {select, Store} from '@ngrx/store';

import * as MovieGenresSelectors from './movie-genres.selectors';
import {Actions, ofType} from "@ngrx/effects";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {AppLibRootStatePartial} from "../app-lib.reducer";

@Injectable()
export class MovieGenresFacade {
  movieGenresEntities$ = this.store.pipe(select(MovieGenresSelectors.getMovieGenresEntities));
  errorMessage$ = this.store.pipe(select(MovieGenresSelectors.getErrorMessage));
  loading$ = this.store.pipe(select(MovieGenresSelectors.getLoading));

  // getGenresByIds$(ids) {
  //   return this.store.pipe(select(MovieGenresSelectors.selectGenresByID, { ids }));
  // }

  constructor(private store: Store<AppLibRootStatePartial>, private actions$: Actions) {
  }

  loadMovieGenres() {
    this.store.dispatch(loadMovieGenres());
  }

  subscribeOnLoadSuccess(unsubscribe$: Subject<void>, cb: () => void) {
    this.actions$.pipe(
      takeUntil(unsubscribe$),
      ofType(MovieGenresActions.loadMovieGenresSuccess)
    ).subscribe(() => {
      cb()
    })
  }

  // for testing purposes only
  _dispatchOnLoadSuccess() {
    this.store.dispatch(MovieGenresActions.loadMovieGenresSuccess({movieGenres: []}))
  }
}

