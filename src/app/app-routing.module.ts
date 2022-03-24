import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { AuthGuard } from './modules/@core/login/auth.guard';
import { AppraisalSettingsComponent } from './modules/@feature/Appraisal/appraisal-settings/appraisal-settings.component';
import { GoalsComponent } from './modules/@feature/Appraisal/goals/goals.component';
import { SharedComponent } from './modules/@shared/shared.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/@core/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),

  },
  {
    path: '',
    component: SharedComponent,
    canActivate:[MsalGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/@feature/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),

      },
      {
        path: 'code',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/@feature/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),

      },
      {
        path: 'state',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/@feature/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),

      },
      {
        path: 'error',
        pathMatch: 'full',
        loadChildren: () =>
          import('./modules/@feature/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),

      },

      {
        path: 'EmployeeDirectory',
        loadChildren: () =>
          import(
            './modules/@feature/employee-directory/employee-directory.module'
          ).then((m) => m.EmployeeDirectoryModule),
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('./modules/@feature/leave/leave.module').then(
            (m) => m.LeaveModule
          ),
      },

      {
        path: 'appraisal',
        loadChildren: () =>
          import('./modules/@feature/Appraisal/Appraisal.module').then(
            (m) => m.AppraisalModule
          ),
      },
      {
        path: 'feedback',
        loadChildren: () =>
          import('./modules/@feature/feedback/feedback.module').then(
            (m) => m.FeedbackModule
          ),
      },

      {
        path: 'forms-and-policy',
        loadChildren: () =>
          import(
            './modules/@feature/forms-and-policy/forms-and-policy.module'
          ).then((m) => m.FormsAndPolicyModule),
      },
      {
        path: 'timesheet',
        loadChildren: () =>
          import('./modules/@feature/timesheet/timesheet.module').then(
            (m) => m.TimesheetModule
          ),
      },
      {
        path: 'organization-structure',
        loadChildren: () =>
          import(
            './modules/@feature/organization-structure/organization-structure.module'
          ).then((m) => m.OrganizationStructureModule),
      },
      {
        path: 'project-management',
        loadChildren: () =>
          import(
            './modules/@feature/project-management/project-management.module'
          ).then((m) => m.ProjectManagementModule),
      },
      {
        path: 'reimbursement',
        loadChildren: () =>
          import(
            './modules/@feature/reimbursement/reimbursement.module'
          ).then((m) => m.ReimbursementModule),

      },
      {
        path: 'appraisal-settings',
        component: AppraisalSettingsComponent,
      },
      {
        path: 'goal',
        component: GoalsComponent,
      },

    ],
    data: { reuse: true }

  }

];
const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    // Don't perform initial navigation in iframes
    initialNavigation: !isIframe ? 'enabled' : 'disabled'
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
