import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

@Component({
  selector: 'app-comp-off-request',
  templateUrl: './comp-off-request.component.html',
  styleUrls: ['./comp-off-request.component.scss'],
})
export class CompOffRequestComponent implements OnInit {

  @ViewChild(MatCalendar)
  calendar!: MatCalendar<Date>;
  selectedDate: any;
  tableData: any;
  submitCoff !: FormGroup;
  leave_history: boolean = true;
  review_status: boolean = false;
  userId:any = localStorage.getItem('userId');
  today = new Date();
  startDate = new Date(this.today.getFullYear(),this.today.getMonth() -1,1);
  displayedColumns!: { key: string; header: string; }[];
  reviewdisplayedColumns!: { key: string; header: string; }[];
  reviewData: any;
  constructor(public fb: FormBuilder, public datePipe: DatePipe, public leave: LeaveManagementService, public toastrServiceService: ToastrServiceService, public dialogservice: DialogService) { }

  ngOnInit(): void {
    this.submitCoff = this.fb.group({
      reason: new FormControl('', Validators.required)
    })
    this.displayedColumns = [
      {
        key: 'i',
        header: 'S.No'
      },
      {
        key: 'date',
        header: 'Applied For'
      },

      {
        key: 'reason',
        header: 'reason'
      },
      {
        key: 'coff-remark',
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
        key: 'lapseDate',
        header: 'lapse date'
      }
    ]
    this.reviewdisplayedColumns = [
      {
        key: 'name',
        header: 'Employee Name'
      },

      {
        key: 'date',
        header: 'Applied For'
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

    this.getCoff();
    this.getreviewCoff();
  }
  reset() {
    this.selectedDate = "";
    this.submitCoff.reset();
    this.submitCoff.controls.controlName?.clearValidators();
    this.submitCoff.controls.controlName?.updateValueAndValidity();
  }

  getCoff() {
    this.leave.getCoff().subscribe((data: any) => {
      this.tableData = data.object;
    })
  }
  getreviewCoff(){
    this.leave.getreviewCompOff().subscribe((data: any) => {
      this.reviewData = data.object;
    })

  }
  

  onPostCoff() {
    const date = this.datePipe.transform(this.selectedDate, "YYYY-MM-dd") as string;
    const reason = this.submitCoff.get('reason')?.value;
    let params = new HttpParams();
    params = params.append('currentId', this.userId);
    params = params.append('date', date);
    params = params.append('reason', reason);
    params = params.append('userId', this.userId);
    console.log(params);
    this.leave.postCoff(params).subscribe(() => {
      this.toastrServiceService.showSuccess(
        'COFF Added Successfully !!'
      );
      this.getCoff();
      this.getreviewCoff();
      this.reset();
    },
    (error) =>
          {
            console.log(error)
            this.toastrServiceService.showError(
              error.error.object, 'Error'
            );
            this.reset();
          }
    );
  }
  sunday = 1;
  saturday = 6;
  filterDates = (d: Date): boolean => {
    const day = d.getDay();
    return day == 0 || day == 6;
  }
  history() {
    this.leave_history = true;
    this.review_status = false;
  }
  status() {
    this.review_status = true;
    this.leave_history = false;
  }
  onSelect(event: any) {
    console.log(event);
    this.selectedDate = event;
  }
  bulk(event: any) {

    this.dialogservice
      .openConfirmDialog('Are you sure you want to approve this leaves?')
      .afterClosed()
      .subscribe(data => {

        if (data) {
          console.log(data.data);
          const ids: any = [];
          console.log(event);
          for (var key in event.selected) {
            ids.push(event.selected[key].requestCompOffId);
          }
          console.log(ids);

          let params = new HttpParams();
          params = params.set('approverRemarks','OK');
          params = params.set('currentId', this.userId);
          params = params.set('requestCompOffIds', ids);
          params = params.set('status', 'APPROVED');
          this.leave.patchCoff(params).subscribe(
            (data) => {

              this.toastrServiceService.showSuccess(
                'Comp-Off Approved Successfully !!'
              );
              this.getreviewCoff()
              this.getCoff();
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
      .openConfirmDialog('Are you sure you want to approve this leave?')
      .afterClosed()
      .subscribe(data => {

        if (data) {
          console.log(data.data);
          const id = event.element.requestCompOffId;
          let params = new HttpParams();
          params = params.set('approverRemarks', 'OK');
          params = params.set('currentId', this.userId);
          params = params.set('requestCompOffIds', id);
          params = params.set('status', 'APPROVED');
          this.leave.patchCoff(params).subscribe(
            (data) => {

              this.toastrServiceService.showSuccess(
                'Comp-Off Approved Successfully !!'
              );
              this.getreviewCoff();
              this.getCoff();
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
  reject(event: any) {

    let dialogRef = this.dialogservice
      .openConfirmApproverDialog('Are you sure you want to reject this leave?');
    dialogRef
      .afterClosed()
      .subscribe(data => {
        if((data.data == null || data.data == undefined)&& data.action)
        {
          this.toastrServiceService.showError(
          'Kindly fill Remarks', 'Error'
          );
        }
        else if (data.action && data) {
          const id = event.element.requestCompOffId;
          let params = new HttpParams();
          params = params.set('approverRemarks', data.data);
          params = params.set('currentId', this.userId);
          params = params.set('requestCompOffId', id);
          params = params.set('status', 'REJECTED');
          console.log(params);
          this.leave.patchCoff(params).subscribe(
            (data) => {

              this.toastrServiceService.showSuccess(
                'Comp-Off Rejected Successfully !!'
              );
              this.getreviewCoff();
              this.getCoff();
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


}
