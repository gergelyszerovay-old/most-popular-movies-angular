import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MovieListEntityWithGenreNames} from "../../+state/movie-list/movie-list.models";

@Component({
  selector: 'app-movie-detailed-information',
  templateUrl: './movie-detailed-information.component.html',
  styleUrls: ['./movie-detailed-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailedInformationComponent {
  @Input() movie: MovieListEntityWithGenreNames;
  @Input() baseUrlPoster: string;
  @Output() onCloseClick = new EventEmitter<void>();

  constructor() {
  }

  public trackByFnGenreList(index, item) {
    return item.id;
  }
}
