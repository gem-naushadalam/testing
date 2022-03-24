import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import {
  DateRange, DefaultMatCalendarRangeStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY, MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import * as moment from 'moment';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';
import { HttpParams } from '@angular/common/http';
import { DialogService } from 'src/app/services/dialog/dialog.service';

interface DTO{
  approverId : number;
  fromDate:string;
  reason:string;
  tillDate:string;
  userId :number;
}

@Component({
  selector: 'app-lnsa',
  templateUrl: './lnsa.component.html',
  styleUrls: ['./lnsa.component.scss'],
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: DefaultMatCalendarRangeStrategy
  }]
})
export class LnsaComponent implements OnInit {

  datesToHighlight = ["2021/01/26", "2021/03/29", "2021/04/02", "2021/05/14", "2021/06/06", "2021/08/15", "2021/08/22", "2021/08/30", "2021/10/02", "2021/10/15", "2021/11/04", "2021/11/05", "2021/11/19", "2021/12/25"];

  @Input() selectedRangeValue: DateRange<Date> = new DateRange(new Date(), new Date());
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  @ViewChild('calendar') myDiv !: ElementRef;
  leave_history: boolean = true;
  userId:any = localStorage.getItem('userId');
  review_status: boolean = false;
  submitLnsa !: FormGroup;
  displayedColumns!: { key: string; header: string; }[];
  tableData: any;
  reviewdisplayedColumns!: { key: string; header: string; }[];
  reviewData: any;
  today = new Date();
  startDate = new Date(this.today.getFullYear(),this.today.getMonth() -1,1);
  numofDates: number = 1;

  reset() {  
    this.selectedRangeValue = new DateRange<Date>(new Date(), new Date()); 
    this.submitLnsa.reset();  
    this.submitLnsa.controls.controlName?.clearValidators();
    this.submitLnsa.controls.controlName?.updateValueAndValidity();
    this.numofDates = 1;
  }
  constructor( private formBuilder: FormBuilder,private datePipe: DatePipe,private lnsa: LeaveManagementService, public toastrServiceService: ToastrServiceService,public dialogservice:DialogService ) {
  
  }

  ngOnInit(): void {
    this.getlnsa();
    this.getreviewlnsa();
    this.submitLnsa = this.formBuilder.group({
      reason : new FormControl('',Validators.required)
    })
    this.displayedColumns = [
      {
        key: 'i',
        header: 'S.No'
      },
      {
        key: 'period',
        header: 'Period'
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
        key: 'totalNoOfDays',
        header: 'days'
      },
      {
        key: 'status',
        header: 'status'
      },
      {
        key:'appliedOn',
        header:'applied On'
  
      },
      {
        key:'action',
        header:'action'
      }
    ]
    this.reviewdisplayedColumns = [
      {
        key:'name',
        header:'Employee Name'
      },
    
      {
        key: 'period',
        header: 'Period'
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
        key:'appliedOn',
        header:'applied On'
  
      },
      {
        key:'action',
        header:'action'
      }
    ]
  
  }
  getlnsa(){
    this.lnsa.getlnsa().subscribe((data:any)=>{
      console.log(data.object);
      this.tableData = data.object
    })
  }
  getreviewlnsa(){
    this.lnsa.getreviewLnsa().subscribe((data:any)=>{
      this.reviewData = data.object
    })

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
  delete(event:any){
    this.dialogservice
    .openConfirmDialog('Are you sure you want to delete this form?')
    .afterClosed()
    .subscribe((res) => {
      if (res) {
        console.log(event);
        const id = event.element.lnsaRequestId;
        let params = new HttpParams();
        params = params.set('currentId', '1');
        params = params.set('lnsaRequestId', id);
        this.lnsa.deletelnsa(params).subscribe(
          (data) => {
          
            this.toastrServiceService.showSuccess(
              'LNSA Deleted Successfully !!'
            );
            this.getlnsa();
          },
          (error) =>{
            this.toastrServiceService.showError(
              error.error.object, 'Error'
            );
          }
        );
      }
    });



  // this.selectedVal = '';
  // console.log(this.First_Half);
}

  onPostLnsa(){
    const dto : DTO = {
      approverId:1 ,
      fromDate: this.datePipe.transform(this.selectedRangeValue.start, "YYYY-MM-dd") as string,
      reason : this.submitLnsa.get('reason')?.value,
      tillDate: this.datePipe.transform(this.selectedRangeValue.end, "YYYY-MM-dd") as string,
      userId: this.userId
        }
    console.log(dto);
    this.lnsa.postLnsa(dto).subscribe(()=>{
      this.toastrServiceService.showSuccess(
        'LNSA Applied Successfully !!'
      );
      this.getlnsa();
     this.reset();
    },
    (error) => {
      this.toastrServiceService.showError(
        error.error.object, 'Error'
      );
    }
    )
    

  }

  getBusinessDatesCount(startDate: any, endDate: any) {
    var nextDay = new Date(startDate);
    var cnt = 0;
    do {
      cnt += 1;
      nextDay.setDate(nextDay.getDate() + 1);
    } while (nextDay <= endDate);
    return cnt;
  };

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

    console.log("start  " + this.selectedRangeValue.start);
    console.log("end " + this.selectedRangeValue.end);
  }
  history(){
    this.leave_history = true;
    this.review_status = false;  
  }
  status(){
    this.review_status = true;
    this.leave_history = false;
  }
  approve(event:any){
    this.dialogservice
      .openConfirmApproverDialog('Are you sure you want to approve this leave?')
     .afterClosed()
      .subscribe(data => {
          
        if(data.action == 1 && data){
          console.log(data.data);
          const id = event.element.lnsaId;
  
          let params = new HttpParams();
          params = params.set('approverRemarks',data.data);
          params = params.set('currentId', '1');
          params = params.set('requestId', id);
          params = params.set('status','APPROVED');
          this.lnsa.patchlnsa(params).subscribe(
            (data) => {
            
              this.toastrServiceService.showSuccess(
                'LNSA Approved Successfully !!'
              );
              this.getreviewlnsa();
            },
            (error) => {
              this.toastrServiceService.showError(
                error.error.object, 'Error'
              );
            }
          );
          }
      });
    }
    bulk(event:any){
  
      this.dialogservice
      .openConfirmApproverDialog('Are you sure you want to approve this leaves?')
     .afterClosed()
      .subscribe(data => {
          
        if(data.action == 1 && data){
          console.log(data.data);
          const ids:any = [];
          console.log(event);
          for(var key in event.selected){
            ids.push(event.selected[key].lnsaId);
          }
          console.log(ids);
  
          let params = new HttpParams();
          params = params.set('approverRemarks',data.data);
          params = params.set('currentId', '1');
          params = params.set('requestId', ids);
          params = params.set('status','APPROVED');
          this.lnsa.patchlnsa(params).subscribe(
            (data) => {
            
              this.toastrServiceService.showSuccess(
                'LNSA Approved Successfully !!'
              );
              this.getreviewlnsa()
              event.clear();
            },
            (error) => {
              this.toastrServiceService.showError(
                error.error.object, 'Error'
              );
            }
          );
          }
      });
  
    }
  reject(event:any){

    let dialogRef = this.dialogservice
        .openConfirmApproverDialog('Are you sure you want to reject this leave?');
        dialogRef
        .afterClosed()
        .subscribe(data => {
            if(data.action && data){
            const id = event.element.lnsaId;
            let params = new HttpParams();
            params = params.set('approverRemarks',data.data);
            params = params.set('currentId', '1');
            params = params.set('requestId', id);
            params = params.set('status','REJECTED');
            this.lnsa.patchlnsa(params).subscribe(
              (data) => {
              
                this.toastrServiceService.showSuccess(
                  'LNSA Rejected Successfully !!'
                );
                this.getreviewlnsa();
              },
              (error) => {
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

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'special-date' : '';
    };
  }

}

