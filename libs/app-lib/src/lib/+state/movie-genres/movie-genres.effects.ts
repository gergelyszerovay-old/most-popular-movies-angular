import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as MovieGenresActions from './movie-genres.actions';
import {map} from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {TmdbResourceService} from "../../services/tmdb.resource.service";
import {MovieGenresRequestResult} from "../../services/tmdb.resource.models";

@Injectable()
export class MovieGenresEffects {
  loadMovieGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieGenresActions.loadMovieGenres),
      fetch({
        run: (action) => {
          return this.movieListService.getMovieGenres().pipe(
            map((response: MovieGenresRequestResult) => MovieGenresActions.loadMovieGenresSuccess({
              movieGenres: response.genres
            }))
          );
        },

        onError: (action, error: HttpErrorResponse) => {
          return MovieGenresActions.loadMovieGenresFailure({errorMessage: error.message});
        },
      })
    )
  );

  constructor(private actions$: Actions, private movieListService: TmdbResourceService) {
  }
}
