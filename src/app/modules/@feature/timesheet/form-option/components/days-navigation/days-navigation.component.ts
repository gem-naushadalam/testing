import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-days-navigation',
  templateUrl: './days-navigation.component.html',
  styleUrls: ['./days-navigation.component.scss'],
})
export class DaysNavigationComponent implements OnInit {
  dayLists = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  selectedDay: any;

  constructor() {}

  ngOnInit(): void {
    this.selectedDay = this.dayLists[0];
  }

  openFormField(dayList: any) {
    this.selectedDay = dayList;
  }
}
