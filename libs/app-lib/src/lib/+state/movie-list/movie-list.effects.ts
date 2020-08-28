import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map} from "rxjs/operators";
import {fetch} from '@nrwl/angular';

import * as MovieListActions from './movie-list.actions';
import {TmdbResourceService} from "../../services/tmdb.resource.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MovieListRequestResult} from "../../services/tmdb.resource.models";

@Injectable()
export class MovieListEffects {
  loadMovieList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieListActions.loadMovieList),
      fetch({
        run: (action) => {
          return this.movieListService.getMovieList(action.page).pipe(
            map((response: MovieListRequestResult) => MovieListActions.loadMovieListSuccess({
              movieList: response.results,
              totalMovies: response.total_results,
              totalPages: response.total_pages
            }))
          );
        },

        onError: (action, error: HttpErrorResponse) => {
          return MovieListActions.loadMovieListFailure({errorMessage: error.message});
        },
      })
    )
  );

  constructor(private actions$: Actions, private movieListService: TmdbResourceService) {
  }
}
