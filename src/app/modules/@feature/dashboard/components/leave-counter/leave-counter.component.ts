import { Component, OnInit } from '@angular/core';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';

@Component({
  selector: 'app-leave-counter',
  templateUrl: './leave-counter.component.html',
  styleUrls: ['./leave-counter.component.scss']
})
export class LeaveCounterComponent implements OnInit {
  totalleavebalance:any;
  LWP:any;
  WFH:any;
  CLOY:any;
  LNSA :any
  constructor(public leaveService:LeaveManagementService) { }

  ngOnInit(): void {
    // this.getLeaveBalance();
  }
  // getLeaveBalance(){   
  //   this.leaveService.getLeaveBalanceData().subscribe((data: any) => {
  //     this.totalleavebalance = data.object;
     
  //    this.LWP = this.totalleavebalance.LWP; 
  //    this.WFH = this.totalleavebalance.WFH;  
  //    this.LNSA = this.totalleavebalance.LNSA;  

  //    this.CLOY = this.totalleavebalance['5CLOY']; 
  //    if(this.CLOY == 1)
  //    {
  //      this.CLOY = 'Unavailable';
  //    } 
  //    else
  //    this.CLOY = 'Available'   

  //   })
  // }

}
