import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Order } from '../models/order';
import { OrderLine } from '../models/order-line';
import { Product } from '../models/product';
import { DataService } from '../services/data.service';
import { ProductService } from '../services/product.service';

declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  keyword = new FormControl('');

  total : number = 0;

  order: Order = new Order();
  orderLines: OrderLine[] = new Array();

  products: Product[];
  currentProduct = new Product();
  
  flagStock : boolean = false;

  constructor(private productService: ProductService, private dataService : DataService) { }

  ngOnInit(): void {
    this.flagStock = false;
    console.log(this.productService.getAllProducts().subscribe(data => console.log(data)), error => console.error(error));

    //Init products list
    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    }, error => console.error(error));
  }

  detailsProduct(product: Product) {
    this.currentProduct = product;
  }


  addToCart(product: Product){
    var currentOrderLine = new OrderLine();
    currentOrderLine.product = product;

    var index = this.dataService.order.orderLines.findIndex(e => e.product.idProduct == currentOrderLine.product.idProduct);
    if(index != -1){
      console.log("ALREADY EXIST");
      if(this.dataService.order.orderLines[index].product.stockQuantity>0){
        this.dataService.order.orderLines[index].quantity+= 1;
        this.dataService.order.orderLines[index].product.stockQuantity-= 1;
      }else{
        console.log("STOCK LIMIT");
        this.flagStock = true;
      }
    }else{
      console.log("NOT EXIST");
      currentOrderLine.quantity = 1;
      this.dataService.order.orderLines.push(currentOrderLine);
    }

    console.log(this.dataService.order.orderLines);
    console.log("finish");
  }

  sumbitForm() {
    $('#detailsProductModal').modal('hide');
  }

  searchByKeyword(){
    if(this.keyword.value != ""){
      this.productService.getProductsByKeyword(this.keyword.value).subscribe((data => this.products = data));
    }else{
      this.productService.getAllProducts().subscribe(data => this.products = data);
    }
    console.log("the search box is empty");
  }

}
