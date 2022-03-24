import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit {
  isDisable: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  changeEvent = (event: any) => {
    if (event.target.checked) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  };
}
