import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import * as firebase from 'firebase/';
import {AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import {User} from '../models/user';
import {switchMap,} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  loggedInStatus: boolean = false;
  user: Observable<User>;


  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, private notifier: NotificationService, private afs: AngularFirestore) {
    this.user = this._firebaseAuth.authState
    .pipe(switchMap(user => {
      if(user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
      } else{
        return of(null)
      }
    }))
  }

  signup(email: string, password: string, username: string) {
    // clear all messages
    this.notifier.display(false, '');
    this._firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.sendEmailVerification();
        const message = 'A verification email has been sent, please check your email and follow the steps!';
        this.notifier.display(true, message);
        return this.setUserDoc(user.user, email, username)
          .then(() => {
            firebase.auth().signOut();
            this.router.navigate(['login']);
          });
      })
      .catch(err => {
        console.log(err);
        this.notifier.display(true, err.message);
      });
  }

  private setUserDoc(user, email, username){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
     username: username,
     
     
    

    }
    return userRef.set(JSON.parse(JSON.stringify(data)))
  
  }

  sendEmailVerification() {
    this._firebaseAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        });
    });
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this._firebaseAuth.auth.signOut()
        resolve();
      }
      else{
        reject();
      }
      this.loggedInStatus = false;

    });
  }

  isLoggedIn():boolean {
      return this.loggedInStatus;
  }
  doFacebookLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this._firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => {
        console.log(err);
        reject(err);
      
      })
    })
  }

  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this._firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  doTwitterLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this._firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => {
        console.log(err);
        reject(err);
      
      })
    })
  }

  doGithubLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GithubAuthProvider();
      this._firebaseAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
        this.loggedInStatus = true;
      }, err => {
        console.log(err);
        reject(err);
      
      })
    })
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }

}