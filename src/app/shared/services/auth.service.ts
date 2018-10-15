import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: boolean = false;
  authChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(public afAuth: AngularFireAuth, private notificationService: NotificationService) {
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid && res.emailVerified) {
        if (!this.loggedIn)
          this.notificationService.info('Eingeloggt :)');
        this.loggedIn = true;
      }
      else this.loggedIn = false;
      this.authChanged.emit(this.loggedIn);
    })
  }
}