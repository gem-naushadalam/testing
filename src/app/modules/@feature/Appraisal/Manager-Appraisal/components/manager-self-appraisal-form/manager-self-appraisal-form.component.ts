import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-self-appraisal-form',
  templateUrl: './manager-self-appraisal-form.component.html',
  styleUrls: ['./manager-self-appraisal-form.component.scss']
})
export class ManagerSelfAppraisalFormComponent implements OnInit {

 
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue!: number;
  technical=true;
  behavioural = false;


  constructor() { }
  
  ngOnInit() {
  }
  
  countStar(star: number) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }
  Ontechnical()
  {
    this.technical = true;
    this.behavioural = false;

  }
  Onbehavioural()
  {
    this.technical=false;
    this.behavioural=true;
  }
}
