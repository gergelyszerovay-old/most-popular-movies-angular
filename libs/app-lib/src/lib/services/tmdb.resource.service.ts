import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbResourceService {

  constructor(private http: HttpClient) {
  }

  getMovieList(page: number): Observable<any> {
    return this.http.get(`${environment.tmdbBaseUrlApi}discover/movie?page=${page}&api_key=${environment.tmdbApiKey}&language=en-US&sort_by=popularity.desc`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    });
  }

  getMovieGenres(): Observable<any> {
    return this.http.get(`${environment.tmdbBaseUrlApi}genre/movie/list?api_key=${environment.tmdbApiKey}&language=en-US`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    });
  }
}
