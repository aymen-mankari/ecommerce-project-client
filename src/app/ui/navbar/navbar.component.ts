import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
//import { IS_ADMIN } from '../../commons/url.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService, private route: Router) { }
  isAdmin : boolean = false;

  ngOnInit(): void {
  }
  logout() {
    this.tokenStorageService.signOut();
    this.route.navigate(['']);
  }
}
