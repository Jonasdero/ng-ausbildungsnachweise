import { Component, OnInit } from '@angular/core';
import { AuthService, NotificationService } from '../../shared';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  constructor(private authService: AuthService, public afAuth: AngularFireAuth,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.authService.authChanged.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
    })
  }

  login() {
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.notificationService.warning('Ausgeloggt :)')
  }
}