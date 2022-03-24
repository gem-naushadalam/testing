import {
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeDirectoryService } from './services/employee-directory/employee-directory.service';
import { LoaderService } from './services/loader/loader.service';
import { ResponsiveService } from './services/responsive/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MIS';
  login: boolean = false;
  mediaSub!: Subscription;
  deviceXs!: boolean;
  showShared: boolean = false;
  showLoader = false;
  employeesData: any;

  constructor(
    public router: Router,
    private responsiveService: ResponsiveService,
    private loaderService: LoaderService,
    public empService: EmployeeDirectoryService
  ) {
    this.loaderService.getLoader().subscribe((res) => {
      this.showLoader = res;
    });
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.login = true;
        } else {
          this.login = false;
        }
      }
    });  
  }

  ngOnInit() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
    });
    this.onResize();
  }

  onResize() {
    this.responsiveService.checkWidth();
  }
}
