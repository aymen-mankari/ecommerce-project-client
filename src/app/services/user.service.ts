import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_HOST } from '../commons/url.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public findByUsername(username) {
    return this.http.get(API_HOST + '/users/getUserByUsername'+ `/${username}`);
  }
}
