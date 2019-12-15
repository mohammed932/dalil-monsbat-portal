import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { HttpResponse } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, tap, finalize } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { HttpCategoryService } from 'src/app/shared/services/categories.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: any[];
  loading = true;

  sName = false;
  sCnumber = false;
  sMnumber = false;


  constructor(
    private httpUsersService: UsersService,
    private httpCategoryService: HttpCategoryService

    ) { }

  ngOnInit() {
  
  }




}
