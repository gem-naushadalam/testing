import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';
import { LeaveRequestComponent } from '../leave-request/leave-request.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  CL :any;
  PL :any;
  COFF :any;
  picker!: MatDateRangePicker<Date>;

  public leaveBalance = [];

  menuLists = ['Leave', 'WFH', 'Comp Off', 'Out Duty', 'LNSA'];
  selectedList: any;
  totalleavebalance:any;
  constructor(public leaveService: LeaveManagementService) {}

  ngOnInit(): void {
    this.selectedList = this.menuLists[0];
    this.getLeaveBalance();
    }

  getLeaveBalance(){   
    this.leaveService.getLeaveBalanceData().subscribe((data: any) => {
      this.totalleavebalance = data.object;
        this.CL = this.totalleavebalance.CL;
        this.PL = this.totalleavebalance.PL;
        this.COFF = this.totalleavebalance.CompOff;   
    })
  }
  changeLeaveValues(event:any){
    console.log(event);
    this.CL = event.object.CL;
    this.PL = event.object.PL;
    this.COFF = event.object.CompOff;
  }

  openMenuList(menuList: any) {
    this.selectedList = menuList;
  }


}