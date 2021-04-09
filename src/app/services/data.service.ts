import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { Order } from '../models/order';
import { OrderLine } from '../models/order-line';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //public orderLine : OrderLine[] = new Array();
  public order : Order = new Order();
  public customer : Customer = new Customer();

  constructor() { }
}
