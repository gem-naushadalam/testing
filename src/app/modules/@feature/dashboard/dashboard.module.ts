import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { DashboardComponent } from './dashboard.component';
import { EmployeeStatusComponent } from './components/employee-status/employee-status.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LeaveCounterComponent } from './components/leave-counter/leave-counter.component';
import { DashboardUpdateComponent } from './components/dashboard-update/dashboard-update.component';
import { TeamLeaveComponent } from './components/team-leave/team-leave.component';
import { TeamAttendanceComponent } from './components/team-attendance/team-attendance.component';


//Module

import {CalendarModule} from "./components/calendar/calendar-module"
import { SharedModule } from '../../@shared/shared.module'; 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatNativeDateModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    EmployeeStatusComponent,
    CalendarComponent,
    LeaveCounterComponent,
    DashboardUpdateComponent,
    TeamLeaveComponent,
    TeamAttendanceComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    SharedModule,
    FontAwesomeModule,
    MatNativeDateModule,
    MatGridListModule,
    DashboardRoutingModule
    
  ], 
  exports: [
    DashboardComponent,
  ],
  entryComponents:[
    DashboardComponent
  ]
})
export class DashboardModule {}
