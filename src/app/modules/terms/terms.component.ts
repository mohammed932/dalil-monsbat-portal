import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/services/utility.service';
import { HttpQuestionsService } from './terms.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {
  questions: any;
  constructor(
    private router: Router,
    private httpQuestionService: HttpQuestionsService,
  ) { }

  ngOnInit() {
    this.httpQuestionService.getQuestions().subscribe(data => {
      console.log(data);
      this.questions = data.body;
      console.log(this.questions)
    })
  }



}
