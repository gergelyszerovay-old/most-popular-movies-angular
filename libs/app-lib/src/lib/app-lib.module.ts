import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {MovieDetailedInformationComponent} from './components/movie-detailed-information/movie-detailed-information.component';
import {MainLayoutComponent} from './containers/main-layout/main-layout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MovieListEffects} from './+state/movie-list/movie-list.effects';
import {MovieListFacade} from './+state/movie-list/movie-list.facade';
import {HttpClientModule} from '@angular/common/http';
import {MovieGenresEffects} from './+state/movie-genres/movie-genres.effects';
import {MovieGenresFacade} from './+state/movie-genres/movie-genres.facade';
import {APPLIB_FEATURE_KEY, AppLibReducer} from "./+state/app-lib.reducer";
import {GetYearFromISODatePipe, NumberToFixedPipe} from "./components/pipes";
import {environment} from '@env/environment';
import {TmdbResourceService} from "./services/tmdb.resource.service";
import {TmdbResourceServiceMock} from "./services/tmdb.resource.service.mock";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    StoreModule.forFeature(APPLIB_FEATURE_KEY, AppLibReducer),
    EffectsModule.forFeature([MovieListEffects]),
    EffectsModule.forFeature([MovieGenresEffects]),
  ],
  declarations: [
    MovieListComponent,
    MovieDetailedInformationComponent,
    MainLayoutComponent,
    NumberToFixedPipe,
    GetYearFromISODatePipe
  ],
  exports: [MainLayoutComponent],
  providers: [
    MovieListFacade,
    MovieGenresFacade,
    ((environment.tmdbApiKey === "") && (!environment.production)) ? {
      provide: TmdbResourceService,
      useClass: TmdbResourceServiceMock
    } : TmdbResourceService
  ],
})
export class AppLibModule {
}
