import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_HOST } from '../commons/url.constants';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  public createCustomer(customer) {
    return this.http.post(API_HOST + '/customer/create', customer, { observe: 'response' });
  }

  public findCustomerByUsername(username : string){
    return this.http.get(API_HOST + '/customer/findByUsername' + `/${username}`);
  }
}
