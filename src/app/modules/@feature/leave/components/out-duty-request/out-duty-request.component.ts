import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  DateRange, DefaultMatCalendarRangeStrategy,
  MAT_DATE_RANGE_SELECTION_STRATEGY, MatCalendar, MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import * as moment from 'moment';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

@Component({
  selector: 'app-out-duty-request',
  templateUrl: './out-duty-request.component.html',
  styleUrls: ['./out-duty-request.component.scss'],
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: DefaultMatCalendarRangeStrategy
  }]
})
export class OutDutyRequestComponent implements OnInit {
  @ViewChild(MatCalendar)
  calendar!: MatCalendar<Date>;
  userId:any = localStorage.getItem('userId');
  combination= ['Out Duty(Client Visit)','Tour(Overseas Visit)','Campus Visit']
  @Input() selectedRangeValue: DateRange<Date> = new DateRange(new Date(), new Date());
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  selectedVal!: number;
  leave_history: boolean = true;
  today = new Date();
  startDate = new Date(this.today.getFullYear(),this.today.getMonth() -1,1);
  tableData: any;
  displayedColumns!: { key: string; header: string; }[];
  reviewdisplayedColumns!: { key: string; header: string; }[];

  datesToHighlight = ["2021/01/26", "2021/03/29", "2021/04/02", "2021/05/14", "2021/06/06", "2021/08/15", "2021/08/22", "2021/08/30", "2021/10/02", "2021/10/15", "2021/11/04", "2021/11/05", "2021/11/19", "2021/12/25"];
  review_status: boolean = false;reviewData: any;
  numofDates: any = 1;;
;
  submitOutduty!:FormGroup;
  leaveType:string = 'Out Duty';
  constructor(public fb:FormBuilder , public datePipe:DatePipe , public leave:LeaveManagementService,public toastrServiceService :ToastrServiceService,public dialogservice:DialogService){}
  ngOnInit(): void {
    this.submitOutduty = this.fb.group({
      outingType: new FormControl('',[Validators.required]),
      contactNo: new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      reason: new FormControl('',[Validators.required])
    })
    this.getleave();
    this.getreviewleave();
     this.displayedColumns = [
      {
        key: 'period',
        header: 'Period'
      },
      {
        key: 'outingType[outingTypeName]',
        header: 'Outing Type'
      },
      {
        key: 'reason',
        header: 'reason'
      },
      {
        key: 'approverRemarks',
        header: 'remarks'
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
        key: 'outingType.outingTypeName',
        header: 'Outing Type'
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
  onPostOutduty() {
    console.log(this.submitOutduty.value);
    if(this.submitOutduty.get('outingType')?.value == "Out Duty(Client Visit)")
    this.selectedVal = 1;
    else if(this.submitOutduty.get('outingType')?.value == "Tour(Overseas Visit)")
    this.selectedVal = 2;
    else if(this.submitOutduty.get('outingType')?.value == "Campus Visit")
    this.selectedVal=3;



    const dto = {
      alternativeContactNo: this.submitOutduty.get('contactNo')?.value,
      currentId: this.userId,
      fromDate: this.datePipe.transform(this.selectedRangeValue.start, "YYYY-MM-dd") as string,
      outingTypeId:this.selectedVal,
      reason: this.submitOutduty.get('reason')?.value,
      tillDate: this.datePipe.transform(this.selectedRangeValue.end, "YYYY-MM-dd") as string,
      userId: this.userId

    }
    console.log(dto);
    this.leave.postoutDuty(dto).subscribe(()=>{
      console.log('success');
      this.toastrServiceService.showSuccess(
        'OutDuty Applied Successfully !!'
      );
     this.reset();
     this.getleave();
     this.getreviewleave();

    },
    (error) =>
    {
      console.log(error)
      this.toastrServiceService.showError(
        error.error.object, 'Error'
      );
    }
    )
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
  getleave(){
    this.leave.getoutDuty().subscribe((data:any) =>{
      this.tableData = data.object;
  })
  }
  getreviewleave(){
    this.leave.getreviewOutduty().subscribe((data:any) =>{
      this.reviewData = data.object;
  })

  }
  getBusinessDatesCount(startDate: any, endDate: any) {
    var nextDay = new Date(startDate);
    var cnt = 0;
    do {
      cnt +=     nextDay.getDay() >= 1 &&
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
  approve(event:any){
    this.dialogservice
      .openConfirmApproverDialog('Are you sure you want to approve this leave?')
     .afterClosed()
      .subscribe(data => {
          
        if(data.action == 1 && data){
          console.log(data.data);
          const id = event.element.outingRequestId;
  
          let params = new HttpParams();
          params = params.set('remarks',data.data);
          params = params.set('currentId', this.userId);
          params = params.set('outingRequestId', id);
          params = params.set('status','APPROVED');
          this.leave.patchoutDuty(params).subscribe(
            (data) => {
            
              this.toastrServiceService.showSuccess(
                'Out Duty Approved Successfully !!'
              );
              this.getreviewleave();
              this.getleave();
            },
            (error) =>{
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
              const id = event.element.outingRequestId;
              let params = new HttpParams();
              params = params.set('remarks',data.data);
              params = params.set('currentId', this.userId);
              params = params.set('outingRequestId', id);
              params = params.set('status','APPROVED');
              this.leave.patchoutDuty(params).subscribe(
                (data) => {
                
                  this.toastrServiceService.showSuccess(
                    'Out Duty Rejected Successfully !!'
                  );
                  this.getreviewleave();
                  this.getleave();
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
                ids.push(event.selected[key].outingRequestId);
              }
              console.log(ids);
      
              let params = new HttpParams();
              params = params.set('remarks',data.data);
              params = params.set('currentId', this.userId);
              params = params.set('outingRequestId', ids);
              params = params.set('status','APPROVED');
              this.leave.patchoutDuty(params).subscribe(
                (data) => {
                
                  this.toastrServiceService.showSuccess(
                    'Leaves Approved Successfully !!'
                  );
                  this.getreviewleave();
                  this.getleave();
                  event.clear();
                },
                (error) =>{
                  this.toastrServiceService.showError(
                    error.error.object, 'Error'
                  );
                }
              );
              }
          });
      
        }
  reset(){
    this.selectedRangeValue = new DateRange<Date>(new Date(), new Date());
    this.submitOutduty.reset();
    this.submitOutduty.controls.controlName?.clearValidators();
    this.submitOutduty.controls.controlName?.updateValueAndValidity(); 
    this.leaveType = 'Out Duty';
    this.numofDates =1;

  }
  onValChange(val: string) {
    this.leaveType = val;
    if(val == "Out Duty(Client Visit)")
    this.selectedVal = 1;
    else if(val == "Tour(Overseas Visit)")
    this.selectedVal=2;
    else
    this.selectedVal = 3;

  }
  delete(event:any){
    this.dialogservice
    .openConfirmDialog('Are you sure you want to delete this form?')
    .afterClosed()
    .subscribe((res) => {
      if (res) {
        
        const id = event.element.leaveRequestApplicationId;
        let params = new HttpParams();
        params = params.set('currentId', this.userId);
        params = params.set('outingRequestId', id);
        this.leave.deleteoutDuty(params).subscribe(
          (data) => {
          
            this.toastrServiceService.showSuccess(
              'Leave Deleted Successfully !!'
            );
            this.getleave();
            this.getreviewleave();
          },
          (error) =>{
            this.toastrServiceService.showError(
              error.error.object, 'Error'
            );
          }
        );
      }
    });
}
  history(){
    this.leave_history = true;
    this.review_status = false;  
  }
  status(){
    this.review_status = true;
    this.leave_history = false;
  }
}
