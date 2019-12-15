import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../modules/auth/service/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  _opened: boolean = false;
  menuState: String = 'out';
  logoutState$ = this.authService.isLogoutState$;
  userStateLocalStorage: boolean;
  isLoggedIn = localStorage.getItem("isLogin")
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkUserState();
  }

  checkUserState() {
    console.log(typeof this.isLoggedIn);
    if (this.isLoggedIn === 'true') {
      this.userStateLocalStorage = true;
      return;
    }
    this.userStateLocalStorage = false;
  }


  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  onClickedOutside(e: Event) {
    if (this.menuState === 'in') {
      this.menuState = 'out';
    }
  }

  logout() {
    this.authService.isLogoutSubject.next(true);
    this.authService.logout();
  }

}
