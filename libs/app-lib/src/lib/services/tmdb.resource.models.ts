// Based on https://developers.themoviedb.org/3/genres/get-movie-list

export interface MovieListEntity {
  poster_path?: string | null;    // string or null optional
  adult?: boolean;                // boolean optional
  overview?: string;              // string optional
  release_date?: string;          // string optional
  genre_ids?: Array<number>;     // array[integer] optional
  id?: number;                    // integer optional
  original_title?: string;        // string optional
  original_language?: string;     // string optional
  title?: string;                 // string optional
  backdrop_path?: string | null;  // string or null optional
  popularity?: number;            // number optional
  vote_count?: number;            // integer optional
  video?: boolean;                // boolean optional
  vote_average?: number;          // number optional
}

export interface MovieListRequestResult {
  page: number;                 // integer optional
  results: MovieListEntity[];   // array[object] optional
  total_results: number;        // integer optional
  total_pages: number;          // integer optional
}

// Based on https://developers.themoviedb.org/3/discover/movie-discover

export interface MovieGenresEntity {
  id: number;   // integer optional
  name: string; // string optional
}

export interface MovieGenresRequestResult {
  genres: MovieGenresEntity[];   // array[object] optional
}
