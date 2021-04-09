import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { Order } from '../models/order';
import { OrderLine } from '../models/order-line';
import { CustomerService } from '../services/customer.service';
import { DataService } from '../services/data.service';
import { OrderService } from '../services/order.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderLines: OrderLine[] = new Array();
  total : number = 0;
  customer : Customer;

  orderSubmitted : boolean;

  constructor(private dataService : DataService, private customerService : CustomerService, private tokenStorageService : TokenStorageService
    , private orderService : OrderService, private route : Router) { }

  ngOnInit(): void {
    this.orderSubmitted = false;

    var authUser  = this.tokenStorageService.getAuthenticatedUser()
    this.customerService.findCustomerByUsername(authUser).subscribe((data : Customer) => this.customer = data);

    this.orderLines = this.dataService.order.orderLines;
    this.orderLines.forEach(element => {
      this.total+= element.quantity * element.product.price;
    });
  }

  submitOrder(){
    if(this.orderLines != undefined && this.total != 0){
      var order : Order = new Order();
      order.orderLines = this.orderLines;
      order.total = this.total;
      order.customer = this.customer;

      //this.orderService.sentOrder(order).subscribe(response=> console.log(response));
      this.orderService.sentOrder(order).subscribe(response=> console.log(response));
      console.log(order);
      console.log("order successfully submitted!");
      this.dataService.order = new Order();
      this.orderSubmitted = true;
      //this.route.navigate(['home']);
    }
    console.log("orderLines is empty");
  }

  ngOnDestroy():void{
    console.log("ngOnDestroy gets called.");
  }



}
