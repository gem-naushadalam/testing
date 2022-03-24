import { Injectable } from '@angular/core';

import { Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToggleBtnService {
  public isOpen: boolean = true;

  constructor() {}

  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  setToggle(flag: boolean) {
    this.isOpen = flag;
  }
}
