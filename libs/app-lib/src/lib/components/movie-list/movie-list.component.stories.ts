import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {boolean, number, object, text} from '@storybook/addon-knobs';

import {action} from '@storybook/addon-actions';

import {MovieListComponent} from './movie-list.component';

export default {
  title: 'MovieListComponent'
}

const moduleMetadata = {
  imports: [NgbModule],
}

const movieListData = [{
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
  "release_date": "2020-08-14"
},
  {
    "popularity": 171.505,
    "vote_count": 15,
    "video": false,
    "poster_path": "/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    "id": 577922,
    "adult": false,
    "backdrop_path": "/wzJRB4MKi3yK138bJyuL9nx47y6.jpg",
    "original_language": "en",
    "original_title": "Tenet",
    "genre_ids": [
      28,
      53
    ],
    "title": "Tenet",
    "vote_average": 6.2,
    "overview": "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    "release_date": "2020-08-22"
  },
  {
    "popularity": 139.38,
    "vote_count": 42,
    "video": false,
    "poster_path": "/eAUzmhP54bE1vPXaY7FbuZREJlR.jpg",
    "id": 594718,
    "adult": false,
    "backdrop_path": "/mBbA77FyzhU0Tz9tmbKG8heGmh3.jpg",
    "original_language": "ru",
    "original_title": "Спутник",
    "genre_ids": [
      18,
      27,
      878
    ],
    "title": "Sputnik",
    "vote_average": 6.4,
    "overview": "At the height of the Cold War, a Soviet spacecraft crash lands after a mission gone awry, leaving the commander as its only survivor. After a renowned Russian psychologist is brought in to evaluate the commander’s mental state, it becomes clear that something dangerous may have come back to Earth with him…",
    "release_date": "2020-07-14"
  }];

export const isLoaded = () => ({
  moduleMetadata,
  component: MovieListComponent,
  props: {
    onMovieClick: action('onMovieClick'),
    onPageChange: action('onPageChange'),
    onReloadList: action('onReloadList'),

    errorMessage: text('errorMessage', ''),
    isLoading: boolean('isLoading', false),

    page: number('page', 1),
    pageSize: number('pageSize', 5),
    paginationCollectionSize: number('paginationCollectionSize', 313),

    movieList: object('movieList', movieListData)
  }
})

export const isLoadedWithSelectedMovie = () => ({
  moduleMetadata,
  component: MovieListComponent,
  props: {
    onMovieClick: action('onMovieClick'),
    onPageChange: action('onPageChange'),
    onReloadList: action('onReloadList'),

    errorMessage: text('errorMessage', ''),
    isLoading: boolean('isLoading', false),

    page: number('page', 1),
    pageSize: number('pageSize', 5),
    paginationCollectionSize: number('paginationCollectionSize', 313),

    movieList: object('movieList', movieListData),
    selectedMovie: object('selectedMovie', movieListData[1])
  }
})

export const isLoading = () => ({
  moduleMetadata,
  component: MovieListComponent,
  props: {
    onMovieClick: action('onMovieClick'),
    onPageChange: action('onPageChange'),
    onReloadList: action('onReloadList'),

    errorMessage: text('errorMessage', ''),
    isLoading: boolean('isLoading', true),

    page: number('page', 1),
    pageSize: number('pageSize', 5),
    paginationCollectionSize: number('paginationCollectionSize', 313),

    movieList: object('movieList', movieListData)
  }
})

export const isError = () => ({
  moduleMetadata,
  component: MovieListComponent,
  props: {
    onMovieClick: action('onMovieClick'),
    onPageChange: action('onPageChange'),
    onReloadList: action('onReloadList'),

    errorMessage: text('errorMessage', 'Error'),
    isLoading: boolean('isLoading', false),

  }
})
