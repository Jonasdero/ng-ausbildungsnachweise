import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  authChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid && res.emailVerified)
        this.loggedIn = true
      else this.loggedIn = false;
      this.authChanged.emit(this.loggedIn);
    })
  }
}