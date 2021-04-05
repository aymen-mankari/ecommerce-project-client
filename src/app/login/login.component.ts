import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Customer } from '../models/customer';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

import { CITIES } from '../commons/url.constants';
import { CustomerService } from '../services/customer.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  user: User;
  customer = Customer;
  cities = CITIES;

  constructor(private formBuilder: FormBuilder, private route: Router, private loginService: LoginService,
    private customerService: CustomerService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required],
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
        this.route.navigate(['home']);
      }, error => console.warn(error));

    /*this.loginService.authenticate(this.user)
      .subscribe(resp => {
        let authorization = resp.headers.get('authorization');
        console.warn(authorization);
        this.tokenStorageService.saveToken(authorization, this.user.username);
        this.route.navigate(['main']);

      }, error => console.warn(error));*/
  }

  register() {

    this.customer = this.registerForm.value;

    console.log(this.customer);
    if (this.customer != null) {
        this.customerService.createCustomer(this.customer).subscribe(data => { console.log(data) }, error => console.warn(error));
    }
    //$('#element').modal('hide');
    //$('#register').modal('hide');
  }

}
