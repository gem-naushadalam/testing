import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appraisal-achievements',
  templateUrl: './appraisal-achievements.component.html',
  styleUrls: ['./appraisal-achievements.component.scss'],
})
export class AppraisalAchievementsComponent implements OnInit {
  // isValid: boolean = true;

  containers: any = [];

  constructor() {}

  ngOnInit(): void {}

  // btnClick = () => {
  //   this.isValid = !this.isValid;
  // };

  add() {
    this.containers.push({ value: '', edit: true });
    console.log(this.containers);
  }

  toggleEdit = (idx: number) => {
    this.containers[idx].edit = !this.containers[idx].edit;
  };
}
