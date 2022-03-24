import { Component, OnInit, Input } from '@angular/core';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
// import {RouterLink}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  faChevronRight = faChevronRight;
  geminiLogo = '.';
  // misLogo = '../../../../ass';
  activeIndex: any = 1;

  isActiveProject: boolean = false;
  // user: string | null;
   public user!: any;
   profileImageUrl:any;
   Name:any;
   Designation:any;
  constructor(private router: Router, private route: ActivatedRoute ,public userdetails:EmployeeDirectoryService) {
    console.log(localStorage);
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
    this.Name = this.user.name;
    this.userdetails.getEmployeeDetailsBymailId(this.user.username).subscribe((data:any) => {
      console.log(data);
      this.Designation = data.object.designation;
      this.profileImageUrl = data.object.imagePath;
      localStorage.setItem('userId',data.object.empId);
      localStorage.setItem('profileImage', data.object.imagePath);

    })

  }
  ngOnInit(): void {
    this.profileImageUrl =  localStorage.getItem('profileImage');
  }

  activeProject() {
    this.isActiveProject = true;
  }

  onLogoClick() {
    this.router.navigate([''], { relativeTo: this.route });
  }

  setActiveIndex(index: any) {
    this.activeIndex = index;
  }
}
