import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_HOST } from '../commons/url.constants';
import { User } from '../models/user';
import { map, delay, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public authenticate(user) {
    return this.http.post(API_HOST + '/login', user, { observe: 'response' })
      .pipe(
        map((data) => data.headers.get('authorization')),
        catchError(this.handleError<User>('authenticate'))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      console.warn(`${operation} failed: ${error.message}`)

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
