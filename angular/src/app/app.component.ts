import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./_services/auth.service";
import {UserService} from "./_services/user.service";
import {first} from "rxjs/operators";
import {Role} from "./_models/role";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser;
  private initials;
  private bgColor;

  constructor(  private router: Router,
                private authService: AuthService,
                private userService: UserService
  ) {
    this.authService.currentUser.subscribe(x => {
      this.currentUser = x;
    });

  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  get isUser() {

    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
