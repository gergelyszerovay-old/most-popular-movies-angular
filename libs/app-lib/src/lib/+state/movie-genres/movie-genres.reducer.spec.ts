import * as MovieGenresActions from './movie-genres.actions';
import {movieGenresInitialState, movieGenresReducer} from './movie-genres.reducer';
import {createAction} from "@ngrx/store";
import {MovieGenresEntity} from "../../services/tmdb.resource.models";

describe('MovieGenres Reducer', () => {
  const movieGenreList1: MovieGenresEntity[] = [
    {id: 1, name: 'Genre1'},
    {id: 2, name: 'Genre2'}
  ]
  const movieGenreListEntities1 = movieGenreList1.reduce((ret, item) => {
    ret[item.id] = item;
    return ret;
  }, {})
  const movieGenreListIds1 = movieGenreList1.map((item) => item.id);

  beforeEach(() => {
  });

  describe('an unknown action', () => {
    it('should return the initial state', () => {
      const result = movieGenresReducer(undefined, createAction('noop'));

      expect(result).toStrictEqual(movieGenresInitialState);
    });
  });

  describe('loadMovieGenres action', () => {
    it('should return isLoading true, errorMessage should be null', () => {
      const newState = movieGenresReducer(movieGenresInitialState, MovieGenresActions.loadMovieGenres());

      expect(newState.loading).toBe(true);
      expect(newState.errorMessage).toBe(null);
    });
  });

  describe('loadMovieGenresSuccess action', () => {
    it('should return isLoading false, errorMessage should be null, totalPages, totalMovies and movieList should match', () => {

      const newState = movieGenresReducer(movieGenresInitialState, MovieGenresActions.loadMovieGenresSuccess({movieGenres: movieGenreList1}));

      expect(newState.loading).toBe(false);
      expect(newState.errorMessage).toBe(null);
      expect(newState.entities).toStrictEqual(movieGenreListEntities1);
      expect(newState.ids).toStrictEqual(movieGenreListIds1);
    });
  });

  describe('loadMovieGenresFailure action', () => {
    it('should return isLoading false, errorMessage should match', () => {
      const errorMessage = '404 Error'

      const newState = movieGenresReducer(movieGenresInitialState, MovieGenresActions.loadMovieGenresFailure({errorMessage}));

      expect(newState.loading).toBe(false);
      expect(newState.errorMessage).toBe(errorMessage);
    });
  });

});
