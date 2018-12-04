import { Component, OnInit } from '@angular/core';
import { AuthService, NotificationService, SettingsService } from '../../shared';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  activateLogin: boolean = false;
  loggedIn: boolean = false;
  routes = [
    { text: 'Start', route: '', matIcon: 'home' },
    { text: 'Import & Export', route: '/importexport', matIcon: 'import_export' },
    { text: 'Zufällige Generierung', route: '/random-fill', matIcon: 'cached' },
    { text: 'Einstellungen', route: '/settings', matIcon: 'settings' },
    { text: 'Hilfe', route: '/help', matIcon: 'help' },
  ]
  constructor(private authService: AuthService, public afAuth: AngularFireAuth,
    private notificationService: NotificationService, public settingsService: SettingsService) { }

  ngOnInit() {
    this.activateLogin = this.authService.activateLogin;
    this.authService.authChanged.subscribe((loggedIn: boolean) => {
      this.activateLogin = this.authService.activateLogin;
      if (this.activateLogin)
        this.loggedIn = loggedIn;
      else this.loggedIn = true;
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