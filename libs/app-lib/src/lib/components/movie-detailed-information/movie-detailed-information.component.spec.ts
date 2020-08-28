import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MovieDetailedInformationComponent} from './movie-detailed-information.component';
import {NgbAlert, NgbRating, NgbToast} from "@ng-bootstrap/ng-bootstrap";

import * as Stories from './movie-detailed-information.component.stories';
import {GetYearFromISODatePipe, NumberToFixedPipe} from "../pipes";
import {MockComponent} from "ng-mocks";

describe('MovieDetailedInformationComponent', () => {
  let component: MovieDetailedInformationComponent;
  let fixture: ComponentFixture<MovieDetailedInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieDetailedInformationComponent,
        NumberToFixedPipe,
        GetYearFromISODatePipe,
        MockComponent(NgbToast),
        MockComponent(NgbRating),
        MockComponent(NgbAlert),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailedInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trackByFnGenreList should return item.id', () => {
    expect(component.trackByFnGenreList(1, {id: 2})).toBe(2);
  });

  describe('Storybook stories snapshot tests', () => {
    for (const [key, value] of Object.entries(Stories)) {
      if (value instanceof Function) {
        // console.log(`${key}: ${value}`);
        it(`Story ${key}`, () => {
          component = Object.assign(component, Stories[key]().props)
          fixture.detectChanges();
          expect(fixture).toMatchSnapshot();
        });
      }
    }
  });

  // it('Story noMovieSelected', () => {
  //   // console.log(Stories.noMovieSelected().props);
  //   component = Object.assign(component, Stories.noMovieSelected().props)
  //   fixture.detectChanges();
  //
  //   expect(fixture).toMatchSnapshot();
  // });


});
