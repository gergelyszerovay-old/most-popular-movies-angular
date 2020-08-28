import {MovieListComponent} from './movie-list.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgbPagination, NgbToast} from "@ng-bootstrap/ng-bootstrap";

import * as Stories from './movie-list.component.stories';
import {By} from "@angular/platform-browser";
import {MockComponent, ngMocks} from "ng-mocks";

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieListComponent,
        MockComponent(NgbPagination),
        MockComponent(NgbToast)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trackByFnMovieList should return item.id', () => {
    expect(component.trackByFnMovieList(1, {id: 2})).toBe(2);
  });

  describe('@Output tests', () => {
    it('onMovieClick', () => {
      const props = Stories['isLoaded']().props;
      const {onMovieClick, ...propsFiltered} = props;
      component = Object.assign(component, propsFiltered);
      fixture.detectChanges();

      let selectedMovieId: number;
      component.onMovieClick.subscribe((id: number) => (selectedMovieId = id));

      const debugEl = fixture.debugElement.query(
        By.css('[data-qa="movie-list-ul"] > li:first-child > a')
      );

      debugEl.triggerEventHandler('click', null);
      expect(selectedMovieId).toEqual(props.movieList[0].id);
    });

    it('onPageChange', () => {
      const props = Stories['isLoaded']().props;
      const {onPageChange, ...propsFiltered} = props;
      component = Object.assign(component, propsFiltered);
      fixture.detectChanges();

      const mockedNgbPagination = ngMocks.find<NgbPagination>(fixture.debugElement, 'ngb-pagination').componentInstance;

      let selectedPageId: number;
      component.onPageChange.subscribe((id: number) => {
        selectedPageId = id
      });

      mockedNgbPagination.pageChange.emit(2)
      expect(selectedPageId).toEqual(2);
    });
  });

  describe('Storybook stories snapshot tests', () => {
    for (const [key, value] of Object.entries(Stories)) {
      if (value instanceof Function) {
        it(`Story ${key}`, () => {
          component = Object.assign(component, Stories[key]().props)
          fixture.detectChanges();
          expect(fixture).toMatchSnapshot();
        });
      }
    }
  });

});
