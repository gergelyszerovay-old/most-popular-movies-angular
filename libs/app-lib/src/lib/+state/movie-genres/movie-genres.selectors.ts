import {createSelector} from '@ngrx/store';
import {MOVIEGENRES_FEATURE_KEY, MovieGenresState,} from './movie-genres.reducer';
import {getAppLibState} from "../app-lib.reducer";

// Lookup the 'MovieGenres' feature state managed by NgRx
// export const getMovieGenresState = createFeatureSelector<
//   MovieGenresPartialState,
//   MovieGenresState
// >(MOVIEGENRES_FEATURE_KEY);

export const getMovieGenresState = createSelector(
  getAppLibState,
  (state) => state[MOVIEGENRES_FEATURE_KEY]
)
export const getMovieGenresEntities = createSelector(
  getMovieGenresState,
  (state: MovieGenresState) => state.entities
);

export const getErrorMessage = createSelector(
  getMovieGenresState,
  (state: MovieGenresState) => state.errorMessage
);

export const getLoading = createSelector(
  getMovieGenresState,
  (state: MovieGenresState) => state.loading
);

// export const selectGenresByID = createSelector(
//   getMovieGenresState,
//   (state: MovieGenresState, props) => props.ids.map(id => state.entities[id])
// );
