import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronDown, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';

@Component({
  selector: 'app-employee-status',
  templateUrl: './employee-status.component.html',
  styleUrls: ['./employee-status.component.scss'],
})
export class EmployeeStatusComponent implements OnInit {
  faChevronDown = faChevronDown;
  faCoffee = faCoffee;
  totalleavebalance:any;
  CL:any;
  PL:any;
  COFF:any;
  total:any;
  constructor(private leaveService:LeaveManagementService,public router :Router) {}

  ngOnInit(): void {
    // this.getLeaveBalance();
  }
  // getLeaveBalance(){   
  //   console.log('...................................................................sssss')
  //   this.leaveService.getLeaveBalanceData().subscribe((data: any) => {
  //     this.totalleavebalance = data.object;
  //   console.log('....serviceeeeeeeeeeeeeeeeeeeee................sssss')

  //     console.log(this.totalleavebalance);
  //     console.log(data);
     
  //       this.CL = this.totalleavebalance.CL;
  //       this.PL = this.totalleavebalance.PL;
  //       this.COFF = this.totalleavebalance.CompOff;
  //       console.log(this.CL,this.PL);     
  //       this.total = this.CL+this.PL+this.COFF; 

      
     
  //     // ChangeDetectorRef.detectChanges();

  //   })
  // }
  navigateLeave(){
    this.router.navigate(['/leave'])
  }

  // btnClick = () => {
  //   this.router.navigate(['leave']);
  // };
}
