import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  public isMobile = new Subject();
  public screenWidth!: string;

  constructor() {
    this.checkWidth();
  
  }

  onMobileChange(status: boolean) {
    // console.log(this.screenWidth);
    // console.log(this.isMobile.next(status));
    this.isMobile.next(status);
  }

  getMobileStatus(): Observable<any> {
    // console.log(this.screenWidth);
    // console.log(this.isMobile.asObservable());
    return this.isMobile.asObservable();
  }

  public checkWidth() {
    var width = window.innerWidth;
    // console.log(width);
    if (width <= 900) {
      this.screenWidth = 'xs';
      this.onMobileChange(true);
    // } else if (width > 768 && width <= 992) {
    //   this.screenWidth = 'md';
    //   this.onMobileChange(true);
    } else {
      this.screenWidth = 'lg';
      this.onMobileChange(false);
    }
  }
}
