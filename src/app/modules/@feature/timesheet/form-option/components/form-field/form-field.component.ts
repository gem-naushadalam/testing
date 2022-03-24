import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor() {}

  ngOnInit(): void {}
}
