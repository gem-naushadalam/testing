import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { AppraisalAchievementsComponent } from '../appraisal-achievements/appraisal-achievements.component';
import { AppraisalGoalsComponent } from '../appraisal-goals/appraisal-goals.component';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { AppraisalBasicInformationComponent } from '../appraisal-basic-information/appraisal-basic-information.component';
import { SelfAppraisalFormComponent } from '../self-appraisal-form/self-appraisal-form.component';
import { FinalFormComponent } from '../final-form/final-form.component';

export const breadCrumbRoutes: Routes = [
  {
    path: 'appraisal/basic-information',
    component: AppraisalBasicInformationComponent,
  },
  {
    path: 'appraisal/appraisal-form',
    component: SelfAppraisalFormComponent,
  },
  {
    path: 'appraisal/goals',
    component: AppraisalGoalsComponent,
  },

  {
    path: 'appraisal/achievements',
    component: AppraisalAchievementsComponent,
  },
  {
    path: 'appraisal/review-form',
    component: ReviewFormComponent,
  },
  {
    path: 'appraisal/final-form',
    component: FinalFormComponent,
  },
];

export const appRoutingProviders: any[] = [];

export const breadCrumbRouting: ModuleWithProviders<any> =
  RouterModule.forChild(breadCrumbRoutes);
