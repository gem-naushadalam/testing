import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { ToggleBtnService } from 'src/app/services/toggle-btn/toggle-btn.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
  login:boolean= false;
  constructor(
    private responsiveService: ResponsiveService,
    public toggleBtn: ToggleBtnService,
    private loaderService: LoaderService,
    public router:Router
  ) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.login= true;
        } else {
          this.login= false;
        }
      }
    });
  }

  ngOnInit() {
    this.responsiveService.checkWidth();
    this.responsiveService.isMobile.asObservable().subscribe(
      (isMobile: any) => {
        // this.sideBarIsOpened = !isMobile;
        this.toggleBtn.setToggle(!isMobile);
      },
      (err) => {
        // this.sideBarIsOpened = false;
        this.toggleBtn.setToggle(true);
      }
    );
    this.onResize();
  
  }
  onResize() {
    this.responsiveService.checkWidth();
  }

  // public toggleSideBar = () => {
  //   this.sideBarIsOpened = !this.sideBarIsOpened;
  // };
}
