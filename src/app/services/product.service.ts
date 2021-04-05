import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_HOST } from '../commons/url.constants';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /*public getAll() {
    return this.http.get(API_HOST + '/product/getAll');
  }*/

  //private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //'Content-Type': 
  private headers = new HttpHeaders({ 'Content-Type': 'undefined' });

  saveProduct(product) {
    return this.http.post(API_HOST + '/product/create', product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_HOST+ '/product/getAll');
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(API_HOST + '/product/getOne'+ `/${id}`);
  }

  updateProduct(updatedProduct): Observable<Product> {
    return this.http.put<Product>(API_HOST + '/product/update', updatedProduct);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(API_HOST + '/product/delete' + `/${id}`);
  }

  getProductsByKeyword(keyword : string) : Observable<Product[]>{
    return this.http.get<Product[]>(API_HOST + '/product/search' +  `/${keyword}`);
  } 
}
