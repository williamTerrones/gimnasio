import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user:firebase.User;
  cargando:boolean = true;

  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.user.subscribe(user => {
      this.cargando = false;
      this.user = user;
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  login(email:string, password:string){
    this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }
}
