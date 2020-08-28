import {MovieGenresEntity, MovieListEntity} from "../../services/tmdb.resource.models";

export interface MovieListEntityWithGenreNames extends MovieListEntity {
  _genres?: Array<MovieGenresEntity>;
}

