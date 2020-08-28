import * as MovieListActions from './movie-list.actions';
import {movieListInitialState, movieListReducer} from './movie-list.reducer';
import {createAction} from "@ngrx/store";
import {MovieListEntity} from "../../services/tmdb.resource.models";

describe('MovieList Reducer', () => {
  const movieList1: MovieListEntity[] = [
    {id: 1, title: 'Movie1'},
    {id: 2, title: 'Movie2'}
  ]
  const movieListEntities1 = movieList1.reduce((ret, item) => {
    ret[item.id] = item;
    return ret;
  }, {})
  const movieListIds1 = movieList1.map((item) => item.id);

  beforeEach(() => {
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const result = movieListReducer(undefined, createAction('noop'));

      expect(result).toStrictEqual(movieListInitialState);
    });
  });

  describe('loadMovieList action', () => {
    it('should return isLoading true, page should match, errorMessage should be null', () => {
      const newState = movieListReducer(movieListInitialState, MovieListActions.loadMovieList({page: 13}));

      expect(newState.loading).toBe(true);
      expect(newState.page).toBe(13);
      expect(newState.errorMessage).toBe(null);
    });
  });

  describe('loadMovieListSuccess action', () => {
    it('should return isLoading false, errorMessage should be null, totalPages, totalMovies and movieList should match', () => {

      const newState = movieListReducer(movieListInitialState, MovieListActions.loadMovieListSuccess({
        totalMovies: 142,
        movieList: movieList1,
        totalPages: 6
      }));

      expect(newState.loading).toBe(false);
      expect(newState.errorMessage).toBe(null);
      expect(newState.totalMovies).toBe(142);
      expect(newState.totalPages).toBe(6);
      expect(newState.entities).toStrictEqual(movieListEntities1);
      expect(newState.ids).toStrictEqual(movieListIds1);
    });
  });

  describe('loadMovieListFailure action', () => {
    it('should return isLoading false, errorMessage should match', () => {
      const errorMessage = '404 Error'

      const newState = movieListReducer(movieListInitialState, MovieListActions.loadMovieListFailure({errorMessage}));

      expect(newState.loading).toBe(false);
      expect(newState.errorMessage).toBe(errorMessage);
    });
  });

  describe('selectMovie action', () => {
    it('should set selectedMovie', () => {
      const newState = movieListReducer(movieListInitialState, MovieListActions.loadMovieListSuccess({
        totalMovies: 142,
        movieList: movieList1,
        totalPages: 6
      }));
      const newState2 = movieListReducer(newState, MovieListActions.selectMovie({id: 2}));

      expect(newState2.selectedMovie).toStrictEqual(movieListEntities1[2]);
    });
  });

});
