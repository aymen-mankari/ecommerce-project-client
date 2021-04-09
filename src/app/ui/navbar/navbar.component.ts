import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { UserService } from 'src/app/services/user.service';
//import { IS_ADMIN } from '../../commons/url.constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user :User=new User();

  constructor(private tokenStorageService: TokenStorageService, private route: Router, private userService : UserService) { }

  ngOnInit(): void {
    var authUser  = this.tokenStorageService.getAuthenticatedUser();

    if(authUser!=null){
      this.userService.findByUsername(authUser).subscribe((data:User) => {
        this.user = data;
        console.log(this.user);
      });
    }else{
      this.tokenStorageService.signOut();
      this.route.navigate(['']);
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    this.route.navigate(['']);
  }
}
