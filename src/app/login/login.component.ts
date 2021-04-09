import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Customer } from '../models/customer';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

import { CITIES } from '../commons/url.constants';
import { CustomerService } from '../services/customer.service';
import { UserService } from '../services/user.service';

declare const $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  user: User;
  customer: Customer = new Customer();
  
  cities = CITIES;

  constructor(private formBuilder: FormBuilder, private route: Router, private loginService: LoginService,
    private customerService: CustomerService, private tokenStorageService: TokenStorageService,private userService : UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      user : this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      }),
      fullName: ['', Validators.required],
      emailAddress: ['', Validators.required],
      phone: ['', Validators.required],
      city: ['', Validators.required]
    })
  }

  login() {
    this.user = this.loginForm.value;

    this.loginService.authenticate(this.user)
      .subscribe((authorization: string) => {

        if(authorization==null){
          console.log("NOT AUTHORIZED")
          this.route.navigate(['']);
          return;
        }
        console.log("authorization key : " + authorization);
        this.tokenStorageService.saveToken(authorization, this.user.username);
        
        this.userService.findByUsername(this.user.username).subscribe((user:User) => {
          if(!user.admin){
            this.route.navigate(['home']);
          }else{
            this.route.navigate(['admin/product']);
          }
        });

      }, error => console.warn(error));

  }

  register() {

    this.customer = this.registerForm.value;
    console.log(this.customer);


    if (this.customer != null) {
        this.customerService.createCustomer(this.customer).subscribe(data => { console.log(data) }, error => console.warn(error));
    }

    this.registerForm.reset();
    $('#register').modal('hide');
  }

}
