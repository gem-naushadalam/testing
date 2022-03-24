import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-review-form',
  templateUrl: './manager-review-form.component.html',
  styleUrls: ['./manager-review-form.component.scss']
})
export class ManagerReviewFormComponent implements OnInit {
  isDisable: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  changeEvent = (event: any) => {
    if (event.target.checked) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  };

}
