import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forms-and-policy',
  templateUrl: './forms-and-policy.component.html',
  styleUrls: ['./forms-and-policy.component.scss'],
})
export class FormsAndPolicyComponent implements OnInit {
  menuLists = ['Forms', 'Policy'];
  selectedList: any;
  constructor() {}

  ngOnInit(): void {
    this.selectedList = this.menuLists[0];
  }

  openMenuList(menuList: any) {
    this.selectedList = menuList;
  }
}
