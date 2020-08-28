import {createAction, props} from '@ngrx/store';
import {MovieGenresEntity} from "../../services/tmdb.resource.models";

export const loadMovieGenres = createAction('[MovieGenres] Load MovieGenres');

export interface LoadMovieGenresSuccessProps {
  movieGenres: MovieGenresEntity[]
}

export const loadMovieGenresSuccess = createAction(
  '[MovieGenres] Load MovieGenres Success',
  props<LoadMovieGenresSuccessProps>()
);

export const loadMovieGenresFailure = createAction(
  '[MovieGenres] Load MovieGenres Failure',
  props<{ errorMessage: string }>()
);
