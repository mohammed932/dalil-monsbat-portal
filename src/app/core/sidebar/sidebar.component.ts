import { Component, OnInit, Input, ElementRef, Renderer, HostListener } from '@angular/core';
import { MyHttpInterceptor } from '../interceptor/my-http-interceptor';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLoggedOut$ = this.authService.isLogoutState$;
  token = this.authService.getToken();
  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private httpIntercetor: MyHttpInterceptor,
    public authService: AuthService,
    private languageService: LanguageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  @HostListener('click', ['$event.target'])
  onClick(target) {
    let item = this.el.nativeElement.querySelector('li');
  }

  switchLang() {
    const language = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    let changeLanguage = language === 'en' ? 'ar' : 'en';
    this.languageService.changeAppLanguage(changeLanguage);
  }

  logOut() {
    this.authService.logout();
  }




}
