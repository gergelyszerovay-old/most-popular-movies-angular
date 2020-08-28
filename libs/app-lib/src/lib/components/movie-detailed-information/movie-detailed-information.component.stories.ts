import {object, text} from '@storybook/addon-knobs';
import {MovieDetailedInformationComponent} from './movie-detailed-information.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {action} from "@storybook/addon-actions";
import {GetYearFromISODatePipe, NumberToFixedPipe} from "../pipes";

export default {
  title: 'MovieDetailedInformationComponent'
}

const moduleMetadata = {
  imports: [NgbModule],
  declarations: [
    NumberToFixedPipe,
    GetYearFromISODatePipe
  ]
};

export const noMovieSelected = () => ({
  moduleMetadata,
  component: MovieDetailedInformationComponent,
  props: {
    movie: object('movie', null),
    baseUrlPoster: text('baseUrlPoster', 'https://image.tmdb.org/t/p/w500/'),
    onCloseClick: action('onCloseClick'),
  }
});

export const movieWithPoster = () => ({
  moduleMetadata,
  component: MovieDetailedInformationComponent,
  props: {
    baseUrlPoster: text('baseUrlPoster', 'https://image.tmdb.org/t/p/w500/'),
    onCloseClick: action('onCloseClick'),
    movie: object('movie', {
      "popularity": 246.384,
      "vote_count": 676,
      "video": false,
      "poster_path": "/bOKjzWDxiDkgEQznhzP4kdeAHNI.jpg",
      "id": 605116,
      "adult": false,
      "backdrop_path": "/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg",
      "original_language": "en",
      "original_title": "Project Power",
      "genre_ids": [
        28,
        80,
        878
      ],
      "title": "Project Power",
      "vote_average": 6.7,
      "overview": "An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.",
      "release_date": "2020-08-14",
      "_genres": [{id: 1, name: 'Gernre1'}, {id: 1, name: 'Gernre2'}]
    }),
  }
});

export const movieWithoutPoster = () => ({
  moduleMetadata,
  component: MovieDetailedInformationComponent,
  props: {
    baseUrlPoster: text('baseUrlPoster', 'https://image.tmdb.org/t/p/w500/'),
    onCloseClick: action('onCloseClick'),
    movie: object('movie', {
      "popularity": 246.384,
      "vote_count": 676,
      "video": false,
      "poster_path": null,
      "id": 605116,
      "adult": false,
      "backdrop_path": "/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg",
      "original_language": "en",
      "original_title": "Project Power",
      "genre_ids": [
        28,
        80,
        878
      ],
      "title": "Project Power",
      "vote_average": 6.7,
      "overview": "An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.",
      "release_date": "2020-08-14",
      "_genres": [{id: 1, name: 'Gernre1'}, {id: 1, name: 'Gernre2'}]
    }),
  }
});
