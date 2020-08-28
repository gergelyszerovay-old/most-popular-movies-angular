import {Injectable} from '@angular/core';

import {select, Store} from '@ngrx/store';

import * as MovieListSelectors from './movie-list.selectors';
import * as MovieListActions from './movie-list.actions';
import {loadMovieList} from './movie-list.actions';
import {AppLibRootStatePartial} from "../app-lib.reducer";

@Injectable()
export class MovieListFacade {
  allMovieList$ = this.store.pipe(select(MovieListSelectors.getAllMovieList));
  totalMovies$ = this.store.pipe(select(MovieListSelectors.getTotalMovies));
  totalPages$ = this.store.pipe(select(MovieListSelectors.getTotalPages));
  page$ = this.store.pipe(select(MovieListSelectors.getPage));
  selectedMovie$ = this.store.pipe(select(MovieListSelectors.getSelectedMovie));
  errorMessage$ = this.store.pipe(select(MovieListSelectors.getErrorMessage));
  loading$ = this.store.pipe(select(MovieListSelectors.getLoading));

  // allMovieListWithGenreNames$ = this.store.pipe(select(MovieListSelectors.getAllMovieListWithGenreNames));

  selectedMovieWithGenreNames$ = this.store.pipe(select(MovieListSelectors.getSelectedMovieWithGenreNames));

  constructor(private store: Store<AppLibRootStatePartial>) {
  }

  loadMovieList(page: number) {
    this.store.dispatch(loadMovieList({page}));
  }

  selectMovie(id: number) {
    this.store.dispatch(MovieListActions.selectMovie({id}));
  }
}
