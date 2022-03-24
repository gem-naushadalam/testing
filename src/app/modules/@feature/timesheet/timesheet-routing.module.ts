import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Timesheet'
    },
    component: TimesheetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetRoutingModule {
}
