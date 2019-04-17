import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { from } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email: string;
  pwd: string;
  name: string;
  description: string;

  constructor(private auth: AuthService, private myRoute: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth.signup(this.email, this.pwd, this.name);
    console.log(this.email);
    console.log(this.pwd);
  }

  tryFacebookLogin(){
    this.auth.doFacebookLogin()
    .then(res => {
      this.myRoute.navigate(['home-page']);
    })
  }
  // //Calls doTwitterLogin from AuthService
  tryTwitterLogin(){
    this.auth.doTwitterLogin()
    .then(res => {
      this.myRoute.navigate(['home-page']);
    })
  }
  //Calls doGoogleLogin from AuthService
  tryGoogleLogin(){
    this.auth.doGoogleLogin()
    .then(res => {
      this.myRoute.navigate(['home-page']);
    })
  }
  //Calls doGithublogin from AuthService
  tryGitubLogin(){
    this.auth.doGithubLogin()
    .then(res => {
      this.myRoute.navigate(['home-page']);
    })
  }
}
