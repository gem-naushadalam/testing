import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import {
  faBell,
  faChevronDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToggleBtnService } from 'src/app/services/toggle-btn/toggle-btn.service';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../@feature/forms-and-policy/dialog/dialog.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faBell = faBell;
  Head :string = "";
  faChevronDown = faChevronDown;
  public isMobile!: Boolean;
  public imgSrc!: '../../../../../../../assets/img//Group 28.png';
  public toggle!: any;
  public user: any;
  name: any;

  constructor(
    private responsiveService: ResponsiveService,
    private router: Router,
    private route: ActivatedRoute,
    private toggleButton: ToggleBtnService,
    public userdetails: EmployeeDirectoryService,
    private dialog: MatDialog,
    public dialogservice: DialogService,
    public authService:MsalService
  ) {
    this.toggle = this.toggleButton.isOpen;
    let finalKey : any;
    for(let key in localStorage){
      if(key.includes('login.windows.net-b9806c7d-9280-4e44-afea-6dc0ff495c2f'))
      {
        finalKey = key;
        break;
      }
    }
    this.user = JSON.parse(`${localStorage.getItem(finalKey)}`);
    console.log(this.user);
    this.name = this.user.name;
  }

  ngOnInit() {
    this.onResize();
    this.responsiveService.checkWidth();
    // this.getUserDetails();
  }
  onResize() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      // console.log(isMobile);
      //  if(isMobile == true)
      //  this.toggleBtn();
      //  console.log(isMobile);
      this.isMobile = isMobile;
    });
  }
  // getUserDetails(){
  //   this.userdetails.getEmployeeDetailsBymail(this.user.email).subscribe((data:any)=>{
  //     console.log(data);
  //     this.name = data.firstname;

  //   })
  // }

  // @Output() toggle: EventEmitter<null> = new EventEmitter();

  toggleBtn = () => {
    // this.toggle.emit();
    this.toggleButton.toggle();
  };
  openLogout() {
    // console.log(templateRef);
    // let dialogRef = this.dialog.open(DialogComponent, {
    //   width: '280px',
    //   height: '140px',
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    this.dialogservice
      .openConfirmDialog('Are you sure you want to Logout?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.signOut();
        }
      });
  }

  signOut(): void {
      this.authService.logout();
    
  }

  isHeaderSlim() {

    if(this.router.url === '/EmployeeDirectory')
    {
     this.Head = "EMPLOYEE DIRECTORY"
    }
    if(this.router.url === '/leave')
    {
      this.Head = "LEAVES"
    }
    if(this.router.url === '/reimbursement')
    {
      this.Head = "REIMBURSEMENT"
    }
    if(this.router.url === '/')
    {
      this.Head = "DASHBOARD"
      return false;
    }
    if(this.router.url === '/timesheet')
    {
      this.Head = "TIMESHEET"
    }
    if(this.router.url === '/appraisal' || this.router.url === '/goals' || this.router.url === '/appraisal-settings')
    {
      this.Head = "Appraisal"
    }
    if(this.router.url.indexOf('/project-management')> -1)
    {
      this.Head = "PROJECT MANAGEMENT"
    }
    if(this.router.url === '/forms-and-policy')
    {
      this.Head = "FORMS & POLICY"
    }
    if (
      this.router.url === '/'
    ) {
      return true;
    } else {
      return false;
    }

  }
}
