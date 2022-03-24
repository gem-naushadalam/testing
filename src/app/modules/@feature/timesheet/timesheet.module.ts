import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Component
import { TimesheetComponent } from '../timesheet/timesheet.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FormOptionComponent } from './form-option/form-option.component';
import { DaysNavigationComponent } from './form-option/components/days-navigation/days-navigation.component';
import { FormFieldComponent } from './form-option/components/form-field/form-field.component';

//Nodules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet-routing.module';

@NgModule({
  declarations: [
    TimesheetComponent,
    MainPageComponent,
    FormOptionComponent,
    DaysNavigationComponent,
    FormFieldComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TimesheetRoutingModule
  ],
  exports: [TimesheetComponent],
})
export class TimesheetModule {}
