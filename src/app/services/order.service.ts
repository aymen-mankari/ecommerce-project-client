import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_HOST } from '../commons/url.constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public sentOrder(order) {
    return this.http.post(API_HOST + '/order/create', order);
  }
}
