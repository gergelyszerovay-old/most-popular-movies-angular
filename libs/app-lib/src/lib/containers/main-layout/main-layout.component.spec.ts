import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MainLayoutComponent} from './main-layout.component';
import {MockComponent, ngMocks} from "ng-mocks";
import {MovieDetailedInformationComponent} from "../../components/movie-detailed-information/movie-detailed-information.component";
import {MovieListComponent} from "../../components/movie-list/movie-list.component";
import {MovieGenresFacade, MovieListFacade} from "@most-popular-movies-angular/app-lib";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {NgModule} from "@angular/core";
import {NxModule} from "@nrwl/angular";
import {HttpClientModule} from "@angular/common/http";
import {APPLIB_FEATURE_KEY, AppLibReducer} from "../../+state/app-lib.reducer";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let facade: MovieListFacade;

  beforeEach(async(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(APPLIB_FEATURE_KEY, AppLibReducer)
      ],
      providers: [
        MovieListFacade,
        MovieGenresFacade
      ],
    })
    class CustomFeatureModule {
    }

    @NgModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        CustomFeatureModule,
        // AppLibModule,
        HttpClientModule
      ],
    })
    class RootModule {
    }

    TestBed.configureTestingModule({
      imports: [
        RootModule,
        NgbModule
      ],
      declarations: [
        MainLayoutComponent,
        MockComponent(MovieDetailedInformationComponent),
        MockComponent(MovieListComponent),
      ],
    })
      .compileComponents();

  }));

  beforeEach(() => {
    facade = TestBed.inject(MovieListFacade);

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the snapshot match', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('@Output tests of app-movie-list', () => {
    it('onMovieSelected', () => {
      const mockedMovieListComponent = ngMocks.find<MovieListComponent>(fixture.debugElement, 'app-movie-list').componentInstance;

      spyOn(facade, 'selectMovie')

      mockedMovieListComponent.onMovieClick.emit(2)

      expect(facade.selectMovie).toHaveBeenCalledTimes(1);
      expect(facade.selectMovie).toHaveBeenCalledWith(2);
    });

    it('onMovieListPageSelected', () => {
      const mockedMovieListComponent = ngMocks.find<MovieListComponent>(fixture.debugElement, 'app-movie-list').componentInstance;

      spyOn(facade, 'loadMovieList')

      mockedMovieListComponent.onPageChange.emit(4)

      expect(facade.loadMovieList).toHaveBeenCalledTimes(1);
      expect(facade.loadMovieList).toHaveBeenCalledWith(4);
    });
  });

  it('onDetailsClose should change isDetailsVisibleOnMobile to false', () => {
    component.isDetailsVisibleOnMobile = true;
    component.onDetailsClose();
    expect(component.isDetailsVisibleOnMobile).toBe(false);
  });
});
