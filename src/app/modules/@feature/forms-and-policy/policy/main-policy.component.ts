import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-policy',
  templateUrl: './main-policy.component.html',
  styleUrls: ['./main-policy.component.scss'],
})
export class MainPolicyComponent implements OnInit {
  public user: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
