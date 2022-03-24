import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // sideBarIsOpened = false;
  constructor() {}

  ngOnInit(): void {
    // this.sideBarIsOpened = false;
  }

  // public toggleSideBar = () => {
  //   this.sideBarIsOpened = !this.sideBarIsOpened;
  // }
}
