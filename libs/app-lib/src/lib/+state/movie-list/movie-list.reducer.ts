import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

import * as MovieListActions from './movie-list.actions';
import {MovieListEntity} from "../../services/tmdb.resource.models";

export const MOVIELIST_FEATURE_KEY = 'movieList';

export interface MovieListState extends EntityState<MovieListEntity> {
  // loaded: boolean; // has the MovieList list been loaded
  errorMessage?: string | null; // last known error (if any)
  page: number;
  totalMovies?: number;
  totalPages?: number;
  selectedMovie?: MovieListEntity;
  loading: boolean;
}

export interface MovieListPartialState {
  readonly [MOVIELIST_FEATURE_KEY]: MovieListState;
}

export const movieListAdapter: EntityAdapter<MovieListEntity> = createEntityAdapter<MovieListEntity>();

export const movieListInitialState: MovieListState = movieListAdapter.getInitialState({
  // set initial required properties
  // loaded: false,
  page: 1,
  loading: false,
  errorMessage: null
});

export const movieListReducer = createReducer(
  movieListInitialState,
  on(MovieListActions.loadMovieList, (state, {page}) => ({
    ...state,
    // loaded: false,
    errorMessage: null,
    loading: true,
    page
  })),
  on(MovieListActions.loadMovieListSuccess, (state, {movieList, totalMovies, totalPages}) =>

    movieListAdapter.setAll(movieList, {
      ...state,
      // loaded: true,
      totalMovies, totalPages,
      errorMessage: null,
      loading: false
    })
  ),
  on(MovieListActions.loadMovieListFailure, (state, {errorMessage}) => ({
    ...state,
    errorMessage,
    loading: false
  })),
  on(MovieListActions.selectMovie, (state, {id}) => ({
    ...state,
    selectedMovie: state.entities[id]
  }))
);

// export function movieListReducer(state: MovieListState | undefined, action: Action) {
//   return _movieListReducer(state, action);
// }
