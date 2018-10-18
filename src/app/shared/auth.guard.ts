import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AuthService } from './services/util/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: Observable<firebase.User>;
  constructor(private router: Router, public afAuth: AngularFireAuth, private authService: AuthService) {
    this.user = afAuth.authState;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.activateLogin)
      return true;
    if (this.afAuth.auth.currentUser && this.afAuth.auth.currentUser.emailVerified) {
      return true;
    }
    // TODO: uncomment this
    // this.router.navigate(['']);
    return false;
  }
}
