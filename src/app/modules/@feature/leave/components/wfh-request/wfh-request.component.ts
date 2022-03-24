import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  DateRange, DefaultMatCalendarRangeStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY, MatCalendar, MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import * as moment from 'moment';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';


@Component({
  selector: 'app-wfh-request',
  templateUrl: './wfh-request.component.html',
  styleUrls: ['./wfh-request.component.scss'],
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: DefaultMatCalendarRangeStrategy
  }]
})
export class WfhRequestComponent implements OnInit {
  @ViewChild(MatCalendar)
  calendar!: MatCalendar<Date>;
  submitWfh!: FormGroup;

  datesToHighlight = ["2021/01/26", "2021/03/29", "2021/04/02", "2021/05/14", "2021/06/06", "2021/08/15", "2021/08/22", "2021/08/30", "2021/10/02", "2021/10/15", "2021/11/04", "2021/11/05", "2021/11/19", "2021/12/25"];

  @Input() selectedRangeValue: DateRange<Date> = new DateRange(new Date(), new Date());
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  numofDates: number = 1;
  userId:any = localStorage.getItem('userId');
  leave_history: boolean = true;
  review_status: boolean = false;
  displayedColumns!: { key: string; header: string; }[];
  tableData: any;
  reviewdisplayedColumns!: { key: string; header: string; }[];
  reviewData: any;
  today = new Date();
  startDate = new Date(this.today.getFullYear(),this.today.getMonth() -1,1);
  constructor(public fb: FormBuilder, public datePipe: DatePipe, public leave: LeaveManagementService, public toastrServiceService: ToastrServiceService, public dialogservice: DialogService) { }
  ngOnInit(): void {
    this.submitWfh = this.fb.group({
      mobileNumber: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      reason: ['', [Validators.required]]
    })
    this.getWFH();
    this.getreviewWFH();

    this.displayedColumns = [
      {
        key: 'i+1',
        header: 'S.No'
      },
      {
        key: 'period',
        header: 'Period'
      },
      {
        key: 'leaveCombination',
        header: 'Type'
      },
      {
        key: 'reason',
        header: 'reason'
      },
      {
        key: 'approverRemarks',
        header: 'remark'
      },
      {
        key: 'status',
        header: 'status'
      },
      {
        key: 'appliedOn',
        header: 'applied On'

      },
      {
        key: 'action',
        header: 'action'
      }
    ]
    this.reviewdisplayedColumns = [
      {
        key: 'name',
        header: 'Employee Name'
      },

      {
        key: 'period',
        header: 'Period'
      },
      {
        key: 'leaveCombination',
        header: 'Type'
      },
      {
        key: 'reason',
        header: 'reason'
      },
      {
        key: 'status',
        header: 'status'
      },
      {
        key: 'appliedOn',
        header: 'applied On'

      },
      {
        key: 'action',
        header: 'action'
      }
    ]

  }
  delete(event: any) {
    this.dialogservice
      .openConfirmDialog('Are you sure you want to delete this form?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {

          const id = event.element.leaveRequestApplicationId;
          let params = new HttpParams();
          params = params.set('currentId', this.userId);
          params = params.set('leaveRequestApplicationId', id);
          this.leave.deleteleave(params).subscribe(
            (data) => {

              this.toastrServiceService.showSuccess(
                'WFH Deleted Successfully !!'
              );
              this.getWFH();
              this.getreviewWFH();
            },
            (error) => {
              console.log(error)
              this.toastrServiceService.showError(
                error.error.object, 'Error'
              )
            }
          );
        }
      });
  }
  history() {
    this.leave_history = true;
    this.review_status = false;
  }
  status() {
    this.review_status = true;
    this.leave_history = false;
  }
  onPostWfh() {
    const dto = {
      alternativeContactNo: this.submitWfh.get('mobileNumber')?.value,
      availableOnEmail: true,
      availableOnMobile: true,
      currentId: this.userId,
      firstDayHalfDay: false,
      fromDate: this.datePipe.transform(this.selectedRangeValue.start, "YYYY-MM-dd") as string,
      halfDayLeave: false,
      lastDayHalfDay: false,
      leaveMapping: {
        "WFH": this.numofDates
      },
      noOfTotalDays: this.numofDates,
      reason: this.submitWfh.get('reason')?.value,
      tillDate: this.datePipe.transform(this.selectedRangeValue.end, "YYYY-MM-dd") as string,
      userId: this.userId

    }
    this.leave.postLeave(dto).subscribe(() => {
      this.toastrServiceService.showSuccess(
        'WFH Applied Successfully !!'
      );
      this.reset();
      this.getWFH();
      this.getreviewWFH();

    },
      (error) => {
        console.log(error)
        this.toastrServiceService.showError(
          error.error.object, 'Error'
        )
        this.reset();
      }
    )
  }
  getWFH() {
    this.leave.getWFH().subscribe((data: any) => {
      this.tableData = data.object;

    })
  }
  getreviewWFH(){
    this.leave.getreviewWFH().subscribe((data: any) => {
      this.reviewData = data.object;

    })

  }
  reset() {
    this.selectedRangeValue = new DateRange<Date>(new Date(), new Date());
    this.submitWfh.reset();
    this.submitWfh.controls.controlName?.clearValidators();
    this.submitWfh.controls.controlName?.updateValueAndValidity();
    this.numofDates = 1;
  }
  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight
        .map((strDate) => new Date(strDate))
        .some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );

      return highlightDate ? 'special-date' : '';
    };
  }
  filterDates = (d: Date): boolean => {
    const today = new Date();
    console.log(today.getDate());
    if(today.getDate() >= 25){
      const date25 = new Date(today.getFullYear(), today.getMonth(), 24);
      return d.getTime() > date25.getTime() ? true : false;
    } 
   else{
     const date25 = new Date(today.getFullYear(), today.getMonth()-1, 24);
     return d.getTime() > date25.getTime() ? true : false;


   }
 }

  selectedChange($event: any) {
    const m = moment($event);

    if (this.selectedRangeValue!.end) {
      var start = this.selectedRangeValue.start;
      // @ts-ignore the parser thinks that this is a date, but it is a moment.js object, so this will work
      start = m.toDate();
      this.selectedRangeValue = new DateRange<Date>(start, null);
      this.selectedRangeValueChange.emit(this.selectedRangeValue);
    } else {
      var end = (!this.selectedRangeValue.end) ? this.selectedRangeValue.end : moment(m);
      // @ts-ignore the parser thinks that this is a date, but it is a moment.js object, so this will work
      end = m.toDate();
      // @ts-ignore the parser thinks that this is a date, but it is a moment.js object, so this will work
      this.selectedRangeValue = new DateRange<Date>(this.selectedRangeValue.start, end);
      if (this.selectedRangeValue.start != null && this.selectedRangeValue.end != null) {

        if (this.selectedRangeValue.end < this.selectedRangeValue.start) {
          //  alert("Start date must be less than end date");
          this.selectedRangeValue = new DateRange<Date>(
            this.selectedRangeValue.end,
            null
          );
        } else {
          this.selectedRangeValueChange.emit(this.selectedRangeValue);
        }


      }
    }
    var startDate = this.selectedRangeValue.start;
    var endDate = this.selectedRangeValue.end;
    this.numofDates = this.getBusinessDatesCount(startDate, endDate);
    if (this.numofDates == 0 && this.selectedRangeValue.end != null) {
      this.toastrServiceService.showWarning(
        'The leave period that you are applying for is already a calendar leave !!',
        'WARNING'
      );
      this.reset();
    }
  }
  bulk(event: any) {
    this.dialogservice
      .openConfirmDialog('Are you sure you want to approve this work from home request?')
      .afterClosed()
      .subscribe(data => {

        if (data) {
          const ids: any = [];
          for (var key in event.selected) {
            ids.push(event.selected[key].leaveRequestApplicationId);
          }
          let params = new HttpParams();
          params = params.set('approverRemarks', 'OK');
          params = params.set('currentId', this.userId);
          params = params.set('leaveRequestApplicationId', ids);
          params = params.set('status', 'APPROVED');
          this.leave.patchleave(params).subscribe(
            (data) => {

              this.toastrServiceService.showSuccess(
                'WFH Approved Successfully !!'
              );
              this.getWFH();
              this.getreviewWFH();
              event.clear();
            },
            (error) =>
            {
              console.log(error)
              this.toastrServiceService.showError(
                error.error.object, 'Error'
              );
            }
          );
        }
      });

  }
  approve(event: any) {
    this.dialogservice
      .openConfirmDialog('Are you sure you want to approve this work from home request?')
      .afterClosed()
      .subscribe(data => {
        if (data) {
          const id = event.element.leaveRequestApplicationId;
          let params = new HttpParams();
          params = params.set('approverRemarks', 'OK');
          params = params.set('currentId', this.userId);
          params = params.set('leaveRequestApplicationId', id);
          params = params.set('status', 'APPROVED');
          this.leave.patchleave(params).subscribe(
            (data) => {

              this.toastrServiceService.showSuccess(
                'WFH Approved Successfully !!'
              );
              this.getWFH();
              this.getreviewWFH();
            },
            (error) =>
            {
              console.log(error)
              this.toastrServiceService.showError(
                error.error.object, 'Error'
              );
            }
          );
        }
        else
          console.log(data);
      });
  }
  reject(event: any) {
    let dialogRef = this.dialogservice
      .openConfirmApproverDialog('Are you sure you want to reject this work from home request?');
    dialogRef
      .afterClosed()
      .subscribe(data => {
        if((data.data == null || data.data == undefined) && data.action)
        {
          this.toastrServiceService.showError(
          'Kindly fill Remarks', 'Error'
          );
        }
        else if (data.action && data) {
          const id = event.element.leaveRequestApplicationId;
          let params = new HttpParams();
          params = params.set('approverRemarks', data.data);
          params = params.set('currentId', this.userId);
          params = params.set('leaveRequestApplicationId', id);
          params = params.set('status', 'REJECTED');
          this.leave.patchleave(params).subscribe(
            (data) => {

              this.toastrServiceService.showSuccess(
                'WFH Rejected Successfully !!'
              );
              this.getWFH();
              this.getreviewWFH();
            },
            (error) =>
            {
              console.log(error)
              this.toastrServiceService.showError(
                error.error.object, 'Error'
              );
            }
          );
        }
        else
          console.log(data);
      });
  }
  getBusinessDatesCount(startDate: any, endDate: any) {
    var nextDay = new Date(startDate);
    var cnt = 0;
    do {
      cnt +=
        nextDay.getDay() >= 1 &&
          nextDay.getDay() <= 5 &&
          this.datesToHighlight.indexOf(
            this.datePipe.transform(nextDay, 'YYYY/MM/dd') as string
          ) == -1
          ? 1
          : 0;
      nextDay.setDate(nextDay.getDate() + 1);
    } while (nextDay <= endDate);
    return cnt;
  };

}
