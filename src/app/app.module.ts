import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Modules
import { SharedModule } from './modules/@shared/shared.module';
import { LeaveModule } from './modules/@feature/leave/leave.module';
import { DashboardModule } from './modules/@feature/dashboard/dashboard.module';
import { AppraisalModule } from './modules/@feature/Appraisal/Appraisal.module';
import { EmployeeDirectoryModule } from './modules/@feature/employee-directory/employee-directory.module';
import { AuthenticationModule } from './modules/@core/authentication/authentication.module';

import { TimesheetModule } from './modules/@feature/timesheet/timesheet.module';
import { FormsAndPolicyModule } from './modules/@feature/forms-and-policy/forms-and-policy.module';
import { FeedbackModule } from './modules/@feature/feedback/feedback.module';
import { RouterModule, Routes } from '@angular/router';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';
import { DialogComponent } from './modules/@feature/forms-and-policy/dialog/dialog.component';
import { NetworkLoaderInterceptor } from './services/interceptors/network-loader.interceptor';
import { SocialLoginModule } from 'angularx-social-login';
import { AuthGuard } from './modules/@core/login/auth.guard';
import { ReimbursementModule } from './modules/@feature/reimbursement/reimbursement.module';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    EmployeeDirectoryModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    LeaveModule,
    DashboardModule,
    SharedModule,
    AppraisalModule,
    AuthenticationModule,
    TimesheetModule,
    FormsAndPolicyModule,
    FeedbackModule,
    InfiniteScrollModule,
    SocialLoginModule,
    ReimbursementModule,

    // NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],

  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule {}
