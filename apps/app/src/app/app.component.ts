import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MovieGenresFacade, MovieListFacade} from "@most-popular-movies-angular/app-lib";
import {Subject} from "rxjs";

@Component({
  selector: 'most-popular-movies-angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Most Popular Movies List';
  private unsubscribe$ = new Subject<void>();

  constructor(private movieListFacade: MovieListFacade, private movieGenresFacade: MovieGenresFacade) {

  }

  ngOnInit() {
    this.movieGenresFacade.subscribeOnLoadSuccess(this.unsubscribe$, () => {
      this.movieListFacade.loadMovieList(1);
    });
    this.movieGenresFacade.loadMovieGenres();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
