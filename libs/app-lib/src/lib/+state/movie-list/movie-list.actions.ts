import {createAction, props} from '@ngrx/store';
import {MovieListEntity} from "../../services/tmdb.resource.models";

export const loadMovieList = createAction(
  '[MovieList] Load MovieList',
  props<{ page: number }>()
);

export interface LoadMovieListSuccessProps {
  movieList: MovieListEntity[],
  totalMovies: number,
  totalPages: number
}

export const loadMovieListSuccess = createAction(
  '[MovieList] Load MovieList Success',
  props<LoadMovieListSuccessProps>()
);

export const loadMovieListFailure = createAction(
  '[MovieList] Load MovieList Failure',
  props<{ errorMessage: string }>()
);

export const selectMovie = createAction(
  '[MovieList] Movie Select',
  props<{ id: number }>()
);
