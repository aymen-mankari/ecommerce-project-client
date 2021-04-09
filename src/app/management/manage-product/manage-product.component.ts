import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

declare const $: any;
@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  productForm: FormGroup;

  selectedFile: File;

  editProduct=new Product();

  /*retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;*/

  product;
  products: Product[];
  detailProduct = new Product();

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      reference: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stockQuantity: ['', Validators.required]
    });

    //Init products list
    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    }, error => console.error(error));
  }

  /*refreshListproducts() {
    this.productService.getAllProducts().subscribe(data => {
      console.log(data);
      this.products = data;
    }, error => console.error(error));
  }*/

  save() {

    this.product = this.productForm.value;
    console.log(this.product);

    const productData = new FormData();
    productData.append('image', this.selectedFile);
    //productData.append('product',this.product);
    productData.append('product', JSON.stringify(this.product));
    console.log(productData);

    this.productService.saveOrUpdateProduct(productData)
      .subscribe(response => {
        //this.refreshListproducts();
        this.productService.getAllProducts().subscribe(data => {
          console.log("refresh list products");
          console.log(data);
          this.products = data;
        }, error => console.error(error));
        console.log(response);
      },
        error => console.error(error));

    $('#saveProduct').modal('hide');
  }

  update(updatedProduct: Product) {
    console.log(updatedProduct);

    const updatedProductData = new FormData();
    if (this.selectedFile != null) {
      updatedProductData.append('image', this.selectedFile);
      updatedProductData.append('product', JSON.stringify(updatedProduct));
      this.productService.saveOrUpdateProduct(updatedProductData).subscribe(
        (response: Product) => {
          console.log(response);
          this.productService.getAllProducts().subscribe(data => this.products = data, error => console.error(error));
        },
        (error) => {
          alert(error.message);
        }
      );
    }else{
      console.error("No image selected !");
    }

    $('#editProduct').modal('hide');
  }

  onClickEdit(productToEdit: Product): void {
    console.log(productToEdit);
    this.editProduct = productToEdit;
  }

  onShowDetails(selectedProduct: Product) {
    console.log(selectedProduct);
    this.detailProduct = selectedProduct;
  }

  //Gets called when the user selects an image
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
}
