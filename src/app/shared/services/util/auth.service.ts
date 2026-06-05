import { Injectable, EventEmitter } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { NotificationService } from '../components/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  activateLogin = false;
  loggedIn = true;
  authChanged: EventEmitter<boolean> = new EventEmitter();

  constructor(public auth: Auth, private notificationService: NotificationService) {
    if (!this.activateLogin) {
      this.loggedIn = true;
      this.authChanged.emit(this.loggedIn);
      return;
    }
    authState(this.auth).subscribe(res => {
      if (res && res.uid && res.emailVerified) {
        if (!this.loggedIn && this.activateLogin) {
          this.notificationService.info('Eingeloggt :)');
        }
        this.loggedIn = true;
      }
      else { this.loggedIn = false; }
      this.authChanged.emit(this.loggedIn);
    });
  }
}
