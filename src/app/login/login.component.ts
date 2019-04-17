import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { FacebookLoginProvider,} from 'angular-6-social-login';
import * as firebase from 'firebase/app'
import {AngularFireAuth} from '@angular/fire/auth';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  form;

  constructor(private fb: FormBuilder, private myRoute: Router,
    private auth: AuthService, public afAuth: AngularFireAuth) {
     this.form = fb.group ({
       email: ['', [Validators.required, Validators.email]],
       password: ['', Validators.required]
     });
     }

  ngOnInit() {
  }

  login() {
    this.auth.doLogin(this.form.value)
    .then(res => {
      this.myRoute.navigate(['Artist']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    }) 
  };
  
  tryFacebookLogin(){
    this.auth.doFacebookLogin()
    .then(res => {
      this.myRoute.navigate(['Artist']);
    })
  }
  tryGoogleLogin(){
    this.auth.doGoogleLogin()
    .then(res => {
      this.myRoute.navigate(['Artist']);
    })
  }
  

}
  


