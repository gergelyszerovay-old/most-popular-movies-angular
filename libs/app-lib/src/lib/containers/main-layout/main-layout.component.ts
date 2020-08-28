import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from "rxjs";
import {MovieListFacade} from "../../+state/movie-list/movie-list.facade";
import {environment} from '@env/environment';
import {MovieListEntity} from "../../services/tmdb.resource.models";
import {MovieGenresFacade} from "../../+state/movie-genres/movie-genres.facade";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

  movieList$: Observable<MovieListEntity[]>;
  paginationCollectionSize$: Observable<number>;
  paginationSelectedPage$: Observable<number>;
  selectedMovie$: Observable<MovieListEntity>;
  movieListErrorMessage$: Observable<string>;
  movieListLoading$: Observable<boolean>;
  movieGenresLoading$: Observable<boolean>;
  movieGenresErrorMessage$: Observable<string>;

  isDetailsVisibleOnMobile: Boolean = false;

  baseUrlPoster: string;
  pageSize: number;

  constructor(private movieListFacade: MovieListFacade, private movieGenresFacade: MovieGenresFacade) {
    this.baseUrlPoster = environment.tmdbBaseUrlPoster;
    this.pageSize = environment.tmdbDiscoverMoviePageSize;

    this.paginationCollectionSize$ = movieListFacade.totalMovies$;
    this.paginationSelectedPage$ = movieListFacade.page$;
    this.selectedMovie$ = movieListFacade.selectedMovieWithGenreNames$;
    this.movieListErrorMessage$ = movieListFacade.errorMessage$;
    this.movieList$ = movieListFacade.allMovieList$;
    this.movieListLoading$ = movieListFacade.loading$;
    this.movieGenresLoading$ = movieGenresFacade.loading$;
    this.movieGenresErrorMessage$ = movieGenresFacade.errorMessage$;
  }

  isLoading$() {
    return combineLatest([this.movieListLoading$, this.movieGenresLoading$]).pipe(
      map(([a, b]) => {
        return a || b;
      })
    );
  }

  onDetailsClose() {
    this.isDetailsVisibleOnMobile = false;
  }

  onMovieSelected(id: number) {
    this.movieListFacade.selectMovie(id)
    this.isDetailsVisibleOnMobile = true
  }

  onMovieListPageSelected(page: number) {
    this.movieListFacade.loadMovieList(page);
  }

  onReloadGenres() {
    this.movieGenresFacade.loadMovieGenres();
  }

  onReloadMovies() {
    this.movieListFacade.loadMovieList(1);
  }

  ngOnInit(): void {
  }
}
