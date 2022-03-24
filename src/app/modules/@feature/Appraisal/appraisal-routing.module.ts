import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppraisalSettingsComponent } from './appraisal-settings/appraisal-settings.component';
import { AppraisalComponent } from './appraisal.component';
import { AppraisalAchievementsComponent } from './Employee-Appraisal/Components/appraisal-achievements/appraisal-achievements.component';
import { AppraisalBasicInformationComponent } from './Employee-Appraisal/Components/appraisal-basic-information/appraisal-basic-information.component';
import { AppraisalGoalsComponent } from './Employee-Appraisal/Components/appraisal-goals/appraisal-goals.component';
import { FinalFormComponent } from './Employee-Appraisal/Components/final-form/final-form.component';
import { ReviewFormComponent } from './Employee-Appraisal/Components/review-form/review-form.component';
import { SelfAppraisalFormComponent } from './Employee-Appraisal/Components/self-appraisal-form/self-appraisal-form.component';
import { GoalsComponent } from './goals/goals.component';


const routes: Routes = [
  {
    path: '',
    component: AppraisalComponent,
  },
  {
    path: 'basic-information',
    component: AppraisalBasicInformationComponent,
  },
  {
    path: 'appraisal-form',
    component: SelfAppraisalFormComponent,
  },
  {
    path: 'goals',
    component: AppraisalGoalsComponent,
  },

  {
    path: 'achievements',
    component: AppraisalAchievementsComponent,
  },
  {
    path: 'review-form',
    component: ReviewFormComponent,
  },
  {
    path: 'final-form',
    component: FinalFormComponent,
  },
  // {
  //     path:'appraisal-settings',
  //     component:AppraisalSettingsComponent,

  // },
  // {
  //     path:'goal',
  //     component:GoalsComponent

  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppraisalRoutingModule {}