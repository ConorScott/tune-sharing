import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() sidenavClose = new EventEmitter();

  opened: boolean;
  isLoggedIn: boolean;

  constructor(private route: Router, private auth: AuthService) { }

  userLoggedIn(): boolean {
    this.isLoggedIn = this.auth.isLoggedIn();
    return this.isLoggedIn
  }

  onLogout() {
    this.auth.doLogout();
    this.isLoggedIn = this.auth.isLoggedIn();
    this.route.navigate(["/login"]);
  }
   

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
