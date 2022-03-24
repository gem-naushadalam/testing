import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Routing
import {
  appRoutingProviders,
  ManagerbreadCrumbRouting,
} from './Manager-Appraisal/components/manager-breadcrumb/manager-breadcrumb.routes';
import { breadCrumbRouting } from './Employee-Appraisal/Components/breadcrumb/breadcrumb.routes';

//Modules
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectFilterModule } from 'mat-select-filter';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatIconModule } from '@angular/material/icon';
// import { MatFormFieldModule } from '@angular/material/form-field';
//Component
import { ManagerAppraisalComponent } from '../Appraisal/Manager-Appraisal/manager-appraisal.component';
import { EmployeeAppraisalComponent } from '../Appraisal/Employee-Appraisal/employee-appraisal.component';

import { ManagerSelfAppraisalFormComponent } from './Manager-Appraisal/components/manager-self-appraisal-form/manager-self-appraisal-form.component';
import { ManagerBreadcrumbComponent } from './Manager-Appraisal/components/manager-breadcrumb/manager-breadcrumb.component';
import { ManagerReviewFormComponent } from './Manager-Appraisal/components/manager-review-form/manager-review-form.component';

import { ManagerAppraisalAchievementsComponent } from './Manager-Appraisal/components/manager-appraisal-achievements/manager-appraisal-achievements.component';
import { ManagerAppraisalBasicInformationComponent } from './Manager-Appraisal/components/manager-appraisal-basic-information/manager-appraisal-basic-information.component';
import { ManagerAppraisalGoalsComponent } from './Manager-Appraisal/components/manager-appraisal-goals/manager-appraisal-goals.component';

// import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

import { AppraisalBasicInformationComponent } from './Employee-Appraisal/Components/appraisal-basic-information/appraisal-basic-information.component';
import { AppraisalGoalsComponent } from './Employee-Appraisal/Components/appraisal-goals/appraisal-goals.component';
import { BreadcrumbComponent } from './Employee-Appraisal/Components/breadcrumb/breadcrumb.component';
import { AppraisalAchievementsComponent } from './Employee-Appraisal/Components/appraisal-achievements/appraisal-achievements.component';
import { ReviewFormComponent } from './Employee-Appraisal/Components/review-form/review-form.component';
import { SelfAppraisalFormComponent } from './Employee-Appraisal/Components/self-appraisal-form/self-appraisal-form.component';
import { FinalFormComponent } from './Employee-Appraisal/Components/final-form/final-form.component';
import { MyAppraisalComponent } from './Employee-Appraisal/Components/my-appraisal/my-appraisal.component';
import { GoalsComponent } from './goals/goals.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AppraisalSettingsComponent } from './appraisal-settings/appraisal-settings.component';
import { CreateAppraisalCycleComponent } from './appraisal-settings/components/create-appraisal-cycle/create-appraisal-cycle.component';
import { AddParametersComponent } from './appraisal-settings/components/add-parameters/add-parameters.component';
import { ViewParametersComponent } from './appraisal-settings/components/view-parameters/view-parameters.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormAppraisalSettingsComponent } from './appraisal-settings/components/form-appraisal-settings/form-appraisal-settings.component';
import { AppraisalComponent } from './appraisal.component';
import { AppraisalRoutingModule } from './appraisal-routing.module';
import { SharedComponent } from '../../@shared/shared.component';
import { SharedModule } from '../../@shared/shared.module';
import { SelectCheckAllComponent } from './appraisal-settings/components/select-check-all/select-check-all.component';

@NgModule({
  declarations: [
    ManagerAppraisalComponent,
    ManagerSelfAppraisalFormComponent,
    ManagerBreadcrumbComponent,
    ManagerReviewFormComponent,
    ManagerAppraisalBasicInformationComponent,
    ManagerAppraisalAchievementsComponent,
    ManagerAppraisalGoalsComponent,
    EmployeeAppraisalComponent,
    AppraisalBasicInformationComponent,
    AppraisalGoalsComponent,
    BreadcrumbComponent,
    AppraisalAchievementsComponent,
    ReviewFormComponent,
    SelfAppraisalFormComponent,
    FinalFormComponent,
    MyAppraisalComponent,
    GoalsComponent,
    AppraisalSettingsComponent,
    CreateAppraisalCycleComponent,
    AddParametersComponent,
    ViewParametersComponent,
    FormAppraisalSettingsComponent,
    AppraisalComponent,
    
    SelectCheckAllComponent,
  ],
  imports: [
    CommonModule,
    ManagerbreadCrumbRouting,
    breadCrumbRouting,
    MatDatepickerModule,
    MatRippleModule,
    MatButtonModule,
    MatButtonToggleModule,
    // MatDatepicker,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    AppraisalRoutingModule,
    SharedModule,
    // MatSelectCountryModule
    MatSelectFilterModule,
  ],

  providers: [appRoutingProviders],
})
export class AppraisalModule {}
