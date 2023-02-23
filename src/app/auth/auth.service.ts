import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authChange = new Subject<boolean>();
  isAuthDone: boolean = false;

  constructor(
    private router: Router,
    private authentication: AngularFireAuth,
    private snackbar: MatSnackBar,
    private uiService: UiService
  ) {}

  initAuthListener() {
    this.authentication.authState.subscribe(
      (user) => {
        if (user) {
          this.authChange.next(true);
          this.isAuthDone = true;
          this.router.navigate(['/training']);
        } else {
          this.isAuthDone = false;
          this.authChange.next(false);
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingSpinnerChange.next(true);
    this.authentication
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingSpinnerChange.next(false);
      })
      .catch((error) => {
        this.uiService.loadingSpinnerChange.next(false);
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingSpinnerChange.next(true);
    this.authentication
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((user) => {
        this.uiService.loadingSpinnerChange.next(false);
      })
      .catch((error) => {
        this.uiService.loadingSpinnerChange.next(false);

        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.authentication.signOut();
  }

  isAuth() {
    return this.isAuthDone;
  }
}
