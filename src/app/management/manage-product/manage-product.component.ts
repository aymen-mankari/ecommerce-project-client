import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  productForm: FormGroup;

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

  product;
  products;

  editProduct :Product = new Product();

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stockQuantity: ['', Validators.required]
    });

    this.productService.getAllProducts().subscribe(data =>{
      console.log(data);
      this.products = data;
    } , error => console.error(error));
  }

  //Gets called when the user selects an image
  public onFileChanged(event) {
    //Select the current file
    this.selectedFile = event.target.files[0];
  }

  save() {
    this.product = this.productForm.value;
    console.log(this.product);

    const productData = new FormData();
    productData.append('image', this.selectedFile);
    //productData.append('product',this.product);
    productData.append('product', JSON.stringify(this.product));
    console.log(productData);

    this.productService.saveProduct(productData)
      .subscribe(response => console.log(response),
        error => console.error(error));
  }

  onRowClick(id){
    console.log(id);
  }

  public onClickEdit(product: Product): void {
    console.log(product);
    this.editProduct = product;
    /*this.productService.updateProduct(product).subscribe(
      (response: Product) => {
        console.log(response);
        //this.getEmployees();
      },
      (error) => {
        alert(error.message);
      }
    );*/
  }

  update(){
    console.log(this.editProduct);

    const updatedProductData = new FormData();
    if(this.selectedFile!=null){
      updatedProductData.append('image', this.selectedFile);
    }
    updatedProductData.append('product', JSON.stringify(this.editProduct));

    /*this.productService.updateProduct(updatedProductData).subscribe(
      (response: Product) => {
        console.log(response);
        //this.getEmployees();
      },
      (error) => {
        alert(error.message);
      }
    );*/
  }
}
