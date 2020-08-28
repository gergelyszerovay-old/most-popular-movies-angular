import {createSelector} from '@ngrx/store';
import {MOVIELIST_FEATURE_KEY, movieListAdapter, MovieListState,} from './movie-list.reducer';
import {getMovieGenresEntities} from "../movie-genres/movie-genres.selectors";
import {getAppLibState} from "../app-lib.reducer";


const getMovieListState = createSelector(
  getAppLibState,
  (state) => state[MOVIELIST_FEATURE_KEY]
);

const {selectAll, selectEntities} = movieListAdapter.getSelectors();

export const getAllMovieList = createSelector(
  getMovieListState,
  (state: MovieListState) => selectAll(state)
);

// export const getAllMovieListWithGenreNames = createSelector(
//   getAllMovieList,
//   getMovieGenresEntities,
//   (movies, genres) : any => {
//     const res = movies.map((movie) => {
//       return Object.assign({}, movie, {
//         'genres': movie.genre_ids.map(id => genres[id].name)
//       })
//     });
//     return res
//   }
// );

export const getErrorMessage = createSelector(
  getMovieListState,
  (state: MovieListState) => state.errorMessage
);

export const getTotalMovies = createSelector(
  getMovieListState,
  (state: MovieListState) => state.totalMovies
);

export const getTotalPages = createSelector(
  getMovieListState,
  (state: MovieListState) => state.totalPages
);

export const getPage = createSelector(
  getMovieListState,
  (state: MovieListState) => state.page
);

export const getLoading = createSelector(
  getMovieListState,
  (state: MovieListState) => state.loading
);

export const getSelectedMovie = createSelector(
  getMovieListState,
  (state: MovieListState) => state.selectedMovie
);

export const getSelectedMovieWithGenreNames = createSelector(
  getMovieListState,
  getMovieGenresEntities,
  (state: MovieListState, genres) => {
    if (!state.selectedMovie) return null;
    return Object.assign(
      {}, state.selectedMovie,
      {_genres: state.selectedMovie.genre_ids.map(id => genres[id])});
  }
);


