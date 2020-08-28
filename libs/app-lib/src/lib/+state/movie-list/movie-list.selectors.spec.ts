import {MOVIELIST_FEATURE_KEY, movieListAdapter, movieListInitialState} from './movie-list.reducer';
import * as MovieListSelectors from './movie-list.selectors';
import {APPLIB_FEATURE_KEY, AppLibRootStatePartial} from "../app-lib.reducer";
import {MOVIEGENRES_FEATURE_KEY, movieGenresInitialState} from "../movie-genres/movie-genres.reducer";
import {MovieGenresEntity, MovieListEntity} from "../../services/tmdb.resource.models";

describe('MovieList Selectors', () => {
  const ERROR_MSG = 'No Error Available';

  const movieList1: MovieListEntity[] = [
    {id: 1, title: 'Movie1', genre_ids: [1, 2]},
    {id: 2, title: 'Movie2', genre_ids: [2]}
  ]

  const movieGenreList1: MovieGenresEntity[] = [
    {id: 1, name: 'Genre1'},
    {id: 2, name: 'Genre2'}
  ]
  const movieGenreListEntities1 = movieGenreList1.reduce((ret, item) => {
    ret[item.id] = item;
    return ret;
  }, {})
  const movieGenreListIds1 = movieGenreList1.map((item) => item.id);

  let state: AppLibRootStatePartial;

  beforeEach(() => {
    state = {
      [APPLIB_FEATURE_KEY]: {
        [MOVIELIST_FEATURE_KEY]: movieListAdapter.setAll(
          movieList1,
          {
            ...movieListInitialState,
            errorMessage: ERROR_MSG,
            selectedMovie: movieList1[0],
            loading: false,
            totalMovies: 24,
            totalPages: 43,
            page: 2
          }
        ),
        [MOVIEGENRES_FEATURE_KEY]: movieListAdapter.setAll(
          movieGenreList1,
          {
            ...movieGenresInitialState,
            errorMessage: ERROR_MSG,
            loading: false,
          }
        ),
      }
    };
  });

  describe('MovieList Selectors', () => {
    it('getAllMovieList() should return the list of MovieList', () => {
      const results = MovieListSelectors.getAllMovieList(state);

      expect(results).toStrictEqual(movieList1);
    });

    it("getErrorMessage() should return the current 'errorMessage'", () => {
      const result = MovieListSelectors.getErrorMessage(state);

      expect(result).toBe(ERROR_MSG);
    });

    it("getTotalMovies() should return the current 'totalMovies'", () => {
      const result = MovieListSelectors.getTotalMovies(state);

      expect(result).toBe(24);
    });

    it("getTotalPages() should return the current 'totalPages'", () => {
      const result = MovieListSelectors.getTotalPages(state);

      expect(result).toBe(43);
    });

    it("getPage() should return the current 'page'", () => {
      const result = MovieListSelectors.getPage(state);

      expect(result).toBe(2);
    });

    it("getLoading() should return 'false'", () => {
      const result = MovieListSelectors.getLoading(state);

      expect(result).toBe(false);
    });

    it("getSelectedMovie() should return the current 'selectedMovie'", () => {
      const result = MovieListSelectors.getSelectedMovie(state);

      expect(result).toStrictEqual(movieList1[0]);
    });

    it("getSelectedMovieWithGenreNames() should return the current 'selectedMovie' including the names of its genres", () => {
      const result = MovieListSelectors.getSelectedMovieWithGenreNames(state);

      expect(result).toStrictEqual(Object.assign({}, movieList1[0], {
        _genres: [{id: 1, name: 'Genre1'}, {
          id: 2,
          name: 'Genre2'
        }]
      }));
    });
  });
});
