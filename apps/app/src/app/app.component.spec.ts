import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {
  AppLibModule,
  MainLayoutComponent,
  MovieGenresFacade,
  MovieListFacade
} from "@most-popular-movies-angular/app-lib";
import {MockComponent} from "ng-mocks";
import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {NxModule} from "@nrwl/angular";
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async(() => {

    @NgModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        AppLibModule,
        HttpClientModule
      ],
    })
    class RootModule {
    }

    TestBed.configureTestingModule({
      imports: [RootModule],
      declarations: [
        AppComponent,
        MockComponent(MainLayoutComponent),
      ]
    })
      .compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('ngOnInit should load the genre and movie list', () => {
    const movieListFacade = TestBed.inject(MovieListFacade);
    const movieGenresFacade = TestBed.inject(MovieGenresFacade);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    spyOn(movieListFacade, 'loadMovieList')
    spyOn(movieGenresFacade, 'loadMovieGenres')

    app.ngOnInit();

    expect(movieGenresFacade.loadMovieGenres).toHaveBeenCalledTimes(1);
    expect(movieGenresFacade.loadMovieGenres).toHaveBeenCalledWith();

    movieGenresFacade._dispatchOnLoadSuccess();

    expect(movieListFacade.loadMovieList).toHaveBeenCalledTimes(1);
    expect(movieListFacade.loadMovieList).toHaveBeenCalledWith(1);

  });

  it(`should have as title 'app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Most Popular Movies List');
  });
});
