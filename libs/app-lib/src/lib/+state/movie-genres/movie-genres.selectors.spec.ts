import {MOVIEGENRES_FEATURE_KEY, movieGenresInitialState} from './movie-genres.reducer';
import * as MovieGenresSelectors from './movie-genres.selectors';
import {MOVIELIST_FEATURE_KEY, movieListAdapter, movieListInitialState} from "../movie-list/movie-list.reducer";
import {APPLIB_FEATURE_KEY, AppLibRootStatePartial} from "../app-lib.reducer";
import {MovieGenresEntity} from "../../services/tmdb.resource.models";

describe('MovieGenres Selectors', () => {
  const ERROR_MSG = 'No Error Available';

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
        [MOVIEGENRES_FEATURE_KEY]: movieListAdapter.setAll(
          movieGenreList1,
          {
            ...movieGenresInitialState,
            errorMessage: ERROR_MSG,
            loading: false,
          }
        ),
        [MOVIELIST_FEATURE_KEY]: movieListInitialState
      }
    };

  });

  describe('MovieGenres Selectors', () => {
    it('getMovieGenresEntities() should return the object of MovieGenres', () => {
      const results = MovieGenresSelectors.getMovieGenresEntities(state);

      expect(results).toStrictEqual(movieGenreListEntities1);
    });

    it("getErrorMessage() should return the current 'errorMessage'", () => {
      const result = MovieGenresSelectors.getErrorMessage(state);

      expect(result).toBe(ERROR_MSG);
    });

    it("getLoading() should return 'false'", () => {
      const result = MovieGenresSelectors.getLoading(state);
      expect(result).toBe(false);
    });

    // it ('selectGenresByID should return the matching genres', () => {
    //   const result = MovieGenresSelectors.selectGenresByID(state, {ids: [2]})
    //   expect(result).toStrictEqual([{id: 2, name: 'Genre2'}]);
    // })
  });
});
