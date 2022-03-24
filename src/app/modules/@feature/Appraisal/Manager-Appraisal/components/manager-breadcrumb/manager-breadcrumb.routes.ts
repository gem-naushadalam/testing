import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Components
import { ManagerReviewFormComponent } from '../manager-review-form/manager-review-form.component';
//Components
import { ManagerSelfAppraisalFormComponent } from '../manager-self-appraisal-form/manager-self-appraisal-form.component';
import { ManagerAppraisalAchievementsComponent } from '../manager-appraisal-achievements/manager-appraisal-achievements.component';
import { ManagerAppraisalGoalsComponent } from '../manager-appraisal-goals/manager-appraisal-goals.component';

export const ManagerbreadCrumbRoutes: Routes = [
  {
    path: 'appraisal/appraisal-form',
    component: ManagerSelfAppraisalFormComponent,
  },
  {
    path: 'appraisal/review-form',
    component: ManagerReviewFormComponent,
  },
  
  {
    path: 'appraisal/goals',
    component: ManagerAppraisalGoalsComponent,
  },

  {
    path: 'appraisal/achievements',
    component: ManagerAppraisalAchievementsComponent,
  }
];

export const appRoutingProviders: any[] = [];

export const ManagerbreadCrumbRouting: ModuleWithProviders<any> =
  RouterModule.forChild(ManagerbreadCrumbRoutes);
