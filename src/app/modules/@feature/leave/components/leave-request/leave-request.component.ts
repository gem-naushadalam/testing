import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder, Validators, } from '@angular/forms';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';
import {
  DateRange, DefaultMatCalendarRangeStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY, MatCalendar, MatCalendarCellCssClasses,
} from '@angular/material/datepicker';
import * as moment from 'moment';
import { __values } from 'tslib';
import { LeaveManagementService } from '../../../../../services/leave/leave-management.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { HttpParams } from '@angular/common/http';

interface DTO {
  alternativeContactNo: number;
  availableOnEmail: boolean;
  availableOnMobile: boolean;
  currentId: number;
  firstDayHalfDay: boolean;
  fromDate: string;
  halfDayLeave: boolean;
  lastDayHalfDay: boolean;
  leaveMapping: {
    additionalProp1: 0;
    additionalProp2: 0;
    additionalProp3: 0;
  };
  noOfTotalDays: number;
  reason: string;
  tillDate: string;
  userId: number;
}

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: DefaultMatCalendarRangeStrategy,
    },
  ],
})
export class LeaveRequestComponent implements OnInit {
  @ViewChild(MatCalendar)
  calendar!: MatCalendar<Date>;
  numofDates: number = 1;
  totalleavebalance: any = [];
  combination: Array<string> = [];
  reasons: String = '';
  daterange: boolean = false;
  half: boolean = false;
  selectedVal!: string;
  First_Half!: boolean;
  isCheckedd: boolean = false;
  mobile: boolean = false;
  leavearray: any = {};
  leave_history: boolean = true;
  review_status: boolean = false;
  leaveObj: any;
  userId: any = localStorage.getItem('userId');
  today = new Date();

  startDate = new Date(this.today.getFullYear(),this.today.getMonth() -1,1);
  @Output() dataAfterPostLeave = new EventEmitter<any>();
  email: boolean = false;
  dataSource = new MatTableDataSource();
  submitLeave!: FormGroup;
  datesToHighlight = [
    '2021/01/26',
    '2021/03/29',
    '2021/04/02',
    '2021/05/14',
    '2021/06/06',
    '2021/08/15',
    '2021/08/22',
    '2021/08/30',
    '2021/10/02',
    '2021/10/15',
    '2021/11/04',
    '2021/11/05',
    '2021/11/19',
    '2021/12/25',
  ];

  @Input() selectedRangeValue: DateRange<Date> = new DateRange(
    new Date(),
    new Date()
  );
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();
  displayedColumns!: { key: string; header: string }[];
  tableData: any;
  reviewdisplayedColumns!: { key: string; header: string }[];
  reviewData: any;

  constructor(
    public leave: LeaveManagementService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private eRef: ElementRef,
    public dialogservice: DialogService,
    public toastrServiceService: ToastrServiceService
  ) { }

  selectedChange($event: any) {
    this.half = false;
    this.submitLeave.get('isCheckedd')?.setValue(false);
    this.submitLeave.get('firstdayhalfday')?.setValue(false);
    this.submitLeave.get('lastdayhalfday')?.setValue(false);
    this.submitLeave.get('selected')?.setValue('');
    this.selectedVal = '';
    this.daterange = false;
    const m = moment($event);
    if (this.selectedRangeValue!.end) {
      var start = this.selectedRangeValue.start;
      // @ts-ignore the parser thinks that this is a date, but it is a moment.js object, so this will work
      start = m.toDate();
      this.selectedRangeValue = new DateRange<Date>(start, null);
      this.selectedRangeValueChange.emit(this.selectedRangeValue);
    } else {
      var end = !this.selectedRangeValue.end
        ? this.selectedRangeValue.end
        : moment(m);

      // @ts-ignore the parser thinks that this is a date, but it is a moment.js object, so this will work
      end = m.toDate();
      // @ts-ignore the parser thinks that this is a date, but it is a moment.js object, so this will work
      this.selectedRangeValue = new DateRange<Date>(this.selectedRangeValue.start, end
      );
      if (
        this.selectedRangeValue.start != null &&
        this.selectedRangeValue.end != null
      ) {
        if (this.selectedRangeValue.end <= this.selectedRangeValue.start) {
          this.daterange = false;
        }

        if (this.selectedRangeValue.end < this.selectedRangeValue.start) {
          //  alert("Start date must be less than end date");

          this.selectedRangeValue = new DateRange<Date>(
            this.selectedRangeValue.end,
            null
          );
          this.daterange = false;
        } else {
          this.selectedRangeValueChange.emit(this.selectedRangeValue);
          if (
            this.selectedRangeValue.end?.getDate() !=
            this.selectedRangeValue.start?.getDate()
          ) {
            this.daterange = true;
          }
          if (
            this.selectedRangeValue.end?.getDate() ==
            this.selectedRangeValue.start?.getDate()
          ) {
            this.daterange = false;
          }
        }

      }
    }
    var startDate = this.selectedRangeValue.start;
    var endDate = this.selectedRangeValue.end;
    this.numofDates = this.getBusinessDatesCount(startDate, endDate);
    this.leavecombination(this.totalleavebalance);
  }
  history() {
    this.leave_history = true;
    this.review_status = false;
  }
  status() {
    this.review_status = true;
    this.leave_history = false;
  }

  reset() {
    var today = new Date();
    this.selectedRangeValue = new DateRange<Date>(new Date(), new Date());
    var startDate = this.selectedRangeValue.start;
    var endDate = this.selectedRangeValue.end;
    this.daterange = false;
    this.numofDates = this.getBusinessDatesCount(startDate, endDate);
    this.leavecombination(this.totalleavebalance);
    this.half = false;
    this.selectedVal = this.combination[0];
    this.submitLeave.reset();
    this.submitLeave.get('selected')?.setValue(this.combination[0]);
    this.submitLeave.controls.controlName?.clearValidators();
    this.submitLeave.controls.controlName?.updateValueAndValidity();
  }

  getBusinessDatesCount(startDate: any, endDate: any) {
    var nextDay = new Date(startDate);
    var cnt = 0;
    do {
      cnt +=
        nextDay.getDay() >= 1 &&
          nextDay.getDay() <= 5 &&
          this.datesToHighlight.indexOf(
            this.datePipe.transform(nextDay, 'YYYY/MM/dd') as string) == -1 ? 1 : 0;
      nextDay.setDate(nextDay.getDate() + 1);
    } while (nextDay <= endDate);
    return cnt;
  }


  ngOnInit(): void {
    this.getleaveBalance();
    this.submitLeave = this.formBuilder.group({
      mobile: [false],
      email: [false],
      isCheckedd: [false],
      firstdayhalfday: [false],
      lastdayhalfday: [false],
      selected: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      Half: new FormControl(''),
    });
    this.getleave();
    this.getreviewleave();
    this.displayedColumns = [
      {
        key: 'i+1',
        header: 'S.No',
      },
      {
        key: 'period',
        header: 'Period',
      },
      {
        key: 'leaveCombination',
        header: 'Type',
      },
      {
        key: 'reason',
        header: 'reason',
      },
      {
        key: 'approverRemarks',
        header: 'remark',
      },
      {
        key: 'status',
        header: 'status',
      },
      {
        key: 'appliedOn',
        header: 'applied On',
      },
      {
        key: 'action',
        header: 'action',
      },
    ];
    this.reviewdisplayedColumns = [
      {
        key: 'name',
        header: 'Employee Name',
      },

      {
        key: 'period',
        header: 'Period',
      },
      {
        key: 'leaveCombination',
        header: 'Type',
      },
      {
        key: 'reason',
        header: 'reason',
      },
      {
        key: 'status',
        header: 'status',
      },
      {
        key: 'appliedOn',
        header: 'applied On',
      },
      {
        key: 'action',
        header: 'action',
      },
    ];
  }
  getleaveBalance() {
    this.leave.getLeaveBalanceData().subscribe((data: any) => {
      this.totalleavebalance = data.object;
      this.leavecombination(this.totalleavebalance);
    });
  }
  getleave() {
    this.leave.getleave().subscribe((data: any) => {
      console.log(data);
      this.tableData = data.object;
    });
  }
  getreviewleave() {
    this.leave.getreviewleave().subscribe((data: any) => {
      this.reviewData = data.object;
    });
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
            (data: any) => {
              this.toastrServiceService.showSuccess(
                'Leave Deleted Successfully !!'
              );
              this.getleave();
              this.getreviewleave();
              this.dataAfterPostLeave.emit(data.object);
            },
            (error) => {
              this.toastrServiceService.showError(error.error.object, 'Error');
            }
          );
        }
      });
  }
  approve(event: any) {
    this.dialogservice
      .openConfirmDialog('Are you sure you want to approve this leave?')
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          const id = event.element.leaveRequestApplicationId;
          let params = new HttpParams();
          params = params.set('approverRemarks', 'Ok');
          params = params.set('currentId', this.userId);
          params = params.set('leaveRequestApplicationId', id);
          params = params.set('status', 'APPROVED');
          this.leave.patchleave(params).subscribe(
            (data) => {
              this.toastrServiceService.showSuccess(
                'Leave Approved Successfully !!'
              )
              this.getleave();
              this.getreviewleave();
            },
            (error) => {
              this.toastrServiceService.showError(error.error.object, 'Error');
            }
          );
        }
      });
  }
  bulk(event: any) {
    this.dialogservice
      .openConfirmDialog('Are you sure you want to approve this leaves?')
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          const ids: any = [];
          for (var key in event.selected) {
            ids.push(event.selected[key].leaveRequestApplicationId);
          }

          let params = new HttpParams();
          params = params.set('approverRemarks', 'Ok');
          params = params.set('currentId', this.userId);
          params = params.set('leaveRequestApplicationId', ids);
          params = params.set('status', 'APPROVED');
          this.leave.patchleave(params).subscribe(
            (data) => {
              this.toastrServiceService.showSuccess(
                'Leaves Approved Successfully !!'
              );
              this.getleave();
              this.getreviewleave();
              event.clear();
            },
            (error) => {
              this.toastrServiceService.showError(error.error.object, 'Error');
            }
          );
        }
      });
  }

  reject(event: any) {
    let dialogRef = this.dialogservice.openConfirmApproverDialog(
      'Are you sure you want to reject this leave?'
    );
    dialogRef.afterClosed().subscribe((data) => {
      if ((data.data == null || data.data == undefined) && data.action) {
        this.toastrServiceService.showError('Kindly fill Remarks', 'Error');
      } else if (data.action && data) {
        const id = event.element.leaveRequestApplicationId;
        let params = new HttpParams();
        params = params.set('approverRemarks', data.data);
        params = params.set('currentId', this.userId);
        params = params.set('leaveRequestApplicationId', id);
        params = params.set('status', 'REJECTED');
        this.leave.patchleave(params).subscribe(
          (data) => {
            this.toastrServiceService.showSuccess(
              'Leave Rejected Successfully !!'
            );
            this.getleave();
            this.getreviewleave();
            // this.dataAfterPostLeave.emit(data);
          },
          (error) => {
            this.toastrServiceService.showError(error.error.object, 'Error');
          }
        );
      }
    });
  }

  isChecked(event: any) {
    this.half = false;
    if (event.target.checked) {
      this.numofDates = this.numofDates - 0.5;
      this.leavecombination(this.totalleavebalance);
    }
    if (!event.target.checked) {
      this.numofDates = this.numofDates + 0.5;
      this.leavecombination(this.totalleavebalance);
    }
  }

  changedMobile(event: any) {
    if (event.target.checked) {
      this.submitLeave.get('mobile')?.setValue(true);
    } else {
      this.submitLeave.get('mobile')?.setValue(false);
    }
  }
  changedEmail(event: any) {
    if (event.target.checked) {
      this.submitLeave.get('email')?.setValue(true);
    } else {
      this.submitLeave.get('email')?.setValue(false);
    }
  }
  onPostLeave() {
    const dto: DTO = {
      alternativeContactNo: 9999999999,
      availableOnEmail: this.submitLeave.get('email')?.value,
      availableOnMobile: this.submitLeave.get('mobile')?.value,
      currentId: this.userId,
      firstDayHalfDay: this.submitLeave.get('firstdayhalfday')?.value,
      fromDate: this.datePipe.transform(
        this.selectedRangeValue.start,
        'YYYY-MM-dd'
      ) as string,
      halfDayLeave: this.submitLeave.get('isCheckedd')?.value,
      lastDayHalfDay: this.submitLeave.get('lastdayhalfday')?.value,
      leaveMapping: this.leavearray,
      noOfTotalDays: this.numofDates,
      reason: this.submitLeave.get('reason')?.value,
      tillDate: this.datePipe.transform(
        this.selectedRangeValue.end,
        'YYYY-MM-dd'
      ) as string,
      userId: this.userId,
    };
    if (this.submitLeave.get('isCheckedd')?.value == true) {
      if (
        this.submitLeave.get('Half')?.value == 'First-Half' ||
        this.submitLeave.get('Half')?.value == 'Second-Half'
      ) {
        this.leave.postLeave(dto).subscribe(
          (data) => {
            console.log(data);
            this.toastrServiceService.showSuccess(
              'Leave Applied Successfully !!'
            );
            this.reset();
            this.getleave();
            this.getreviewleave();
            this.dataAfterPostLeave.emit(data);
          },
          (error) => {

            this.toastrServiceService.showError(error.error.object, 'Error');
            this.reset();
          }
        );
      } else {
        this.toastrServiceService.showWarning(
          'Kindly select Half Day preference !!',
          'WARNING'
        );
      }
    } else {
      this.leave.postLeave(dto).subscribe(
        (data) => {
          this.toastrServiceService.showSuccess(
            'Leave Applied Successfully !!'
          );
          this.reset();
          this.getleave();
          this.getreviewleave();
          this.dataAfterPostLeave.emit(data);
        },
        (error) => {
          this.toastrServiceService.showError(error.error.object, 'Error');
          this.reset();
        }
      );
    }
  }
  isCheckedOneDay(event: any) {
    if (event.target.checked) {
      this.numofDates = this.numofDates - 0.5;
      this.half = true;
      this.leavecombination(this.totalleavebalance);
    }
    if (!event.target.checked) {
      this.half = false;
      this.numofDates = this.numofDates + 0.5;
      this.leavecombination(this.totalleavebalance);
    }
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
        const day = date.getDay();

      return (highlightDate) ? 'special-date' : '';
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
  leavecombination(leavebalance: any) {
    if (this.numofDates == 0 && this.selectedRangeValue.end != null) {
      this.toastrServiceService.showWarning(
        'The leave period that you are applying for is already a calendar leave !!',
        'WARNING'
      );
      this.reset();
    }
    if ((this.selectedRangeValue.start == this.selectedRangeValue.end) && this.selectedRangeValue.end != null) {
      this.daterange = false;
    }

    this.combination = [];
    var i = 1;
    var leavetypeId = 0;
    var CL = leavebalance.CL;
    var PL = leavebalance.PL;
    var COFF = leavebalance.CompOff;
    var CLOY = 1;
    while (i <= 5) {
      if (i == 1) {
        leavetypeId = 1;
      } else if (i == 2) {
        leavetypeId = 2;
      } else if (i == 3) {
        leavetypeId = 3;
      } else if (i == 4) {
        leavetypeId = 4;
      } else if (i == 5) {
        leavetypeId = 5;
      }
      i = i + 1;

      if (leavetypeId == 1) {
        if ((CLOY = 1)) {
          if (CL >= 2 && this.numofDates <= 2) {
            this.combination.push(this.numofDates + ' CL');
          } else if (CL >= 5 && this.numofDates <= 5 && CL >= this.numofDates) {
            this.combination.push(this.numofDates + ' CL');
          } else if (CL >= 5 && this.numofDates >= 5) {
            this.combination.push('5 CL +' + (this.numofDates - 5) + ' LWP');
            if (this.numofDates <= 10 && PL >= this.numofDates - 5) {
              this.combination.push('5 CL +' + (this.numofDates - 5) + ' PL');
            }
          } else if (CL != 0 && CL <= 5 && this.numofDates <= 5) {
            if (this.numofDates <= CL) {
              this.combination.push(this.numofDates + ' CL');
            } else {
              this.combination.push(
                CL + ' CL +' + (this.numofDates - CL) + ' LWP'
              );
              if (PL >= this.numofDates - CL) {
                if (this.numofDates <= CL) {
                  this.combination.push(this.numofDates + ' CL');
                } else {
                  this.combination.push(
                    CL + ' CL +' + (this.numofDates - CL) + ' PL'
                  );
                }
              }
            }
          } else if (CL != 0 && CL <= 5 && this.numofDates >= 5) {
            this.combination.push(
              CL + ' CL +' + (this.numofDates - CL) + ' LWP'
            );

            if (this.numofDates <= 10 && PL >= this.numofDates - CL) {
              this.combination.push(
                CL + ' CL +' + (this.numofDates - CL) + ' PL'
              );
            }
          } else if (CL == 0 && this.numofDates >= 1) {
            this.combination.push(this.numofDates + ' LWP');
          }
        } else {
          if (CL >= 2 && this.numofDates > 2 && CLOY == 0) {
            this.combination.push('2 CL +' + (this.numofDates - 2) + ' LWP');
          } else if (CL != 0 && CL <= 2 && CL < this.numofDates && CLOY == 0) {
            this.combination.push(
              CL + ' CL +' + (this.numofDates - CL) + ' LWP'
            );
          } else if (
            CL != 0 &&
            CL <= 2 &&
            this.numofDates <= 2 &&
            CL == this.numofDates &&
            CLOY == 0
          ) {
            this.combination.push(this.numofDates + ' CL');
          } else if (
            this.numofDates <= 2 &&
            CL > this.numofDates &&
            CLOY == 0
          ) {
            this.combination.push(this.numofDates + ' CL');
          } else if (CL == 0 && this.numofDates <= 2 && CLOY == 0) {
            this.combination.push(CL + ' CL +' + this.numofDates + ' LWP');
          } else if (CL == 0 && this.numofDates >= 1 && CLOY == 0) {
            this.combination.push(CL + ' CL +' + this.numofDates + ' LWP');
          }
        }
      }
      if (leavetypeId == 2) {
        if (PL > 0 && this.numofDates > 0) {
          if (PL >= this.numofDates) {
            this.combination.push(this.numofDates + ' PL');
          } else {
            this.combination.push(
              PL + ' PL + ' + (this.numofDates - PL) + ' LWP'
            );
          }
        } else {
          this.combination.push(this.numofDates + ' LWP');
        }
      }
      if (leavetypeId == 3) {
        if (COFF >= 1 && this.numofDates == 1) {
          this.combination.push(this.numofDates + ' COFF');
        } else if (COFF >= 1 && this.numofDates == 0.5) {
          this.combination.push(this.numofDates + ' LWP');
        } else if (COFF >= 1 && this.numofDates <= 2 && this.numofDates > 1) {
          if (CL >= 1) {
            this.combination.push('1 COFF + ' + (this.numofDates - 1) + ' CL');
          } else {
            this.combination.push('1 COFF + ' + (this.numofDates - 1) + ' LWP');
          }
        }
        if (COFF >= 1 && this.numofDates <= 2 && this.numofDates > 1) {
          if (PL >= 1) {
            this.combination.push('1 COFF + ' + (this.numofDates - 1) + ' PL');
          } else {
            this.combination.push('1 COFF + ' + (this.numofDates - 1) + ' LWP');
          }
        }
        if (COFF >= 2 && this.numofDates > 2 && this.numofDates <= 10) {
          if (PL >= this.numofDates - 2) {
            this.combination.push('2 COFF +' + (this.numofDates - 2) + ' PL');
          } else {
            this.combination.push('2 COFF +' + (this.numofDates - 2) + ' LWP');
          }
        }
        if (COFF >= 2 && CL >= 2 && this.numofDates == 4) {
          this.combination.push('2 COFF +' + (this.numofDates - 2) + ' CL');
        }
        if (COFF >= 2 && CL >= 1 && this.numofDates == 3) {
          this.combination.push('2 COFF +' + '1 CL');
        }
        if (CL >= 2 && COFF >= 1 && this.numofDates == 3) {
          this.combination.push('2 CL +' + '1 COFF');
        }
        if (COFF >= 2 && this.numofDates == 2) {
          this.combination.push('2 COFF');
        }
      }
      //Maternity Leave
      if (leavetypeId == 4) {
      }
      // Paternity Leave
      if (leavetypeId == 5) {
      }
    }
    this.submitLeave.get('selected')?.setValue(this.combination[0]);
    this.selectedVal = this.combination[0];
    var splitted = this.selectedVal.split('+');
    this.split(splitted);
  }
  onValChange(val: string) {
    this.selectedVal = val;
    this.submitLeave.get('selected')?.setValue(val);
    var splitted = this.selectedVal.split('+');
    this.split(splitted);
  }

  split(splitted: any) {
    var splitted = splitted;
    var x = splitted.length;
    var map = new Map();

    for (let i = 0; i < x; i++) {
      var split = splitted[i].split(' ');
      map = map.set(split[1], parseFloat(split[0]));
    }
    let jsonResponse: any = {};
    for (let [key, val] of map.entries()) {
      jsonResponse[key] = val;
    }
    this.leavearray = jsonResponse;
  }
}
