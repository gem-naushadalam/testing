import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.scss']
})
export class AppraisalComponent implements OnInit {
user:boolean = true;
  constructor() { }

  ngOnInit(): void {
    console.log(this.user)
  }

}
