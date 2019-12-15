import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {
  @Input() imgSrc;
  @Input() categoryTitle;
  @Input() tag
  constructor() { }

  ngOnInit() {
  }

}
