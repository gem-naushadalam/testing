import { Component, OnInit, ViewEncapsulation, ViewChild ,ElementRef} from "@angular/core";
import {MatCalendar, MatCalendarCellClassFunction, MatDatepicker, MatDateRangePicker} from '@angular/material/datepicker';
// import { DateRangeType, IgxCalendarComponent } from 'igniteui-angular';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  //  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  // selectedDate:any;
  // selectedDate:any;
  @ViewChild('calendar', { static: true })
  // public calendar!: IgxCalendarComponent;
  selectedDate: any;
  constructor() {}
  ngOnInit(): void {}

  
  @ViewChild("keepOpen")
  _input!: ElementRef;

 
  onSelect(event:any){
    console.log(event);
    this.selectedDate= event;
  }


}
  // First
  // ngOnInit(): void {
  // }
  
  // dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
  //   if (view === 'month') {
  //     // console.log(cellDate, view)
  //     const day = cellDate.getDay();
  //     // console.log(day);
     
  //     return (day === 6 || day === 0) ? 'example-custom-date-class' : ''; 
  //   }
  //   return '';
  // }
 




