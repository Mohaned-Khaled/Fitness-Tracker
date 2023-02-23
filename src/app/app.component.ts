import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showSideNav: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.initAuthListener();
    console.log(this.replaceDigits('a1c1e1'));
  }

  replaceDigits(s: string) {
    let myNewString = '';
    for (let i = 0; i < s.length; i++) {
      if (Number.isFinite(+s[i])) {
        const newASCII = s[i - 1].charCodeAt(0);
        myNewString += String.fromCharCode(+newASCII + +s[i]);
      } else {
        myNewString += s[i];
      }
    }

    return myNewString;
  }
}
