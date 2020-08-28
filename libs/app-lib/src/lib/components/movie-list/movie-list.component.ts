import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MovieListEntity} from "../../services/tmdb.resource.models";
import {MovieListEntityWithGenreNames} from "../../+state/movie-list/movie-list.models";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent {
  @Input() isLoading: boolean;
  @Input() errorMessage: string;
  @Input() movieList: MovieListEntity[];
  @Input() selectedMovie: MovieListEntityWithGenreNames;

  @Input() page: number;
  @Input() pageSize: number;
  @Input() paginationCollectionSize: number;

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onMovieClick = new EventEmitter<number>();
  @Output() onReloadList = new EventEmitter<number>();

  constructor() {
  }

  public trackByFnMovieList(index, item) {
    return item.id;
  }
}
