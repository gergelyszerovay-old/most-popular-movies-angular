import {MOVIEGENRES_FEATURE_KEY, movieGenresReducer, MovieGenresState} from "./movie-genres/movie-genres.reducer";
import {MOVIELIST_FEATURE_KEY, movieListReducer, MovieListState} from "./movie-list/movie-list.reducer";
import {Action, combineReducers, createFeatureSelector} from "@ngrx/store";

export const APPLIB_FEATURE_KEY = 'AppLib';

export interface AppLibState {
  [MOVIEGENRES_FEATURE_KEY]: MovieGenresState,
  [MOVIELIST_FEATURE_KEY]: MovieListState
}

export interface AppLibRootStatePartial {
  [APPLIB_FEATURE_KEY]: AppLibState
}

export function AppLibReducer(state: AppLibState | undefined, action: Action) {
  return combineReducers({
    [MOVIEGENRES_FEATURE_KEY]: movieGenresReducer,
    [MOVIELIST_FEATURE_KEY]: movieListReducer,
  })(state, action);
}

export const getAppLibState = createFeatureSelector<AppLibRootStatePartial,
  AppLibState>(APPLIB_FEATURE_KEY);
